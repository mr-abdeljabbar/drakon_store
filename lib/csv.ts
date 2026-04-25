interface CsvLead {
  name: string
  phone: string
  city: string
  address?: string | null
  product_name: string
  quantity: number
  total_price: number
  source: string
  campaign?: string | null
  status: string
  created_at: Date | string
}

function escapeCsv(value: string | number | null | undefined): string {
  const str = String(value ?? '')
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function generateCsv(leads: CsvLead[]): string {
  const headers = [
    'الاسم',
    'الهاتف',
    'المدينة',
    'العنوان',
    'المنتج',
    'الكمية',
    'السعر',
    'المصدر',
    'الحملة',
    'الحالة',
    'التاريخ',
  ]

  const rows = leads.map((lead) => [
    escapeCsv(lead.name),
    escapeCsv(lead.phone),
    escapeCsv(lead.city),
    escapeCsv(lead.address),
    escapeCsv(lead.product_name),
    escapeCsv(lead.quantity),
    escapeCsv(`${lead.total_price} MAD`),
    escapeCsv(lead.source),
    escapeCsv(lead.campaign),
    escapeCsv(lead.status),
    escapeCsv(new Date(lead.created_at).toLocaleDateString('ar-MA')),
  ])

  const csvLines = [headers.join(','), ...rows.map((r) => r.join(','))]
  return '﻿' + csvLines.join('\n') // BOM for Excel Arabic support
}
