'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloseButton } from '@/components/ui/CloseButton'
import { Button } from '@/components/ui/Button'
import { useNowPrime } from '@/components/providers/NowPrimeProvider'

// "Manage subscription" modal, opened from the Profile drawer when a plan is active.
// Shows the active nowPrime plan and lets the user cancel (design-only: cancel() clears
// state, which flips the header logo back and updates the drawer). Follows taste 13 —
// black-70 scrim, white-20 frosted-glass panel — and portals to <body>. Sits above the
// Profile drawer (z-70 > z-50).
export function ManageSubscriptionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { isPrime, plan, cancel } = useNowPrime()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])
  if (!mounted || !open) return null

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Manage subscription">
      <div className="absolute inset-0 bg-black-70" onClick={onClose} aria-hidden />
      <div
        className="relative z-10 w-full max-w-[400px] overflow-hidden rounded-card border border-line bg-white-20 shadow-fl-lg backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 pb-3 pt-4">
          <h2 className="text-base font-bold text-text-primary">Manage subscription</h2>
          <CloseButton onClose={onClose} />
        </div>

        <div className="p-5">
          {isPrime && plan ? (
            <>
              <div className="rounded-m border border-white-20 bg-black-20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icons/now-gg/now-prime-logo.webp" alt="" aria-hidden className="size-5" />
                    <p className="text-sm font-bold text-text-primary">{plan.name} plan</p>
                  </div>
                  <span className="rounded-pill bg-status-success/20 px-2 py-0.5 text-3xs font-bold uppercase tracking-wide text-status-success">
                    Active
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-2xs">
                  <span className="text-text-muted">{plan.isSubscription ? 'Renews monthly' : 'One-time · 30-day pass'}</span>
                  <span className="font-semibold text-text-primary">
                    {plan.price}
                    {plan.isSubscription && '/mo'}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-3xs leading-4 text-text-faint">
                {plan.isSubscription
                  ? 'Cancel anytime — you keep nowPrime until the end of the current billing period.'
                  : 'This is a one-time pass and will not auto-renew.'}
              </p>
              {plan.isSubscription && (
                <Button variant="outline" size="md" className="mt-4 w-full" onClick={() => { cancel(); onClose() }}>
                  Cancel subscription
                </Button>
              )}
            </>
          ) : (
            <p className="text-sm text-text-secondary">You don&apos;t have an active subscription.</p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
