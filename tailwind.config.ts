import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // ── SR Car Gallery Design System ─────────────────────────────
        // Obsidian & Charcoal scale (navy)
        navy: {
          50:  '#EAEAEA',
          100: '#CCCCCC',
          200: '#ACACAC',
          300: '#7C7C7C',
          400: '#4C4C4C',
          500: '#2C2C2C',
          600: '#1C1C1C',
          700: '#121212',
          800: '#0d0d0d',
          900: '#080808',
          950: '#050505',
        },
        // Champagne Gold / Rose Bronze scale (orange)
        orange: {
          50:  '#FFFDFB',
          100: '#FAF3E8',
          200: '#F2DFC2',
          300: '#E5C290',
          400: '#C59F6D',   // Refined Champagne Gold
          500: '#A97E4E',   // Shaded Warm Gold
          600: '#8A5F32',
          700: '#6B431F',
          800: '#4D2B11',
          900: '#2E1505',
        },
        // Polished Chrome / Platinum scale (cyan)
        cyan: {
          50:  '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#F0F0F0',
          400: '#E6E6E6',   // Chrome Highlight
          500: '#CCCCCC',
          600: '#999999',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
        },
        // Silver text
        platinum: {
          50:  '#FFFFFF',
          100: '#F5F5F5',
          200: '#E0E0E0',
          300: '#C8C8C8',
          400: '#ABABAB',
          500: '#8C8C8C',
        },
        // Shadcn tokens
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        emerald: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient':   'linear-gradient(180deg, #050505 0%, #0d0d0d 100%)',
        'copper-gradient': 'linear-gradient(135deg, #C59F6D 0%, #A97E4E 50%, #8A5F32 100%)',
        'card-gradient':   'linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)',
      },
      animation: {
        'accordion-down':  'accordion-down 0.2s ease-out',
        'accordion-up':    'accordion-up 0.2s ease-out',
        'fade-in':         'fade-in 0.6s ease-out',
        'slide-up':        'slide-up 0.6s ease-out',
        'slide-in-right':  'slide-in-right 0.6s ease-out',
        'float':           'float 3s ease-in-out infinite',
        'pulse-glow':      'pulse-glow 2s ease-in-out infinite',
        'counter':         'counter 2s ease-out forwards',
        'shimmer':         'shimmer 2s linear infinite',
        'spin-slow':       'spin 8s linear infinite',
        'cyan-pulse':      'cyan-pulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(197, 159, 109, 0.25)' },
          '50%':      { boxShadow: '0 0 45px rgba(197, 159, 109, 0.45)' },
        },
        'cyan-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(230, 230, 230, 0.2)' },
          '50%':      { boxShadow: '0 0 35px rgba(230, 230, 230, 0.4)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-orange': '0 0 30px rgba(197, 159, 109, 0.3)',
        'glow-copper': '0 0 30px rgba(169, 126, 78, 0.35)',
        'glow-cyan':   '0 0 30px rgba(230, 230, 230, 0.25)',
        'glow-blue':   '0 0 30px rgba(200, 200, 200, 0.25)',
        'card-hover':  '0 20px 60px rgba(0, 0, 0, 0.6)',
        'glass':       '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config
