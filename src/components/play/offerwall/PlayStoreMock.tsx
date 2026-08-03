import { type Offer } from '@/lib/offerwall-data'

// Low-effort mock of the Google Play app page opening — the MOBILE path after "Play & Earn"
// (the desktop flow shows a QR code instead, which we don't use). Design-only.
export function PlayStoreMock({ offer, onClose }: { offer: Offer; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-white text-[#202124]">
      {/* Play top bar */}
      <div className="flex items-center gap-4 px-4 py-3.5">
        <button onClick={onClose} aria-label="Back" className="text-2xl leading-none text-[#5f6368]">←</button>
        <PlayGlyph className="size-6" />
        <span className="text-lg text-[#5f6368]">Google Play</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {/* app header */}
        <div className="flex gap-4 pt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={offer.icon} alt="" className="size-[72px] rounded-2xl object-cover shadow" />
          <div className="min-w-0 pt-0.5">
            <h2 className="text-xl font-medium leading-tight">{offer.title}</h2>
            <p className="mt-1 text-sm font-medium text-[#01875f]">now.gg</p>
            <p className="mt-0.5 text-xs text-[#5f6368]">Contains ads · In-app purchases</p>
          </div>
        </div>

        {/* stats */}
        <div className="mt-4 grid grid-cols-3 divide-x divide-[#e0e0e0] py-2 text-center">
          <div><p className="text-sm font-semibold">4.6★</p><p className="text-[11px] text-[#5f6368]">12K reviews</p></div>
          <div><p className="text-sm font-semibold">10M+</p><p className="text-[11px] text-[#5f6368]">Downloads</p></div>
          <div><p className="text-sm font-semibold">3+</p><p className="text-[11px] text-[#5f6368]">Rated for 3+</p></div>
        </div>

        {/* install */}
        <button className="mt-4 w-full rounded-lg bg-[#01875f] py-2.5 text-base font-semibold text-white">Install</button>

        {/* screenshot strip (placeholder tiles) */}
        <div className="mt-5 flex gap-3 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-40 w-24 shrink-0 overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={offer.icon} alt="" className="size-full object-cover" />
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm leading-relaxed text-[#5f6368]">
          Opening Google Play… Install <b className="text-[#202124]">{offer.title}</b>, complete the in-game goals, and your nowBux are credited automatically.
        </p>
      </div>
    </div>
  )
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 2.5v19l11-9.5z" fill="#00c1e8" />
      <path d="M3 2.5l11 9.5 4-3.4z" fill="#ffce47" />
      <path d="M3 21.5l11-9.5 4 3.4z" fill="#ff3d47" />
      <path d="M14 12l4-3.4 3 2.6c1 .6 1 1.6 0 2.2l-3 2.6z" fill="#00d15f" />
    </svg>
  )
}
