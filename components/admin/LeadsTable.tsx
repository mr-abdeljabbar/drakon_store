'use client'

import { useState } from 'react'

interface Lead {
  id: string
  name: string
  phone: string
  city: string
  product_name: string
  status: string
  source: string
  campaign: string | null
  quality_score: string
  total_price: number
  created_at: string
}

interface Props {
  leads: Lead[]
  onStatusChange?: (id: string, status: string) => void
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'sent', label: 'Sent' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
]

const QUALITY_LABELS: Record<string, string> = { high: 'High', medium: 'Med', low: 'Low', spam: 'Spam' }

function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = { new: 'New', sent: 'Sent', accepted: 'Accepted', rejected: 'Rejected' }
  return <span className={`badge-${status}`}>{labels[status] ?? status}</span>
}

function QualityBadge({ score }: { score: string }) {
  return <span className={`badge-${score}`}>{QUALITY_LABELS[score] ?? score}</span>
}

export function LeadsTable({ leads, onStatusChange }: Props) {
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  async function handleStatusChange(id: string, status: string) {
    setUpdatingId(id)
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      onStatusChange?.(id, status)
    } finally {
      setUpdatingId(null)
    }
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-16 text-drakon-muted font-montserrat text-sm">
        No leads match the current filters.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-drakon-border">
            {['Name', 'Phone', 'City', 'Product', 'Quality', 'Status', 'Source', 'Campaign', 'Date', ''].map((col) => (
              <th key={col} className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest px-4 py-3 whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-drakon-border/50 hover:bg-surface-mid transition-colors">
              <td className="px-4 py-3">
                <p className="font-montserrat text-sm text-drakon-text font-semibold">{lead.name}</p>
              </td>
              <td className="px-4 py-3">
                <p className="font-mono text-xs text-drakon-muted">{lead.phone}</p>
              </td>
              <td className="px-4 py-3">
                <p className="font-montserrat text-xs text-drakon-muted">{lead.city}</p>
              </td>
              <td className="px-4 py-3">
                <p className="font-montserrat text-xs text-drakon-muted max-w-[120px] truncate">{lead.product_name}</p>
                <p className="font-montserrat text-xs text-gold mt-0.5">{lead.total_price} MAD</p>
              </td>
              <td className="px-4 py-3">
                <QualityBadge score={lead.quality_score} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3">
                <p className="font-montserrat text-xs text-drakon-muted capitalize">{lead.source}</p>
              </td>
              <td className="px-4 py-3">
                <p className="font-mono text-xs text-drakon-muted truncate max-w-[100px]">
                  {lead.campaign ?? '—'}
                </p>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <p className="font-mono text-xs text-drakon-muted">
                  {new Date(lead.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </p>
              </td>
              <td className="px-4 py-3">
                <select
                  value={lead.status}
                  disabled={updatingId === lead.id}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                  className="bg-surface-high border border-drakon-border text-drakon-muted font-montserrat text-xs px-2 py-1 focus:border-gold outline-none disabled:opacity-50 cursor-pointer"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
