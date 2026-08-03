import type { Config } from 'tailwindcss'

// ───────────────────────────────────────────────────────────────────────────
// now.gg design tokens. Foundation = the FLOAT design system, extracted live from
// Figma (apmb9PRrJYKc7cNhCUgz7L) via the Desktop Bridge — see
// design-source/figma/design-system/ (DESIGN-SYSTEM.md + tokens.resolved.json).
// Layout/ambient values without a Figma source are reverse-engineered from the live
// now.gg site (design-source/). Float scales (Base ramp, Spacings, Radius, type,
// effects) were folded in 2026-06-03; legacy semantic names are preserved.
// ───────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/screens/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}', // plan data holds Tailwind class strings (titleColor)
  ],
  theme: {
    extend: {
      // ─── Font ──────────────────────────────────────────────
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      // ─── Font size — now.gg UI scale + Float display scale (Title/*) ──
      fontSize: {
        '3xs': ['10px', { lineHeight: '14px' }],   // tile labels, meta
        '2xs': ['12px', { lineHeight: '18px' }],   // small labels
        'xs':  ['13px', { lineHeight: '19.5px' }], // dense secondary
        'sm':  ['14px', { lineHeight: '21px' }],   // body / card titles / CTA
        'base':['16px', { lineHeight: '24px' }],   // blog titles / subtitles
        'lg':  ['20px', { lineHeight: '30px' }],   // section headings
        'xl':  ['24px', { lineHeight: '32px' }],   // game title / bumped section headers
        '2xl': ['32px', { lineHeight: '48px' }],   // large section headings
        // Float Title scale (Bricolage Grotesque, display)
        '3xl': ['36px', { lineHeight: '47px' }],
        '4xl': ['48px', { lineHeight: '62px' }],
        '5xl': ['64px', { lineHeight: '70px' }],
        '6xl': ['72px', { lineHeight: '79px' }],
      },

      // ─── Colors ────────────────────────────────────────────
      colors: {
        // Brand accent — now.gg pink (Float Accent).
        accent: {
          DEFAULT:  '#ff42a5',  // primary CTAs, "Show More", active
          hot:      '#ff0096',  // sharper pink — tile hover ring / focus
          glow:     '#ff0094',  // inset glow shadow color
          hover:    '#ff3392',  // Float Accent Hover
          press:    '#e6308f',  // (synthesized) active
          label:    '#c20568',  // Float Accent-Dark (label on light buttons)
          darkHover:'#e31776',  // Float Accent-Dark-Hover
        },
        gold: '#ffce47', // rating-badge star
        'prime-gold': '#ffb03c', // nowPrime brand gold (wordmark "Prime" + the PRIME tag)
        secondary: '#e3dfec', // Float Base-50 — secondary button bg
        neutral:   '#565656', // Float Button/Disabled

        // Float Status (Dark/Light identical)
        status: {
          success: '#67c3bb', // Status/Success (teal)
          error:   '#f33621', // Status/Error
          alert:   '#de5a48', // Status/Alert
          warning: '#ffc32a', // Status/Warning
          idle:    '#0397eb', // Status/Idle = Button/Link
        },

        // Float .Color Primitives — Base ramp (900 darkest → 50 lightest)
        base: {
          900: '#0b0223', 800: '#1f1637', 700: '#332a4b', 600: '#473e5f',
          500: '#5b5273', 400: '#797091', 300: '#8d84a5', 200: '#a198b9',
          100: '#b5accd', 50: '#e3dfec',
        },
        // Float brand / logo palette + accent gradient endpoints
        logo:  { purple: '#4c4789', blue: '#51a5c9', green: '#398b4d', lime: '#b3d661' },
        brand: { teal: '#67c3bb', yellow: '#ffc32a', sky: '#0397eb', coral: '#f33621', pale: '#eee3d9', youtube: '#ff0000', discord: '#5865f2' },
        gradient: { purple: '#7b4cff', blue: '#0ea4c5' },

        // Dark app-shell surfaces (live now.gg)
        page: {
          bg:      '#0d0c14',
          overlay: 'rgba(11,2,35,0.5)',
        },
        surface: {
          DEFAULT: '#14161f',
          raised:  '#111111',
          dark:    '#121212',
        },
        footer: { bg: '#0a0910' },

        // Text — white at extracted opacities
        text: {
          primary:   '#ffffff',
          secondary: '#ffffffcc', // 80%
          tertiary:  '#ffffffb3', // 70%
          muted:     '#ffffff99', // 60%
          faint:     '#ffffff80', // 50%
          dim:       '#ffffff66', // 40%
        },

        // Hairlines + elevated fills
        line: { DEFAULT: '#ffffff1a', strong: '#ffffff33' },
        fill: { subtle: '#ffffff0d', soft: '#ffffff1a', medium: '#ffffff33', bar: '#66666633' },

        // White/black alpha utilities (Float translucents — full ramp)
        'white-05': '#ffffff0d',
        'white-10': '#ffffff1a',
        'white-20': '#ffffff33',
        'white-30': '#ffffff4d',
        'white-40': '#ffffff66',
        'white-50': '#ffffff80',
        'white-60': '#ffffff99',
        'white-70': '#ffffffb3',
        'white-80': '#ffffffcc',
        'white-90': '#ffffffe5',
        'black-10': '#0000001a',
        'black-20': '#00000033',
        'black-30': '#0000004d',
        'black-40': '#00000066',
        'black-50': '#00000080',
        'black-60': '#00000099',
        'black-70': '#000000b3',
        'black-80': '#000000cc',
        'black-90': '#000000e5',
      },

      // ─── Border radius — Float Radius scale + now.gg semantic names ──
      // NOTE: never use single-letter SIDE keys (s · e · t · r · b · l) here — they
      // collide with Tailwind's built-in rounded-{side} utilities (e.g. rounded-l =
      // left corners, rounded-s = logical-start corners) and render an asymmetric
      // radius. 6px was 's' (clashed with rounded-s) → 'r6'; 10px was 'l' (clashed
      // with rounded-l) → 'r10'. 'm' (8px) is safe — 'm' is not a side keyword.
      borderRadius: {
        'xxs': '2px', 'xs': '4px', 'r6': '6px', 'm': '8px', 'r10': '10px', 'xxl': '16px',
        'sm':     '4px',
        'tile':   '8px',  // game icon tiles
        'cta-sm': '6px',
        'card':   '12px', // cards / big surfaces
        'cta':    '12px', // hero CTA
        'xl':     '12px', // Float Radius/xl (was 24; icons use r12)
        'pill':   '9999px',
      },

      // ─── Border width — the now.gg 0.8px hairline (CTAs, panel border + dividers) ──
      borderWidth: {
        hair: '0.8px',
      },

      // ─── Box shadow — live now.gg + Float effect styles ──
      boxShadow: {
        'card':  '0 4px 16px rgba(0,0,0,0.08)',
        'soft':  '0 2px 10px rgba(0,0,0,0.10)',
        'drop':  '0 4px 4px rgba(0,0,0,0.20)',
        'pill':  '0 8px 16px rgba(0,0,0,0.10)',   // header brand pills (BluestacksCta, NowPrimeCta)
        'plan-card': '0 8px 24px rgba(0,0,0,0.08)', // nowPrime plan cards (white-on-glass lift)
        'glow':  'inset 0 0 20px 0 rgba(255,0,148,1)',
        'glow-hover': '0 0 24px rgba(255,66,165,0.45)',
        // Float effect styles (Shadow/*)
        'fl-sm':     '0 2px 8px rgba(0,0,0,0.16)',
        'fl-md':     '0 4px 16px rgba(0,0,0,0.20)',
        'fl-lg':     '0 8px 24px rgba(0,0,0,0.28)',
        'fl-dark':   '0 4px 8px rgba(0,0,0,0.40)',
        'fl-button': '0 8px 16px rgba(255,66,165,0.35)',
      },

      // ─── Spacing — chrome tokens + Float Spacings scale ──
      // Named steps = the Float scale (handoff reference; rendered in /style-guide →
      // Scales). CLASS CONVENTION in this codebase is Tailwind's numeric scale on the
      // same 4px grid (gap-3 = s/12, mb-6 = xl/24, py-10 = xxxl/40, …).
      // header/rail are structural dims (TopBar height, PlayerRail width — live-measured).
      spacing: {
        'header': '64px',
        'rail':   '70px',
        'xxxs': '2px', 'xxs': '4px', 'xs': '8px', 's': '12px', 'm': '16px',
        'l': '20px', 'xl': '24px', 'xxl': '32px', 'xxxl': '40px',
      },

      // ─── Grid (now.gg CSS vars) ──
      gridTemplateColumns: {
        'tiles':        'repeat(9, minmax(0, 1fr))',
        'tiles-mobile': 'repeat(3, minmax(0, 1fr))',
        'cards':        'repeat(5, minmax(0, 1fr))',
        'cards-mobile': 'repeat(2, minmax(0, 1fr))',
      },

      // ─── Background image tokens ──
      backgroundImage: {
        'glow-corner': 'radial-gradient(circle at 0% 100%, rgba(255,66,165,0.16) 0%, rgba(255,66,165,0) 55%)',
        'glow-page': 'radial-gradient(60% 55% at 0% 100%, rgba(255,66,165,0.16) 0%, rgba(255,66,165,0) 60%), radial-gradient(60% 55% at 100% 100%, rgba(14,164,197,0.13) 0%, rgba(14,164,197,0) 60%)',
        // Float AI gradient (teal → purple): search-bar border + AI glyphs.
        'gradient-ai': 'linear-gradient(to top right, #0ea4c5, #7b4cff)',
        'gradient-ring': 'linear-gradient(135deg, #ff42a5, #a64dff)',
        // play-page bottom-bar gradients (control bar + ad pre-roll)
        'player-bar': 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.9) 50%, rgba(58,14,48,0.7) 100%)',
        'ad-loader': 'linear-gradient(to right, #ff2d6f, #ff42a5)',
        // the now.gg "Widget Bar" (Figma Now-Player 5319:20752): cyan → purple.
        // Shown during BOTH the ad ("will launch after the ad") and game loading.
        'widget-bar': 'linear-gradient(to right, #0fd4ff, #8865eb 29%)',
        'hero-scrim': 'linear-gradient(180deg, rgba(13,12,20,0.2) 0%, rgba(13,12,20,0.75) 70%, rgba(13,12,20,1) 100%)',
        'hero-scrim-x': 'linear-gradient(90deg, rgba(13,12,20,0.85) 0%, rgba(13,12,20,0.4) 55%, rgba(13,12,20,0) 100%)',
        // collection-panel ("Football Fever") surface: a top magenta glow layered over the
        // #111 surface-raised base (single bg-image so one class owns both — avoids the
        // bg-color + bg-image utility clash).
        'collection-glow': 'radial-gradient(120% 70% at 75% -5%, rgba(255,66,165,0.30) 0%, rgba(255,66,165,0.10) 28%, rgba(255,66,165,0) 55%), linear-gradient(#111111, #111111)',
        // nowPrime popup brand gradients (scraped 1:1 from live now.gg)
        'prime-hero': 'linear-gradient(98deg, #352f87 1.05%, #5c54c7 74.44%)',
        'prime-badge': 'linear-gradient(270deg, #7b4cff 0%, #0ea4c5 99.48%)',
      },

      // ─── Letter spacing ──
      letterSpacing: {
        wide:  '0.5px',
        wider: '1.5px',
      },

      // ─── Content container width ──
      maxWidth: {
        content: '1320px', // main content column (home + play sections)
      },
    },
  },
  plugins: [],
}

export default config
