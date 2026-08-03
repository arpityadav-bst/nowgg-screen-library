// Decorative art for the nowPrime popup (dark/gold theme). Bespoke 3D gradients + shadows
// ported 1:1 from the approved design — kept as inline styles (not Tailwind) since they are
// multi-layer radial gradients / inset shadows that don't map cleanly to utilities.

const SPARKLE = 'M50 6 C54 34 66 46 94 50 C66 54 54 66 50 94 C46 66 34 54 6 50 C34 46 46 34 50 6 Z'

export function DiamondGold({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden style={{ filter: 'drop-shadow(0 2px 4px rgba(240,169,42,.5))' }}>
      <path d={SPARKLE} fill="#ffce47" />
    </svg>
  )
}

// The 82px premium coin: gold rim + dark-purple core with a gold sparkle.
export function Coin() {
  return (
    <div className="relative size-[82px] flex-none">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 34% 26%, #fff6d6 0%, #ffd45e 26%, #e0a028 62%, #8f5f12 100%)',
          boxShadow: '0 10px 20px rgba(0,0,0,.38), inset 0 0 16px rgba(120,80,10,.6), inset 0 3px 5px rgba(255,255,255,.65), inset 0 -6px 10px rgba(90,55,8,.6)',
        }}
      />
      <div
        className="absolute inset-[13px] flex items-center justify-center rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 30%, #4a386f 0%, #241844 55%, #120a26 100%)',
          boxShadow: 'inset 0 3px 10px rgba(0,0,0,.7), inset 0 -2px 6px rgba(120,90,200,.25)',
        }}
      >
        <svg viewBox="0 0 100 100" width="40" height="40" aria-hidden style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.5))' }}>
          <defs>
            <linearGradient id="np-coin-dg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff2c2" />
              <stop offset="0.5" stopColor="#ffcf55" />
              <stop offset="1" stopColor="#e39f24" />
            </linearGradient>
          </defs>
          <path d={SPARKLE} fill="url(#np-coin-dg)" />
        </svg>
      </div>
    </div>
  )
}

// Gold gradient check chip used for the benefit list.
export function GoldCheck() {
  return (
    <span
      className="flex size-[21px] flex-none items-center justify-center rounded-full"
      style={{
        background: 'radial-gradient(circle at 34% 28%, #ffe89a, #f0a92a 68%, #bd7f0d)',
        boxShadow: '0 2px 5px rgba(224,165,42,.45), inset 0 1px 1px rgba(255,255,255,.7), inset 0 -2px 3px rgba(120,75,8,.5)',
      }}
    >
      <Check className="size-[11px]" stroke="#3a2708" />
    </span>
  )
}

export function Check({ className, stroke = '#3a2708' }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 13l4 4L19 7" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Gift box for the "Earn Free Nowbux" offerwall CTA.
export function GiftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="3" y="8" width="18" height="12" rx="1.5" fill="#ffce47" />
      <rect x="3" y="8" width="18" height="4" rx="1" fill="#f0a92a" />
      <rect x="10.3" y="8" width="3.4" height="12" fill="#c9860f" />
      <path d="M12 8c-2.5 0-4-1.2-4-2.6C8 4.1 9 3.4 10 3.4c1.4 0 2 1.6 2 4.6z" fill="#ffe08a" />
      <path d="M12 8c2.5 0 4-1.2 4-2.6C16 4.1 15 3.4 14 3.4c-1.4 0-2 1.6-2 4.6z" fill="#ffe08a" />
    </svg>
  )
}
