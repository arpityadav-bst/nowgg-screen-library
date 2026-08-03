'use client'
import { useState } from 'react'
import { cn } from '@/lib/cn'
import { HEADER_PILL } from './headerPill'
import { NowPrimePopup } from '@/components/play/NowPrimePopup'

// Header "nowPrime" CTA — mirrors the BluestacksCta header pill (white-10 pill, 0.8px
// white-20 hairline, soft drop shadow) but carries the nowPrime logo art + wordmark
// (real now.gg assets). Click opens the nowPrime upsell popup (portaled, so it works from
// any page's header). The wordmark collapses below lg (logo-only) to fit the tight mobile
// header — same responsive behaviour as the BlueStacks pill.
export function NowPrimeCta({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open nowPrime"
        className={cn(
          HEADER_PILL,
          'gap-2 py-2',
          className,
        )}
      >
        {/* nowPrime logo art (with a mobile glint) + wordmark — real now.gg assets */}
        <span className="relative inline-flex size-6 shrink-0 overflow-hidden rounded-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/now-gg/now-prime-logo.webp" alt="" aria-hidden className="size-6" />
          {/* shine sweep — mobile only (below lg), where the CTA is icon-only */}
          <span
            className="np-coin-glint pointer-events-none absolute -inset-y-1 left-0 w-[42%] lg:hidden"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent)' }}
            aria-hidden
          />
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/now-gg/now-prime-text.webp" alt="nowPrime" className="-mt-0.5 hidden h-4 w-auto lg:block" />
      </button>
      {open && <NowPrimePopup onClose={() => setOpen(false)} />}
    </>
  )
}
