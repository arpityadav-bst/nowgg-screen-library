# nowPrime Subscription Workflow — Implementation Spec

**Status:** design complete (in the screen-library replica); ready for production wiring.
**Surface:** the `nowPrime` upsell + a new subscription/management flow.
**Codebase:** `nowgg-screen-library` (Next.js 14 · React 18 · Tailwind · TypeScript).
**Live demo:** https://nowgg-screen-library-dun.vercel.app/ (open the `nowPrime` pill in the top bar, or the avatar → Subscriptions).

This spec describes the subscription experience built in the design replica and what the
production implementation must add. The replica is **UI/UX only** — no real payments, auth,
or backend. Everything under "Production wiring" below is stubbed and must be implemented.

---

## 1. What this delivers

A recurring **subscription** option for nowPrime, alongside the existing one-time passes,
surfaced in two places with a single connected flow:

- **Buy flow:** `nowPrime` upsell → choose a plan → checkout → active.
- **Manage flow:** Profile → Subscriptions → view active plan → cancel.

Three plans, one of which (**Monthly**) is a **recurring subscription**; the other two are
**one-time passes**.

## 2. Plans & pricing

| Plan | Price | Anchor | Discount | Billing | CTA |
|------|-------|--------|----------|---------|-----|
| Daily | $1.49 | — | — | One-time purchase | **Buy** |
| Weekly | $4.49 | ~~$5.99~~ | 25% OFF · Save 57% vs Daily | One-time purchase | **Buy** |
| Monthly | $9.99 | ~~$14.99~~ | 33% OFF · Save 78% vs Daily | Renews monthly | **Subscribe** |

- **Monthly is the "Best Value"** plan (badge + gold outline) and the only **recurring** one.
- **Region behavior:** where recurring subscriptions are supported, Monthly **auto-renews**.
  Elsewhere, Monthly is sold as a **30-day pass with no auto-renewal**. Footnote copy states
  this (see §6).
- Prices here are the **current proposed set**, not final. In production they must come from
  the **geo-localized pricing config/API** (per-country prices + currency), not be hardcoded.

## 3. Entry points

1. **Top bar** — the `nowPrime` pill (right cluster) opens the buy flow. When the user is
   subscribed, the header logo already switches to the gold **PRIME** lockup.
2. **Profile drawer → Subscriptions** —
   - Not subscribed: "Get nowPrime" → opens the buy flow.
   - Subscribed: shows **nowPrime · [plan] · Active** + "Manage Subscription" → opens the
     manage modal.

## 4. Buy flow (3 steps)

Rendered in `NowPrimePopup` (overlay, portaled to `<body>`).

1. **Select** — the three plan cards + perks + region footnote.
2. **Checkout** — selected-plan summary + a **Stripe hand-off**. The production build must
   redirect to **Stripe Checkout** here:
   - Monthly (supported regions) → **subscription mode** (recurring).
   - Daily / Weekly / Monthly (unsupported regions) → **one-time payment mode** (30-day access for Monthly).
3. **Done** — confirmation; the user is now nowPrime.

Back navigation from Checkout returns to Select. `Esc` / scrim click / close button dismiss.

## 5. Manage flow

Rendered in `ManageSubscriptionModal` (opened from the Profile drawer).

- Shows the active plan, status (**Active**), and billing (renews monthly / one-time pass).
- **Recurring plans** show **Cancel subscription**. Production: cancel at **period end** via
  Stripe (keep access until the period ends), then update state.
- One-time passes show no cancel (they simply expire).

## 6. Copy (exact strings)

- Perks: `No Ads` · `Play on any Proxy or VPN` · `Continue playing on any device` · `Full-screen immersive gameplay`
- Section: `Choose your plan`
- Billing labels: `One-time purchase` · `Renews monthly`
- Savings: `Save 57% vs Daily` · `Save 78% vs Daily`
- Best plan badge: `Best Value`
- Footnote: `*Subscription available in supported regions. Elsewhere you get a 30-day pass with no auto-renewal.`
- Checkout note: `You'll be securely redirected to Stripe to complete payment.`
- Checkout CTA: `Subscribe · $9.99/mo` (recurring) / `Pay $1.49` (one-time)
- Done: `You're all set` / `nowPrime is active on your [plan] plan. Enjoy ad-free play across every device.`
- Manage cancel note: `Cancel anytime — you keep nowPrime until the end of the current billing period.`

## 7. Design notes

- Overlay pattern: **black-70 scrim + white-20 frosted-glass panel**, portaled to `<body>`.
- Plan cards: white, `rounded-m`, equal height, prices aligned across cards. **Monthly** has
  the `Best Value` gradient badge **and a 2px gold ring** (`prime-gold`) to stand out.
- Struck anchor price + discount sit on one line to keep cards compact.
- All type is **Bricolage Grotesque** (now.gg's typeface), now **self-hosted** in
  `public/fonts/` so it renders offline / where Google Fonts is blocked. No runtime font CDN.

## 8. State (design-only → production)

`NowPrimeProvider` exposes `{ isPrime, plan, subscribe(plan), cancel() }`.

- **Design-only:** in-memory React state. `subscribe(plan)` sets the active plan; `cancel()`
  clears it; `isPrime = plan !== null`.
- **Production must replace this** with the real subscription status sourced from the backend
  / **Stripe webhooks** (checkout completed, renewal, cancellation, payment failure), scoped
  to the logged-in user.

## 9. Production wiring checklist (what's stubbed)

- [ ] **Stripe Checkout** — subscription mode (Monthly, supported regions) vs one-time mode.
- [ ] **Subscription status** from backend/webhooks → drive `isPrime` / active plan.
- [ ] **Region detection + gating** — recurring vs 30-day-pass fallback for Monthly.
- [ ] **Cancel** — cancel-at-period-end via Stripe; reflect in UI.
- [ ] **Geo-localized pricing** from config/API (replace hardcoded prices in `src/lib/now-prime.ts`).
- [ ] **US payment path** — US currently buys passes in nowbux (coins), not cards. Decide
      whether US subscriptions go to Stripe (card) or the coin wallet.
- [ ] **Auto-renew consent / legal** — cancel-anytime affordance; regional consent (e.g. EU).

## 10. Files

**New**
- `src/lib/now-prime.ts` — plan data (`PLANS`, `PERKS`, `REGION_NOTE`) + `Plan` type. Single source of truth for plans/pricing.
- `src/components/shell/ManageSubscriptionModal.tsx` — manage/cancel modal.
- `public/fonts/bricolage-grotesque-latin.woff2`, `…-latin-ext.woff2` — self-hosted font (SIL OFL).

**Modified**
- `src/components/play/NowPrimePopup.tsx` — the 3-step buy workflow.
- `src/components/providers/NowPrimeProvider.tsx` — active-plan state.
- `src/components/shell/ProfileSidebar.tsx` — reactive Subscriptions section + entry points.
- `src/components/shell/TopBar.tsx` — removed the retired Ana assistant widget.
- `src/app/globals.css`, `src/app/layout.tsx` — self-hosted font (removed Google Fonts `<link>`).
- `tailwind.config.ts` — added `src/lib` to content globs (plan data holds Tailwind class strings).

## 11. Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Open the `nowPrime` pill in the top bar, or the avatar → Subscriptions, to walk the flow.
