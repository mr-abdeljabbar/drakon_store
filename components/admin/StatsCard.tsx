interface Props {
  title: string
  value: string | number
  subtitle?: string
  accent?: boolean
  trend?: string
  trendUp?: boolean
}

export function StatsCard({ title, value, subtitle, accent, trend, trendUp }: Props) {
  return (
    <div className={`stat-card flex flex-col gap-2 ${accent ? 'border-gold/50' : ''}`}>
      <div className="flex items-start justify-between">
        <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest">{title}</p>
        {trend && (
          <span className={`font-montserrat text-xs px-2 py-0.5 ${
            trendUp ? 'text-green-400 bg-green-900/20' : 'text-red-400 bg-red-900/20'
          }`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <p className={`font-montserrat font-bold text-3xl ${accent ? 'text-gold' : 'text-drakon-text'}`}>
        {value}
      </p>
      {subtitle && (
        <p className="font-montserrat text-xs text-drakon-muted">{subtitle}</p>
      )}
    </div>
  )
}
