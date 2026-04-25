const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID   = process.env.TELEGRAM_CHAT_ID

export async function notifyNewOrder(lead: {
  name: string
  phone: string
  city: string
  product_name: string
  quantity: number
  total_price: number
  source: string
  campaign?: string | null
}) {
  if (!BOT_TOKEN || !CHAT_ID) return

  const lines = [
    `🛒 *طلب جديد*`,
    ``,
    `👤 *الاسم:* ${lead.name}`,
    `📞 *الهاتف:* ${lead.phone}`,
    `📍 *المدينة:* ${lead.city}`,
    ``,
    `📦 *المنتج:* ${lead.product_name}`,
    `🔢 *الكمية:* ${lead.quantity}`,
    `💰 *الإجمالي:* ${lead.total_price} د.م.`,
    `📣 *المصدر:* ${lead.source}${lead.campaign ? ` · ${lead.campaign}` : ''}`,
  ]

  const text = lines.join('\n')

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
    })
  } catch (err) {
    console.error('[Telegram] failed to send notification:', err)
  }
}
