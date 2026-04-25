interface LeadData {
  id: string
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
  quality_score: string
  created_at: Date | string
}

export async function sendToSheets(lead: LeadData): Promise<void> {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL
  if (!webhookUrl) return

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: lead.name,
        phone: lead.phone,
        city: lead.city,
        address: lead.address ?? '',
        product_name: lead.product_name,
        quantity: lead.quantity,
        total_price: lead.total_price,
        source: lead.source,
        campaign: lead.campaign ?? '',
        status: lead.status,
        created_at: new Date(lead.created_at).toISOString(),
      }),
    })
  } catch (err) {
    console.error('[Sheets webhook error]', err)
  }
}
