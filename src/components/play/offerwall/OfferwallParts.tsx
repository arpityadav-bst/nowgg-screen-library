import { cn } from '@/lib/cn'
import { fmtBux } from '@/lib/offerwall-data'

// nowBux currency mark — two overlapping rings (drop-in for the real nowBux logo).
export function NowbuxCoin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 24" fill="none" className={className} aria-hidden>
      <circle cx="9.5" cy="12" r="6.4" stroke="currentColor" strokeWidth="2.3" />
      <circle cx="16.5" cy="12" r="6.4" stroke="currentColor" strokeWidth="2.3" />
    </svg>
  )
}

// Solid lime reward pill (offer list + detail header).
export function RewardPill({ amount, className }: { amount: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full bg-[#c5e860] px-3 py-1.5 text-sm font-extrabold text-[#1b1f43]', className)}>
      <NowbuxCoin className="size-[18px] text-[#1b1f43]" />
      {fmtBux(amount)}
    </span>
  )
}
