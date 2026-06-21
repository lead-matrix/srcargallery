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
        // Gunmetal / Charcoal (replaces navy)
        navy: {
          50:  '#E8E8E8',
          100: '#C5C5C5',
          200: '#A0A0A0',
          300: '#7A7A7A',
          400: '#555555',
          500: '#333333',
          600: '#222222',
          700: '#1a1a1a',
          800: '#111111',
          900: '#0d0d0d',
          950: '#050505',
        },
        // Copper / Bronze (primary accent — replaces orange)
        orange: {
          50:  '#FDF3E7',
          100: '#FAE3C2',
          200: '#F5C882',
          300: '#EDAB4A',
          400: '#E8892A',   // primary copper
          500: '#C4762A',   // deeper copper
          600: '#A05C1A',   // dark copper
          700: '#7D4412',
          800: '#5C300C',
          900: '#3B1E07',
        },
        // Cyan / Electric Teal (secondary accent)
        cyan: {
          50:  '#E0FAFF',
          100: '#B8F4FF',
          200: '#7EEEFF',
          300: '#3DE6FF',
          400: '#00D4FF',   // primary cyan
          500: '#00AACF',
          600: '#0088A3',
          700: '#006478',
          800: '#00414E',
          900: '#002028',
        },
        // Silver / Platinum text
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
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient':   'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
        'copper-gradient': 'linear-gradient(135deg, #E8892A 0%, #C4762A 50%, #B87333 100%)',
        'card-gradient':   'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 137, 42, 0.35)' },
          '50%':      { boxShadow: '0 0 45px rgba(232, 137, 42, 0.65)' },
        },
        'cyan-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)' },
          '50%':      { boxShadow: '0 0 35px rgba(0, 212, 255, 0.6)' },
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
        'glow-orange': '0 0 30px rgba(232, 137, 42, 0.35)',
        'glow-copper': '0 0 30px rgba(196, 118, 42, 0.4)',
        'glow-cyan':   '0 0 30px rgba(0, 212, 255, 0.3)',
        'glow-blue':   '0 0 30px rgba(0, 170, 207, 0.3)',
        'card-hover':  '0 20px 60px rgba(0, 0, 0, 0.5)',
        'glass':       '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config
