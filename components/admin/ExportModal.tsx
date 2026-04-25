'use client'

import { useState } from 'react'

interface Props {
  onClose: () => void
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'sent', label: 'Sent' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
]

export function ExportModal({ onClose }: Props) {
  const [statuses, setStatuses] = useState<string[]>(['new'])
  const [source, setSource] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggleStatus(s: string) {
    setStatuses((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }

  async function handleExport() {
    if (statuses.length === 0) {
      setError('Select at least one status.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statuses, source, dateFrom: dateFrom || undefined, dateTo: dateTo || undefined }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Export failed.')
        return
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `drakon-leads-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
      onClose()
      window.location.reload()
    } catch {
      setError('An error occurred during export.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-surface-high border border-drakon-border w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-montserrat font-bold text-lg text-drakon-text uppercase tracking-widest">
            Export Leads
          </h2>
          <button onClick={onClose} className="text-drakon-muted hover:text-drakon-text transition-colors text-xl leading-none">×</button>
        </div>

        {/* Status filter */}
        <div className="mb-5">
          <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-3">Status</p>
          <div className="flex gap-2 flex-wrap">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleStatus(opt.value)}
                className={`font-montserrat text-xs px-4 py-2 border transition-colors uppercase tracking-wide ${
                  statuses.includes(opt.value)
                    ? 'bg-gold text-surface-base border-gold font-bold'
                    : 'border-drakon-border text-drakon-muted hover:border-gold'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Source filter */}
        <div className="mb-5">
          <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-2">Source</p>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full bg-surface-mid border border-drakon-border text-drakon-text font-montserrat text-sm px-3 py-2 focus:border-gold outline-none"
          >
            <option value="all">All Sources</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="direct">Direct</option>
          </select>
        </div>

        {/* Date range */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div>
            <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-2">From</p>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
              className="w-full bg-surface-mid border border-drakon-border text-drakon-text font-mono text-sm px-3 py-2 focus:border-gold outline-none" />
          </div>
          <div>
            <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-2">To</p>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
              className="w-full bg-surface-mid border border-drakon-border text-drakon-text font-mono text-sm px-3 py-2 focus:border-gold outline-none" />
          </div>
        </div>

        <p className="font-montserrat text-xs text-drakon-muted mb-5 bg-gold/5 border border-gold/20 p-3 leading-relaxed">
          Note: Leads with status "New" will be automatically updated to "Sent" after export.
        </p>

        {error && (
          <p className="font-montserrat text-xs text-red-400 mb-4">{error}</p>
        )}

        <button
          onClick={handleExport}
          disabled={loading}
          className="w-full bg-gold text-surface-base font-montserrat font-bold py-3 uppercase tracking-widest hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {loading ? 'Exporting...' : '⬇ Download CSV'}
        </button>
      </div>
    </div>
  )
}
