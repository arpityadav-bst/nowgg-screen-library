'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ChevronRight, CloseGlyph, DiscordGlyph, YouTubeGlyph } from '@/components/ui/icons'
import { GAMES } from '@/lib/mock-data'
import { cn } from '@/lib/cn'
import { useNowPrime } from '@/components/providers/NowPrimeProvider'
import { NowPrimePopup } from '@/components/play/NowPrimePopup'
import { ManageSubscriptionModal } from './ManageSubscriptionModal'

// Profile sidebar — right-side drawer opened from the TopBar avatar (Figma "Gamification
// Sidebar" / User-Profile 26500:133019). FROSTED GLASS panel (white-20 + backdrop-blur)
// over the always-black-70 scrim — same glass treatment as the popups (taste rule 13).
// Portaled to <body> to escape the TopBar header's backdrop-blur containing block.
// Header · profile row · stat cards · Subscriptions · Recently played · pinned footer.
// Design-only: name/email/stats are mock; Logout / Manage / help are non-functional.

const PROFILE = { name: 'TriflingStandpoint', email: 'trifling.standpoint@gmail.com', avatar: '/profile-avatar.png' }
const STATS = [
  { label: 'Games Played', value: '24', badge: '/profile/badge-game-cards.svg' },
  { label: 'Total Playtime', value: '2 hr 49 min', badge: '/profile/badge-gold-cauldron.svg' },
]
const RECENT = GAMES.slice(0, 4)

// Rounded-square button that nests in the panel's top-left notch (desktop only).
function NotchButton({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-xxl border border-line bg-white-20 text-text-primary backdrop-blur-2xl transition-colors hover:bg-white-30"
    >
      {children}
    </button>
  )
}

// Compact in-drawer subsection header: leading icon + title + accent chevron affordance.
function SubHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <button type="button" className="flex items-center gap-2 text-left">
      {icon}
      <span className="text-sm font-semibold text-text-primary">{title}</span>
      <ChevronRight className="size-4 text-accent" />
    </button>
  )
}

export function ProfileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Portal to <body>: the TopBar header has `backdrop-blur`, which makes it the
  // containing block for fixed descendants — mounting here would trap the overlay
  // inside the 64px header. Portaling escapes it so `fixed inset-0` fills the viewport.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const { isPrime, plan } = useNowPrime()
  const [manageOpen, setManageOpen] = useState(false)
  const [primeOpen, setPrimeOpen] = useState(false)

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  if (!mounted) return null

  return createPortal(
    <>
    <div
      className={cn('fixed inset-0 z-50', open ? 'pointer-events-auto' : 'pointer-events-none')}
      role="dialog"
      aria-modal="true"
      aria-label="Profile"
      aria-hidden={!open}
    >
      {/* scrim — ALWAYS black-70 (taste 13) */}
      <div
        className={cn('absolute inset-0 bg-black-70 transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')}
        onClick={onClose}
        aria-hidden
      />

      {/* drawer panel */}
      <aside
        className={cn(
          'absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col border border-line bg-white-20 shadow-fl-lg backdrop-blur-2xl transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* notch buttons — sit just outside the panel's top-left where the scrim shows (desktop).
            Gated on `open`: their negative X-translate would otherwise leave them on-screen
            even while the panel is slid off (translate-x-full). */}
        <div className={cn('absolute left-0 top-4 hidden -translate-x-[calc(100%+12px)] flex-col gap-2 transition-opacity duration-300 sm:flex', open ? 'opacity-100' : 'pointer-events-none opacity-0')}>
          <NotchButton label="Close profile" onClick={onClose}>
            <CloseGlyph className="size-5" />
          </NotchButton>
          <NotchButton label="Help">
            <Icon name="help" size={16} className="size-5" />
          </NotchButton>
        </div>

        {/* header — title only; the avatar lives in the profile row below (no duplicate).
            Close on desktop = the notch button; on mobile = the X here (no notch on mobile). */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-5 pb-3 pt-5">
          <h2 className="text-base font-bold text-text-primary">Profile</h2>
          <button type="button" onClick={onClose} aria-label="Close profile" className="text-text-tertiary transition-colors hover:text-text-primary sm:hidden">
            <CloseGlyph className="size-5" />
          </button>
        </div>

        {/* scrollable content */}
        <div className="scroll-thin min-h-0 flex-1 space-y-6 overflow-y-auto px-5 pb-5">
          {/* profile row */}
          <div className="flex items-center gap-3 pt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROFILE.avatar} alt="" className="size-16 shrink-0 rounded-pill object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-bold text-text-primary">{PROFILE.name}</p>
              <p className="truncate text-xs text-text-muted">{PROFILE.email}</p>
            </div>
            <button type="button" aria-label="Edit profile" className="shrink-0 text-text-primary transition-opacity hover:opacity-70">
              {/* Figma "Edit Details" pencil (26502:62323) — white Text/Title, 18px frame.
                  Inlined as currentColor (library edit.svg is a different, solid-pink pencil). */}
              <svg viewBox="0 0 18 18" className="size-[18px]" fill="currentColor" aria-hidden><path d="M10.6875 14.125C10.4114 14.125 10.1875 14.3489 10.1875 14.625C10.1875 14.9011 10.4114 15.125 10.6875 15.125V14.625V14.125ZM15.1875 15.125C15.4636 15.125 15.6875 14.9011 15.6875 14.625C15.6875 14.3489 15.4636 14.125 15.1875 14.125V14.625V15.125ZM2.6032 11.7433L2.25635 11.3832C2.17434 11.4621 2.12175 11.5668 2.10726 11.6797L2.6032 11.7433ZM2.25 14.4968L1.75406 14.4331C1.73432 14.587 1.78714 14.7414 1.89704 14.8509C2.00693 14.9604 2.16144 15.0127 2.31527 14.9925L2.25 14.4968ZM5.11483 14.1196L5.18009 14.6153C5.28568 14.6014 5.38407 14.5541 5.46093 14.4804L5.11483 14.1196ZM14.6158 5.00676L14.2744 4.6414L14.2697 4.64591L14.6158 5.00676ZM14.6551 3.42258L15.0135 3.07391C15.0096 3.06991 15.0056 3.06597 15.0016 3.06209L14.6551 3.42258ZM14.6158 3.38486L14.9623 3.02437L14.9623 3.02437L14.6158 3.38486ZM13.7917 2.59277L13.4402 2.94838L13.4452 2.95326L13.7917 2.59277ZM12.1435 2.55505L11.8092 2.18317C11.8051 2.1869 11.801 2.1907 11.797 2.19456L12.1435 2.55505ZM12.1042 2.59277L11.7577 2.23228L11.7574 2.23264L12.1042 2.59277ZM11.5186 3.47157C11.3249 3.27481 11.0083 3.27238 10.8115 3.46614C10.6148 3.6599 10.6123 3.97647 10.8061 4.17323L11.1624 3.8224L11.5186 3.47157ZM12.5812 5.97583L12.9321 6.33209L13.6446 5.63043L13.2938 5.27417L12.9375 5.625L12.5812 5.97583ZM10.6875 14.625V15.125H15.1875V14.625V14.125H10.6875V14.625ZM2.6032 11.7433L2.10726 11.6797L1.75406 14.4331L2.25 14.4968L2.74594 14.5604L3.09913 11.8069L2.6032 11.7433ZM2.25 14.4968L2.31527 14.9925L5.18009 14.6153L5.11483 14.1196L5.04956 13.6238L2.18473 14.001L2.25 14.4968ZM5.11483 14.1196L5.46093 14.4804L14.9619 5.36761L14.6158 5.00676L14.2697 4.64591L4.76872 13.7587L5.11483 14.1196ZM14.6158 5.00676L14.9572 5.37209C15.274 5.07609 15.4613 4.66825 15.472 4.23476L14.9721 4.22238L14.4723 4.20999C14.4684 4.36893 14.3998 4.52435 14.2745 4.64143L14.6158 5.00676ZM14.9721 4.22238L15.472 4.23476C15.4827 3.80121 15.3158 3.38469 15.0135 3.07391L14.6551 3.42258L14.2967 3.77125C14.4155 3.89331 14.4762 4.05112 14.4723 4.20999L14.9721 4.22238ZM14.6551 3.42258L15.0016 3.06209L14.9623 3.02437L14.6158 3.38486L14.2694 3.74535L14.3086 3.78307L14.6551 3.42258ZM14.6158 3.38486L14.9623 3.02437L14.1382 2.23228L13.7917 2.59277L13.4452 2.95326L14.2694 3.74535L14.6158 3.38486ZM13.7917 2.59277L14.1432 2.23719C13.8355 1.93301 13.42 1.76036 12.987 1.75045L12.9756 2.25032L12.9642 2.75019C13.1476 2.75439 13.3181 2.82764 13.4402 2.94835L13.7917 2.59277ZM12.9756 2.25032L12.987 1.75045C12.5541 1.74054 12.131 1.89396 11.8092 2.18317L12.1435 2.55505L12.4777 2.92693C12.6062 2.8114 12.7807 2.74599 12.9642 2.75019L12.9756 2.25032ZM12.1435 2.55505L11.797 2.19456L11.7577 2.23228L12.1042 2.59277L12.4507 2.95327L12.4899 2.91555L12.1435 2.55505ZM12.1042 2.59277L11.7574 2.23264L2.25635 11.3832L2.6032 11.7433L2.95005 12.1034L12.4511 2.95291L12.1042 2.59277ZM11.1624 3.8224L10.8061 4.17323L12.5812 5.97583L12.9375 5.625L13.2938 5.27417L11.5186 3.47157L11.1624 3.8224Z" /></svg>
            </button>
          </div>

          {/* stat cards — Figma "User Profile / Stats Row" (26502:58932 / :59014): compact
              44px chips, black-20 fill + white-20 hairline (r12), 10px label / 12px value,
              with the full-color Figma badge illustration (frosted tile + glyph) anchored to
              the right edge. Content reserves 40px right padding so text clears the badge. */}
          <div className="grid grid-cols-2 gap-2">
            {STATS.map((s) => (
              <div key={s.label} className="relative flex h-12 flex-col justify-center overflow-hidden rounded-card border border-white-20 bg-black-20 px-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.badge} alt="" aria-hidden className="pointer-events-none absolute inset-y-0 right-0 h-full select-none" />
                <div className="relative pr-10">
                  <p className="text-3xs leading-3 tracking-[0.02em] text-text-tertiary">{s.label}</p>
                  <p className="text-2xs font-semibold leading-4 text-text-primary">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* subscriptions */}
          <section className="space-y-3">
            <SubHeader
              icon={
                /* Figma "Tags/Editor" badge (26502:62325) — hexagon with a star knockout. */
                <svg viewBox="0 0 16 16" className="size-5 text-text-tertiary" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.99998 0.577275C8.38118 0.22001 7.61878 0.22001 6.99998 0.577275L2.07178 3.42258C1.45298 3.77984 1.07178 4.44009 1.07178 5.15463V10.8452C1.07178 11.5598 1.45297 12.22 2.07178 12.5773L6.99998 15.4226C7.61878 15.7798 8.38118 15.7798 8.99998 15.4226L13.9282 12.5773C14.547 12.22 14.9282 11.5598 14.9282 10.8452V5.15463C14.9282 4.44009 14.547 3.77984 13.9282 3.42258L8.99998 0.577275ZM8.18889 3.5434C8.12663 3.36429 7.87333 3.36429 7.81107 3.5434L6.8701 6.25043C6.84264 6.32945 6.7689 6.38302 6.68527 6.38473L3.81995 6.44312C3.63037 6.44698 3.55209 6.68789 3.7032 6.80245L5.98696 8.53388C6.05362 8.58442 6.08179 8.6711 6.05757 8.75117L5.22767 11.4943C5.17276 11.6758 5.37769 11.8247 5.53334 11.7164L7.88574 10.0794C7.95441 10.0316 8.04555 10.0316 8.11422 10.0794L10.4666 11.7164C10.6223 11.8247 10.8272 11.6758 10.7723 11.4943L9.94239 8.75117C9.91817 8.6711 9.94634 8.58442 10.013 8.53388L12.2968 6.80245C12.4479 6.68789 12.3696 6.44698 12.18 6.44312L9.31469 6.38473C9.23106 6.38302 9.15732 6.32945 9.12986 6.25043L8.18889 3.5434Z" />
                </svg>
              }
              title="Subscriptions"
            />
            <div className="rounded-card border border-line bg-black-20 p-4">
              {isPrime && plan ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/icons/now-gg/now-prime-logo.webp" alt="" aria-hidden className="size-5" />
                      <p className="text-sm font-semibold text-text-primary">nowPrime · {plan.name}</p>
                    </div>
                    <span className="rounded-pill bg-status-success/20 px-2 py-0.5 text-3xs font-bold uppercase tracking-wide text-status-success">
                      Active
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-3" onClick={() => setManageOpen(true)}>Manage Subscription</Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-text-secondary">Go ad-free with nowPrime — play on any device, no interruptions.</p>
                  <Button variant="ghost" size="sm" className="mt-3" onClick={() => setPrimeOpen(true)}>Get nowPrime</Button>
                </>
              )}
            </div>
          </section>

          {/* recently played */}
          <section className="space-y-3">
            <SubHeader icon={<Icon name="history" size={24} className="size-5 text-text-tertiary" />} title="Recently played" />
            <div className="grid grid-cols-4 gap-2.5">
              {RECENT.map((g) => (
                <Link
                  key={g.id}
                  href={`/play/${g.id}`}
                  onClick={onClose}
                  title={g.title}
                  className="relative aspect-square overflow-hidden rounded-card ring-1 ring-line transition-transform hover:scale-[1.04]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.icon} alt={g.title} className="size-full object-cover" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* footer (pinned) */}
        <div className="shrink-0 space-y-4 px-5 pb-5 pt-3">
          <div className="space-y-1.5 text-xs text-text-faint">
            <p className="flex items-center gap-2"><a className="cursor-pointer hover:text-text-tertiary">All Games</a><span className="text-text-dim">•</span><a className="cursor-pointer hover:text-text-tertiary">Developers</a></p>
            <p className="flex items-center gap-2"><a className="cursor-pointer hover:text-text-tertiary">About us</a><span className="text-text-dim">•</span><a className="cursor-pointer hover:text-text-tertiary">Terms and Conditions</a></p>
          </div>
          <div className="flex items-center justify-between border-t border-line pt-4">
            <div className="flex gap-2.5">
              <a aria-label="Discord" className="flex size-11 cursor-pointer items-center justify-center rounded-xxl border border-line bg-black-20 text-text-secondary transition-colors hover:text-text-primary">
                <DiscordGlyph className="size-5" />
              </a>
              <a aria-label="YouTube" className="flex size-11 cursor-pointer items-center justify-center rounded-xxl border border-line bg-black-20 text-text-secondary transition-colors hover:text-text-primary">
                <YouTubeGlyph className="size-5" />
              </a>
            </div>
            <Button variant="outline" size="md" onClick={onClose}>
              Logout
              <Icon name="logout" size={24} className="size-4" />
            </Button>
          </div>
        </div>
      </aside>
    </div>
    <ManageSubscriptionModal open={manageOpen} onClose={() => setManageOpen(false)} />
    {primeOpen && <NowPrimePopup onClose={() => setPrimeOpen(false)} />}
    </>,
    document.body,
  )
}
