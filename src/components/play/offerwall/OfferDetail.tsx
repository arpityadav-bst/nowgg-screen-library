import { type Offer } from '@/lib/offerwall-data'
import { RewardPill, NowbuxCoin } from './OfferwallParts'

// Offer detail: hero art, reward, description, the goals list, and the sticky "Play & Earn"
// CTA (which opens the Play Store on mobile). Design-only mock.
export function OfferDetail({ offer, onBack, onPlay }: { offer: Offer; onBack: () => void; onPlay: () => void }) {
  return (
    <div className="pb-28">
      {/* hero */}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={offer.icon} alt="" className="h-52 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161a3c] via-transparent to-transparent" aria-hidden />
        <button onClick={onBack} aria-label="Back" className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full bg-black-50 text-lg text-white backdrop-blur">←</button>
      </div>

      <div className="px-4">
        <div className="mt-3 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-extrabold">{offer.title}</h2>
          <RewardPill amount={offer.reward} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/60">{offer.blurb} Are you ready? Complete the goals below to earn nowBux.</p>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[.03] p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Goals</h3>
            <span className="text-sm text-white/60">{offer.goals.length} Goals</span>
          </div>
          <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-3">
            {offer.goals.map((g) => (
              <div key={g.n} className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/25 text-xs font-bold">{g.n}</span>
                <span className="flex-1 text-sm font-semibold">{g.label}</span>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#c5e860] px-2.5 py-1 text-xs font-bold text-[#c5e860]">
                  <NowbuxCoin className="size-4" /> {g.reward}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* sticky Play & Earn */}
      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-[420px] bg-gradient-to-t from-[#161a3c] via-[#161a3c] to-transparent p-4 pt-8">
        <button
          onClick={onPlay}
          className="w-full rounded-full bg-[#c5e860] py-4 text-lg font-extrabold text-[#1b1f43] shadow-[0_10px_30px_rgba(0,0,0,.5)] transition-transform active:scale-[.99]"
        >
          Play &amp; Earn
        </button>
      </div>
    </div>
  )
}
