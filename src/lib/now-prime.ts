// nowPrime subscription plans + perks. New 3-plan pricing (USD): Daily and Weekly are
// one-time passes; Monthly is the auto-renewing subscription (Best Value). In supported
// regions Monthly renews via Stripe; elsewhere it falls back to a 30-day pass with no
// auto-renewal (REGION_NOTE). Design-only — prices are static, no real payment.

export const PERKS = ['No Ads', 'Play unlimited', 'Play on any Proxy or VPN'] as const

export type Plan = {
  id: 'daily' | 'weekly' | 'monthly'
  name: string
  titleColor: string   // Tailwind text-color class for the plan title
  price: string
  original?: string    // struck-through anchor price
  off?: string         // e.g. "25% OFF"
  saveVsDaily?: string // e.g. "Save 57% vs Daily"
  billing: string      // "One-time purchase" | "Renews monthly"
  cta: string          // "Buy" (one-time) | "Subscribe" (recurring)
  isSubscription?: boolean
  best?: boolean
}

export const PLANS: Plan[] = [
  {
    id: 'daily',
    name: 'Daily',
    titleColor: 'text-[#ff2d8f]',
    price: '$1.49',
    billing: 'One-time purchase',
    cta: 'Buy',
  },
  {
    id: 'weekly',
    name: 'Weekly',
    titleColor: 'text-[#2a2550]',
    price: '$4.49',
    original: '$5.99',
    off: '25% OFF',
    saveVsDaily: 'Save 57% vs Daily',
    billing: 'One-time purchase',
    cta: 'Buy',
  },
  {
    id: 'monthly',
    name: 'Monthly',
    titleColor: 'text-[#2f92db]',
    price: '$9.99',
    original: '$14.99',
    off: '33% OFF',
    saveVsDaily: 'Save 78% vs Daily',
    billing: 'Renews monthly',
    cta: 'Subscribe',
    isSubscription: true,
    best: true,
  },
]

export const REGION_NOTE =
  'Subscription available in supported regions. Elsewhere you get a 30-day pass with no auto-renewal.'
