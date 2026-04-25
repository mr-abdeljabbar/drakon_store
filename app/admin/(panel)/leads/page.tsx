'use client'

import { useState, useEffect, useCallback } from 'react'
import { LeadsTable } from '@/components/admin/LeadsTable'
import { ExportModal } from '@/components/admin/ExportModal'

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

interface ApiResponse {
  leads: Lead[]
  total: number
  pages: number
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [source, setSource] = useState('all')
  const [campaign, setCampaign] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [page, setPage] = useState(1)

  const [showExport, setShowExport] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (status !== 'all') params.set('status', status)
    if (source !== 'all') params.set('source', source)
    if (campaign) params.set('campaign', campaign)
    if (dateFrom) params.set('dateFrom', dateFrom)
    if (dateTo) params.set('dateTo', dateTo)
    params.set('page', String(page))
    params.set('limit', '20')

    try {
      const res = await fetch(`/api/leads?${params}`)
      const data: ApiResponse = await res.json()
      setLeads(data.leads)
      setTotal(data.total)
      setPages(data.pages)
    } finally {
      setLoading(false)
    }
  }, [search, status, source, campaign, dateFrom, dateTo, page])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  function handleStatusChange(id: string, newStatus: string) {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status: newStatus } : l))
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  function resetFilters() {
    setSearch(''); setSearchInput(''); setStatus('all'); setSource('all')
    setCampaign(''); setDateFrom(''); setDateTo(''); setPage(1)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest">Management</p>
          <h1 className="font-montserrat text-2xl font-bold text-drakon-text mt-1">Leads</h1>
          <p className="font-montserrat text-sm text-drakon-muted mt-1">{total} total leads</p>
        </div>
        <button
          onClick={() => setShowExport(true)}
          className="bg-gold text-surface-base font-montserrat font-bold px-6 py-2.5 hover:bg-gold-light transition-colors text-xs uppercase tracking-widest"
        >
          ⬇ Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-surface-mid border border-drakon-border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name or phone..."
              className="flex-1 bg-surface-high border border-drakon-border text-drakon-text font-montserrat text-xs px-3 py-2 focus:border-gold outline-none placeholder:text-drakon-muted/50"
            />
            <button type="submit" className="bg-gold text-surface-base px-3 py-2 font-bold text-sm">
              🔍
            </button>
          </form>

          {/* Status */}
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }}
            className="bg-surface-high border border-drakon-border text-drakon-text font-montserrat text-xs px-3 py-2 focus:border-gold outline-none">
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Source */}
          <select value={source} onChange={(e) => { setSource(e.target.value); setPage(1) }}
            className="bg-surface-high border border-drakon-border text-drakon-text font-montserrat text-xs px-3 py-2 focus:border-gold outline-none">
            <option value="all">All Sources</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="direct">Direct</option>
          </select>

          {/* Campaign */}
          <input value={campaign} onChange={(e) => { setCampaign(e.target.value); setPage(1) }}
            placeholder="Filter by campaign..."
            className="bg-surface-high border border-drakon-border text-drakon-text font-montserrat text-xs px-3 py-2 focus:border-gold outline-none placeholder:text-drakon-muted/50" />
        </div>

        {/* Date range */}
        <div className="flex items-center gap-3">
          <span className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest">From</span>
          <input type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1) }}
            className="bg-surface-high border border-drakon-border text-drakon-text font-mono text-xs px-3 py-2 focus:border-gold outline-none" />
          <span className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest">To</span>
          <input type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(1) }}
            className="bg-surface-high border border-drakon-border text-drakon-text font-mono text-xs px-3 py-2 focus:border-gold outline-none" />
          <button onClick={resetFilters} className="font-montserrat text-xs text-drakon-muted hover:text-gold transition-colors ml-2">
            Reset ✕
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-mid border border-drakon-border">
        {loading
          ? <div className="text-center py-16 text-drakon-muted font-montserrat text-sm">Loading...</div>
          : <LeadsTable leads={leads} onStatusChange={handleStatusChange} />
        }
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
            className="font-montserrat text-xs px-3 py-2 border border-drakon-border text-drakon-muted hover:border-gold hover:text-gold disabled:opacity-40 transition-colors">
            ← Prev
          </button>
          <span className="font-montserrat text-xs text-drakon-muted px-4">
            Page {page} of {pages}
          </span>
          <button onClick={() => setPage(Math.min(pages, page + 1))} disabled={page === pages}
            className="font-montserrat text-xs px-3 py-2 border border-drakon-border text-drakon-muted hover:border-gold hover:text-gold disabled:opacity-40 transition-colors">
            Next →
          </button>
        </div>
      )}

      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </div>
  )
}
