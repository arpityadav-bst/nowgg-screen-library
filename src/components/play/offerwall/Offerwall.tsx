'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { type Offer } from '@/lib/offerwall-data'
import { OfferwallHome } from './OfferwallHome'
import { OfferDetail } from './OfferDetail'
import { PlayStoreMock } from './PlayStoreMock'

// nowBux offerwall (Torox-style), opened from the mobile "Earn Free Nowbux" CTA. Full-screen
// overlay, portaled to <body>. Flow: Home (offer list) → Offer detail (goals) → "Play & Earn"
// opens the Play Store (mobile path). Design-only mock, branded with the nowBux currency.
type View = { name: 'home' } | { name: 'detail'; offer: Offer } | { name: 'store'; offer: Offer }

export function Offerwall({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [view, setView] = useState<View>({ name: 'home' })
  useEffect(() => {
    setMounted(true)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[70] mx-auto flex max-w-[420px] flex-col overflow-hidden bg-[#161a3c] text-white">
      {/* ambient purple glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(85% 55% at 50% 22%, rgba(120,90,220,.20), transparent 70%)' }}
        aria-hidden
      />

      {/* top bar */}
      <div className="relative z-[1] flex shrink-0 items-center px-4 py-3.5">
        <span className="flex size-9 items-center justify-center rounded-lg bg-[#6a4bd6]/25">
          <svg viewBox="0 0 24 24" className="size-6 text-[#a084ff]" fill="currentColor" aria-hidden>
            <path d="M4 3l4.5 3L12 3l3.5 3L20 3l-2.5 8.5c-.7 2.4-2.9 4.5-5.5 4.5s-4.8-2.1-5.5-4.5L4 3z" />
            <path d="M9 13.5c0 1.7 1.3 3 3 3s3-1.3 3-3" stroke="#161a3c" strokeWidth="1.6" fill="none" />
          </svg>
        </span>
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
          <svg viewBox="0 0 24 24" className="size-5 text-[#f5b400]" fill="none" aria-hidden>
            <path d="M3 11l9-8 9 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 9.5V20h14V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-base font-bold">Home</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close offerwall"
          className="ml-auto flex size-9 items-center justify-center rounded-full bg-black-40 text-white/80 transition-colors hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* scrollable body */}
      <div className="scroll-thin relative z-[1] min-h-0 flex-1 overflow-y-auto">
        {view.name === 'home' && <OfferwallHome onOpen={(o) => setView({ name: 'detail', offer: o })} />}
        {view.name === 'detail' && (
          <OfferDetail offer={view.offer} onBack={() => setView({ name: 'home' })} onPlay={() => setView({ name: 'store', offer: view.offer })} />
        )}
      </div>

      {view.name === 'store' && <PlayStoreMock offer={view.offer} onClose={() => setView({ name: 'detail', offer: view.offer })} />}
    </div>,
    document.body,
  )
}
