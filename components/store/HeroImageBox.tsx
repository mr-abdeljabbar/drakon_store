interface Props {
  src?: string
  alt?: string
  badge?: string | null
  goldOffsetX?: number   // px — how far gold layer peeks right
  goldOffsetY?: number   // px — how far gold layer peeks bottom
  borderWidth?: number   // px — white frame border
  showBadge?: boolean
}

export function HeroImageBox({
  src = '/hero-man.png',
  alt = 'رجل دراكون',
  badge = 'إصدار محدود',
  goldOffsetX = 20,
  goldOffsetY = 20,
  borderWidth = 6,
  showBadge = true,
}: Props) {
  return (
    /*
     * hero-image-box
     * Padding makes room for the gold layer to peek out from behind the frame.
     * All layers are independently positioned — nothing is flattened.
     */
    <div
      className="relative w-full group select-none"
      style={{ paddingBottom: goldOffsetY, paddingRight: goldOffsetX }}
    >

      {/* ─── LAYER 1 · Gold depth layer (z-0, behind everything) ─── */}
      <div
        className="absolute bottom-0 right-0 z-0 transition-all duration-500 group-hover:bottom-[-4px] group-hover:right-[-4px]"
        style={{
          top: goldOffsetY,
          left: goldOffsetX,
          background: 'linear-gradient(135deg, #e6c364 0%, #C9A84C 50%, #b8943a 100%)',
        }}
      />

      {/* ─── LAYER 2 · White frame wrapping the image (z-10) ─── */}
      <div
        className="relative z-10 overflow-hidden transition-all duration-500
                   shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                   group-hover:scale-[1.02]
                   group-hover:shadow-[0_16px_56px_rgba(201,168,76,0.35)]"
        style={{ border: `${borderWidth}px solid white` }}
      >

        {/* ─── LAYER 3 · The image (swap src to change photo) ─── */}
        <img
          src={src}
          alt={alt}
          className="w-full aspect-[3/4] object-cover object-top grayscale block"
        />

        {/* Subtle dark gradient at bottom to blend with page */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ─── LAYER 4 · Badge (z-20, fully independent, rotated) ─── */}
      {showBadge && badge && (
        <div
          className="absolute z-20 -top-3 right-8
                     bg-black border border-gold
                     px-3 py-1 rotate-12
                     shadow-[0_4px_12px_rgba(0,0,0,0.6)]
                     transition-transform duration-300 group-hover:rotate-6"
        >
          <span className="font-cairo text-xs text-gold tracking-widest whitespace-nowrap">
            {badge}
          </span>
        </div>
      )}

    </div>
  )
}
