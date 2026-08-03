import type { Metadata } from 'next'
import './globals.css'
import { NowPrimeProvider } from '@/components/providers/NowPrimeProvider'
import { DevicePreview } from '@/components/demo/DevicePreview'

export const metadata: Metadata = {
  title: 'now.gg — design handoff',
  description: 'Design-only replica of now.gg (homepage + game page) for developer handoff.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Bricolage Grotesque — now.gg's typeface — is self-hosted via @font-face in
          globals.css (files in /public/fonts). No runtime Google Fonts dependency, so it
          renders reliably for dev handoff (offline / firewalled / Google-Fonts-blocked). */}
      <body className="min-h-screen bg-page-bg text-text-primary antialiased">
        <NowPrimeProvider>{children}</NowPrimeProvider>
        <DevicePreview />
      </body>
    </html>
  )
}
