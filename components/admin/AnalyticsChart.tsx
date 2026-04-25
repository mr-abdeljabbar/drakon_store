'use client'

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'

interface DailyData {
  day: string
  count: number
}

interface SourceData {
  name: string
  value: number
}

interface CampaignData {
  campaign: string
  count: number
}

const GOLD = '#C9A84C'
const COLORS = ['#C9A84C', '#adc8f5', '#b9c4ff', '#99907e']

const SOURCE_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  direct: 'Direct',
}

interface Props {
  daily: DailyData[]
  bySource: Record<string, number>
  byCampaign: CampaignData[]
}

export function DailyChart({ daily }: { daily: DailyData[] }) {
  const data = daily.map((d) => ({
    day: d.day.slice(5),
    Leads: d.count,
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333535" />
        <XAxis dataKey="day" tick={{ fill: '#99907e', fontSize: 10, fontFamily: 'Montserrat' }} />
        <YAxis tick={{ fill: '#99907e', fontSize: 10 }} allowDecimals={false} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1e2020', border: '1px solid #4d4637', borderRadius: 0 }}
          labelStyle={{ color: '#e2e2e2', fontFamily: 'Montserrat' }}
          itemStyle={{ color: '#C9A84C' }}
        />
        <Line type="monotone" dataKey="Leads" stroke={GOLD} strokeWidth={2} dot={{ fill: GOLD, r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function SourcePieChart({ bySource }: { bySource: Record<string, number> }) {
  const data = Object.entries(bySource).map(([key, value]) => ({
    name: SOURCE_LABELS[key] ?? key,
    value,
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: '#1e2020', border: '1px solid #4d4637' }}
          itemStyle={{ color: '#C9A84C' }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function CampaignBarChart({ byCampaign }: { byCampaign: CampaignData[] }) {
  const data = byCampaign.slice(0, 8).map((c) => ({
    name: (c.campaign || 'Direct').slice(0, 12),
    Leads: c.count,
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333535" />
        <XAxis
          dataKey="name"
          tick={{ fill: '#99907e', fontSize: 9, fontFamily: 'Montserrat' }}
          angle={-30}
          textAnchor="end"
          interval={0}
        />
        <YAxis tick={{ fill: '#99907e', fontSize: 10 }} allowDecimals={false} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1e2020', border: '1px solid #4d4637' }}
          itemStyle={{ color: '#C9A84C' }}
        />
        <Bar dataKey="Leads" fill={GOLD} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function AnalyticsChart({ daily, bySource, byCampaign }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-surface-mid border border-drakon-border p-5">
        <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-1">Daily Leads</p>
        <p className="font-montserrat text-sm text-drakon-text mb-4">Last 30 days</p>
        <DailyChart daily={daily} />
      </div>
      <div className="bg-surface-mid border border-drakon-border p-5">
        <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-1">By Source</p>
        <p className="font-montserrat text-sm text-drakon-text mb-4">Traffic breakdown</p>
        <SourcePieChart bySource={bySource} />
      </div>
    </div>
  )
}
