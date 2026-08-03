'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { useNowPrime } from '@/components/providers/NowPrimeProvider'
import { PERKS, PLANS, REGION_NOTE, type Plan } from '@/lib/now-prime'
import { Coin, GoldCheck, GiftIcon, DiamondGold, Check } from './NowPrimeArt'
import { Offerwall } from './offerwall/Offerwall'

// nowPrime subscription workflow — dark/gold modal, portaled to <body> (scroll-safe). Header
// band = coin + benefits hero. Body swaps per step:
//   select   → mobile-only "Earn Free Nowbux" offerwall CTA (Torox), then the 3 plan cards
//   checkout → plan summary + Stripe hand-off · done → confirmation.
// The offerwall CTA is mobile-only (md:hidden) — that's the surface we're pushing it on.
type Step = 'select' | 'checkout' | 'done'

const MODAL_BG = 'linear-gradient(180deg,#241d30 0%,#191426 52%,#140f1f 100%)'
const PINK_BTN = 'linear-gradient(180deg,#ff6fbb,#ff42a5 60%,#e6308f)'

export function NowPrimePopup({ onClose }: { onClose: () => void }) {
  const { subscribe } = useNowPrime()
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>('select')
  const [selected, setSelected] = useState<Plan | null>(null)

  useEffect(() => {
    setMounted(true)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  if (!mounted) return null

  const choose = (pl: Plan) => { setSelected(pl); setStep('checkout') }
  const confirm = () => { if (selected) subscribe(selected); setStep('done') }

  return createPortal(
    <div className="fixed inset-0 z-[60] overflow-y-auto" onClick={onClose}>
      <div className="fixed inset-0 bg-black-70" aria-hidden />
      <div className="relative flex min-h-full items-center justify-center p-4">
        <div
          className="relative z-10 w-full max-w-[404px] overflow-hidden rounded-[24px] border border-gold/50 text-white"
          style={{ background: MODAL_BG, boxShadow: '0 40px 90px rgba(0,0,0,.62), inset 0 1px 0 rgba(255,255,255,.14)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── header band: brand row + (on select) coin & benefits hero ── */}
          <div
            className="relative border-b border-white-10 px-[18px] pb-[18px] pt-4"
            style={{ background: 'radial-gradient(120% 90% at 22% 10%, rgba(255,206,71,.16), transparent 60%)' }}
          >
            <div className="mb-3 flex items-center">
              <span className="flex items-center gap-2">
                <DiamondGold className="size-[22px]" />
                <b className="text-[22px] font-extrabold leading-none -tracking-[0.3px]">
                  <span className="text-white">now</span><span className="text-gold">Prime</span>
                </b>
              </span>
              <button
                type="button" onClick={onClose} aria-label="Close"
                className="ml-auto flex size-[30px] items-center justify-center rounded-full bg-white-10 text-sm text-white-60 transition-colors hover:bg-white-20 hover:text-white"
              >
                ✕
              </button>
            </div>
            {step === 'select' && (
              <div className="flex items-center gap-4">
                <Coin />
                <ul className="flex flex-col gap-2.5">
                  {PERKS.map((p) => (
                    <li key={p} className="flex items-center gap-[9px] text-[15px] font-bold text-white">
                      <GoldCheck />{p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── body ── */}
          <div className="px-[18px] pb-5 pt-[18px]">
            {step === 'select' && <SelectStep onChoose={choose} />}
            {step === 'checkout' && selected && <CheckoutStep plan={selected} onBack={() => setStep('select')} onConfirm={confirm} />}
            {step === 'done' && selected && <DoneStep plan={selected} onClose={onClose} />}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

// ── Step 1: offerwall (mobile) + plan selection ──
function SelectStep({ onChoose }: { onChoose: (p: Plan) => void }) {
  return (
    <>
      {/* Earn Free Nowbux — mobile-only offerwall entry (Torox) */}
      <div className="md:hidden">
        <OfferwallCta />
        <div className="mb-3.5 mt-[18px] flex items-center gap-3 text-[12px] font-extrabold tracking-[1.4px] text-white-40">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white-20 to-transparent" />
          OR
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white-20 to-transparent" />
        </div>
      </div>

      <h2 className="mb-3 text-base font-extrabold text-white">Choose your plan</h2>
      <div className="grid grid-cols-3 items-stretch gap-[9px]">
        {PLANS.map((pl) => <PlanCard key={pl.id} pl={pl} onChoose={onChoose} />)}
      </div>
      <p className="mx-0.5 mt-3.5 text-[10.5px] font-medium leading-[1.45] text-white-40">*{REGION_NOTE}</p>
    </>
  )
}

function OfferwallCta() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
      type="button"
      onClick={() => setOpen(true)}
      className="relative flex w-full items-center gap-3.5 rounded-[17px] px-[18px] py-[15px] text-left transition-transform hover:-translate-y-px active:translate-y-px"
      style={{
        background: 'linear-gradient(180deg,#fff0b8 0%,#ffd65e 44%,#f0a52a 100%)',
        boxShadow: '0 12px 24px rgba(0,0,0,.42), 0 2px 0 rgba(150,95,12,.5), inset 0 2px 1px rgba(255,255,255,.85), inset 0 -7px 12px rgba(150,95,12,.32)',
      }}
    >
      <span
        className="absolute -top-[9px] left-4 rounded-full px-2.5 py-1 text-[10px] font-black tracking-[0.6px] text-white"
        style={{ background: 'linear-gradient(180deg,#ff6fbb,#ff0096)', boxShadow: '0 5px 12px rgba(255,0,150,.5)' }}
      >NEW</span>
      <span
        className="flex size-[52px] flex-none items-center justify-center rounded-[13px]"
        style={{ background: 'radial-gradient(circle at 40% 28%, #57451c, #241a06)', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,.35), 0 3px 6px rgba(0,0,0,.3)' }}
      >
        <GiftIcon className="size-[30px]" />
      </span>
      <span className="flex flex-col leading-[1.12]">
        <span className="text-[21px] font-black -tracking-[0.3px] text-[#2a1c04]">Earn Free Nowbux</span>
        <span className="mt-[3px] text-[12.5px] font-bold text-[#7a5410]">Complete offers to earn nowBux</span>
      </span>
      <span
        className="ml-auto flex size-[30px] flex-none items-center justify-center rounded-full text-[17px] font-black text-white"
        style={{ background: 'linear-gradient(180deg,#3a2b0a,#241a06)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.2), 0 3px 6px rgba(0,0,0,.3)' }}
      >→</span>
      </button>
      {open && <Offerwall onClose={() => setOpen(false)} />}
    </>
  )
}

function PlanCard({ pl, onChoose }: { pl: Plan; onChoose: (p: Plan) => void }) {
  return (
    <div
      className={cn('relative flex flex-col rounded-[14px] border px-2 pb-3 pt-[13px] text-center', pl.best ? 'border-2 border-gold' : 'border-[#e6e2ec]')}
      style={{ background: 'linear-gradient(180deg,#ffffff,#f4f1f8)', boxShadow: pl.best ? '0 10px 22px rgba(0,0,0,.4)' : '0 8px 18px rgba(0,0,0,.34)' }}
    >
      {pl.best && (
        <span
          className="absolute -top-[11px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-extrabold text-white"
          style={{ background: 'linear-gradient(180deg,#28d6ff,#7b5ce8)', boxShadow: '0 6px 14px rgba(90,80,200,.5)' }}
        >BEST VALUE</span>
      )}
      <div className={cn('mb-1.5 mt-0.5 text-[15px] font-extrabold', pl.titleColor)}>{pl.name}</div>
      <div className="mb-[7px] flex min-h-4 items-center justify-center gap-[5px] whitespace-nowrap text-[10.5px] font-extrabold">
        {pl.original ? <s className="text-[#e23b3b]">{pl.original}</s> : <span>{' '}</span>}
        {pl.off && <span className="text-[#33b062]">{pl.off}</span>}
      </div>
      <div className="text-[24px] font-black leading-none text-[#141414]">{pl.price}</div>
      <div className="mt-[5px] text-[10px] font-semibold leading-[1.25] text-[#7c7c86]">{pl.billing}</div>
      <div className="mb-0.5 mt-0.5 min-h-[13px] text-[10px] font-extrabold leading-[1.2] text-[#33b062]">{pl.saveVsDaily ?? ''}</div>
      <button
        type="button" onClick={() => onChoose(pl)}
        className="mt-auto w-full rounded-[9px] py-[9px] text-[14px] font-extrabold text-white"
        style={{ background: PINK_BTN, boxShadow: '0 6px 13px rgba(255,66,165,.42), inset 0 1px 0 rgba(255,255,255,.5)' }}
      >
        {pl.cta}
      </button>
    </div>
  )
}

// ── Step 2: Stripe hand-off ──
function CheckoutStep({ plan, onBack, onConfirm }: { plan: Plan; onBack: () => void; onConfirm: () => void }) {
  return (
    <>
      <button onClick={onBack} className="text-[12px] font-semibold text-white-60 transition-colors hover:text-white">← Back to plans</button>
      <div className="mt-3 rounded-[14px] border border-white-10 bg-white-05 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-white">{plan.name} Pass</p>
            <p className="text-[12px] text-white-60">{plan.billing}</p>
          </div>
          <p className="text-lg font-extrabold text-white">
            {plan.price}
            {plan.isSubscription && <span className="text-[12px] font-medium text-white-60">/mo</span>}
          </p>
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-4 text-white-50">You&apos;ll be securely redirected to Stripe to complete payment.</p>
      <button
        onClick={onConfirm}
        className="mt-4 w-full rounded-[10px] py-2.5 text-sm font-extrabold text-white"
        style={{ background: PINK_BTN, boxShadow: '0 6px 13px rgba(255,66,165,.42)' }}
      >
        {plan.isSubscription ? `Subscribe · ${plan.price}/mo` : `Pay ${plan.price}`}
      </button>
    </>
  )
}

// ── Step 3: confirmation ──
function DoneStep({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center py-2 text-center">
      <span
        className="flex size-14 items-center justify-center rounded-full"
        style={{ background: 'radial-gradient(circle at 34% 28%, #ffe89a, #f0a92a 68%, #bd7f0d)', boxShadow: '0 6px 16px rgba(224,165,42,.45)' }}
      >
        <Check className="size-7" />
      </span>
      <p className="mt-3 text-base font-extrabold text-white">You&apos;re all set</p>
      <p className="mt-1 text-[12px] leading-4 text-white-60">nowPrime is active on your {plan.name} plan. Enjoy ad-free play across every device.</p>
      <button
        onClick={onClose}
        className="mt-4 w-full rounded-[10px] py-2.5 text-sm font-extrabold text-white"
        style={{ background: PINK_BTN }}
      >
        Start playing ad-free
      </button>
    </div>
  )
}
