'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

// DEMO-ONLY device-preview toggle (not a product feature). A floating toolbar; picking
// Mobile/Tablet loads the CURRENT page inside a width-constrained iframe, so the responsive
// layout renders at that device's viewport width (media queries respond to the iframe width,
// not the browser — a plain narrow div would only squish the desktop layout). Hidden inside
// the preview iframe itself (window.top guard) so it never nests. Mounted in the root layout.
type Device = 'desktop' | 'tablet' | 'mobile'
const SIZES: Record<Exclude<Device, 'desktop'>, { w: number; label: string }> = {
  mobile: { w: 390, label: 'Mobile · 390px' },
  tablet: { w: 768, label: 'Tablet · 768px' },
}

export function DevicePreview() {
  const [mounted, setMounted] = useState(false)
  const [device, setDevice] = useState<Device>('desktop')
  const pathname = usePathname()
  useEffect(() => setMounted(true), [])

  // Never render inside the preview iframe (avoids a nested toolbar / infinite frames).
  if (!mounted || window.self !== window.top) return null

  const framed = device !== 'desktop'

  return (
    <>
      {framed && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center gap-3 overflow-auto bg-black-80 p-4 pt-14 backdrop-blur-sm">
          <p className="shrink-0 text-xs font-medium text-white-70">{SIZES[device].label}</p>
          <div
            className="h-[82vh] shrink-0 overflow-hidden rounded-[28px] border-[6px] border-black-90 bg-white shadow-fl-lg"
            style={{ width: SIZES[device].w, maxWidth: '100%' }}
          >
            <iframe
              key={`${device}-${pathname}`}
              src={pathname}
              title="Device preview"
              className="size-full border-0"
            />
          </div>
        </div>
      )}

      <div className="fixed bottom-4 left-1/2 z-[101] flex -translate-x-1/2 items-center gap-1 rounded-pill border border-line bg-surface/95 p-1 shadow-fl-lg backdrop-blur">
        <span className="px-2 text-3xs font-semibold uppercase tracking-wide text-text-dim">Preview</span>
        {(['mobile', 'tablet', 'desktop'] as Device[]).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDevice(d)}
            className={cn(
              'rounded-pill px-3 py-1.5 text-xs font-semibold capitalize transition-colors',
              device === d ? 'bg-accent text-white' : 'text-text-tertiary hover:text-text-primary',
            )}
          >
            {d}
          </button>
        ))}
      </div>
    </>
  )
}
