import { prisma } from './prisma'

const MOROCCAN_PHONE_REGEX = /^(\+212|00212|0)(6|7)\d{8}$/

export function isValidMoroccanPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s+/g, '').replace(/-/g, '')
  return MOROCCAN_PHONE_REGEX.test(cleaned)
}

export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/\s+/g, '').replace(/-/g, '')
  if (cleaned.startsWith('+212')) return cleaned
  if (cleaned.startsWith('00212')) return '+212' + cleaned.slice(5)
  if (cleaned.startsWith('0')) return '+212' + cleaned.slice(1)
  return cleaned
}

function isSpamPattern(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  const last9 = digits.slice(-9)
  // all same digit
  if (/^(\d)\1+$/.test(last9)) return true
  // sequential ascending (123456789)
  let isSeq = true
  for (let i = 1; i < last9.length; i++) {
    if (parseInt(last9[i]) !== parseInt(last9[i - 1]) + 1) { isSeq = false; break }
  }
  if (isSeq) return true
  return false
}

export async function scoreLeadQuality(data: {
  phone: string
  address?: string | null
}): Promise<{ score: 'high' | 'medium' | 'low' | 'spam'; reason: string }> {
  const phone = normalizePhone(data.phone)

  if (!isValidMoroccanPhone(data.phone)) {
    return { score: 'spam', reason: 'رقم الهاتف غير صالح' }
  }

  if (isSpamPattern(phone)) {
    return { score: 'spam', reason: 'نمط هاتف مشبوه' }
  }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const duplicate = await prisma.lead.findFirst({
    where: {
      phone,
      created_at: { gte: sevenDaysAgo },
    },
  })

  if (duplicate) {
    return { score: 'low', reason: 'رقم هاتف مكرر (آخر 7 أيام)' }
  }

  if (data.address && data.address.trim().length > 5) {
    return { score: 'high', reason: 'بيانات مكتملة' }
  }

  return { score: 'medium', reason: 'بيانات جيدة' }
}
