'use client'
import { createContext, useContext, useState } from 'react'
import type { Plan } from '@/lib/now-prime'

// Global nowPrime subscription state (design-only — no real payment). `subscribe(plan)`
// records the active plan and flips the user to "nowPrime'd" (isPrime = plan !== null);
// the header logo then shows the gold PRIME lockup and the Profile drawer shows the
// active plan. `cancel()` clears it. Shared by the popup (checkout → subscribe), the
// TopBar logo, and the Profile "Manage Subscription" surface. Provided at the root layout
// so it reaches the header, the play page, and the portaled overlays alike.
type NowPrimeCtx = {
  isPrime: boolean
  plan: Plan | null
  subscribe: (plan: Plan) => void
  cancel: () => void
}

const NowPrimeContext = createContext<NowPrimeCtx>({
  isPrime: false,
  plan: null,
  subscribe: () => {},
  cancel: () => {},
})

export function NowPrimeProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Plan | null>(null)
  return (
    <NowPrimeContext.Provider
      value={{ isPrime: plan !== null, plan, subscribe: (p) => setPlan(p), cancel: () => setPlan(null) }}
    >
      {children}
    </NowPrimeContext.Provider>
  )
}

export const useNowPrime = () => useContext(NowPrimeContext)
