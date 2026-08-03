import { OFFERS, type Offer } from '@/lib/offerwall-data'
import { RewardPill } from './OfferwallParts'

// Offerwall landing: tab row + the scrollable list of offers. Design-only mock.
export function OfferwallHome({ onOpen }: { onOpen: (o: Offer) => void }) {
  return (
    <div className="px-4 pb-8">
      {/* tabs */}
      <div className="mb-4 flex items-center gap-5 border-b border-white/10 text-sm font-semibold">
        <span className="relative flex items-center gap-1.5 pb-2.5 text-[#f5b400]">
          <svg viewBox="0 0 40 24" className="h-4 w-6" fill="none" aria-hidden>
            <path d="M12 12c0-3-2.4-5.5-5.3-5.5S1.4 9 1.4 12s2.4 5.5 5.3 5.5S12 15 12 12zm0 0c0 3 2.4 5.5 5.3 5.5S22.6 15 22.6 12 20.2 6.5 17.3 6.5 12 9 12 12z" stroke="#f5b400" strokeWidth="2.4" />
          </svg>
          All
          <span className="absolute inset-x-0 -bottom-px h-0.5 rounded bg-[#f5b400]" />
        </span>
        <span className="flex items-center gap-1.5 pb-2.5 text-white/45">🎮 Gaming</span>
        <span className="flex items-center gap-1.5 pb-2.5 text-white/45">🗒 Surveys &amp; Tasks</span>
        <span className="ml-auto flex items-center gap-1 pb-2.5 text-white/70">⇅ Sort</span>
      </div>

      <div className="flex flex-col gap-3">
        {OFFERS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onOpen(o)}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-3 text-left transition-colors hover:border-white/25"
          >
            <div className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={o.icon} alt="" className="size-[70px] shrink-0 rounded-2xl object-cover" />
              <div className="min-w-0">
                <p className="text-[17px] font-bold leading-tight">{o.title}</p>
                <p className="mt-1 text-[13px] leading-snug text-white/55">{o.blurb}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap rounded-full border border-white/20 px-2.5 py-1 text-[11.5px] font-medium text-white/85">{o.category}</span>
              <span className="whitespace-nowrap rounded-full border border-white/20 px-2.5 py-1 text-[11.5px] font-medium text-white/85">Completed {o.completed} Times</span>
              <RewardPill amount={o.reward} className="ml-auto shrink-0" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
