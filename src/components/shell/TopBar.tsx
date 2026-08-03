import { SearchBar } from './SearchBar'
import { ProfileMenu } from './ProfileMenu'
import { HeaderLogo } from './HeaderLogo'
import { BluestacksCta } from '@/components/ui/BluestacksCta'
import { NowPrimeCta } from '@/components/ui/NowPrimeCta'

// "Play Page Header / Desktop" — Figma 5315:8426. 64px, black-70 + heavy backdrop
// blur (glass) + white-10 hairline. Logo (40px) + AI search (search hidden on mobile)
// sit LEFT; then the right cluster: nowPrime CTA · BlueStacks CTA (desktop only) ·
// profile avatar. (Avatars are placeholders — see scratchpad.)
export function TopBar() {
  return (
    <header className="z-30 flex h-header shrink-0 items-center gap-3 border-b border-line bg-black-70 pl-6 pr-2 backdrop-blur-2xl">
      <HeaderLogo />

      {/* AI search — hidden on mobile (the white pill was crowding the narrow header); returns at tablet+ */}
      <div className="hidden min-w-0 flex-1 md:block">
        <SearchBar />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-3 pl-2">
        {/* nowPrime upsell CTA → opens the nowPrime popup */}
        <NowPrimeCta />
        {/* cross-brand download CTA → desktop only (BlueStacks is a PC download) */}
        <div className="hidden lg:block">
          <BluestacksCta />
        </div>
        {/* logged-in user avatar → opens the Profile sidebar (Figma User-Profile 26500:133019) */}
        <ProfileMenu />
      </div>
    </header>
  )
}
