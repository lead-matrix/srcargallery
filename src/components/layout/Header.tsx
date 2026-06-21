import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, ChevronDown, Heart, Search, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguageStore } from '@/store/languageStore'
import { t } from '@/lib/translations'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const location = useLocation()
  const { lang, toggle } = useLanguageStore()
  const tr = t[lang]

  const navLinks = [
    { href: '/cars', label: tr.nav_buy },
    { href: '/sell', label: tr.nav_sell },
    {
      href: '/valuation',
      label: tr.nav_valuation,
      children: [
        { href: '/valuation', label: tr.nav_valuation },
        { href: '/book-inspection', label: tr.nav_inspection },
      ],
    },
    { href: '/compare', label: tr.nav_compare },
    { href: '/blog', label: tr.nav_blog },
    { href: '/about', label: tr.nav_about },
  ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location])

  return (
    <>
      {/* Top bar — copper brand strip */}
      <div className="text-white text-xs py-2 px-4 hidden md:flex items-center justify-between"
           style={{ background: 'linear-gradient(90deg, #1a1a1a 0%, #222 50%, #1a1a1a 100%)', borderBottom: '1px solid rgba(232,137,42,0.3)' }}>
        <span className={lang === 'bn' ? 'font-bengali' : ''} style={{ color: '#ABABAB' }}>
          {lang === 'bn'
            ? 'ঢাকার বিশ্বস্ত গাড়ির শোরুম | D-19 B, Agargaon Taltola, Dhaka-1207'
            : "Dhaka's trusted car showroom | D-19 B, Agargaon Taltola, Dhaka-1207"}
        </span>
        <div className="flex items-center gap-4" style={{ color: '#E8892A' }}>
          <a href="tel:+8801401238019" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <Phone className="w-3 h-3" />
            <span>+880 1401-238019</span>
          </a>
          <a href="mailto:info@srcargallery.autos" className="hover:opacity-80 transition-opacity">
            info@srcargallery.autos
          </a>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-500',
          isScrolled
            ? 'bg-navy-900/95 backdrop-blur-lg shadow-glass'
            : 'bg-navy-900/80 backdrop-blur-sm',
        )}
        style={isScrolled ? { borderBottom: '1px solid rgba(232,137,42,0.15)' } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-18 py-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" aria-label="SR Car Gallery Home">
              {/* Logo mark — transparent PNG, no white bg */}
              <div className="relative flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="SR Car Gallery"
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain group-hover:scale-105 transition-transform duration-300"
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(232,137,42,0.4)) drop-shadow(0 0 3px rgba(0,212,255,0.2))',
                  }}
                />
              </div>
              {/* Wordmark — hidden on very small screens */}
              <div className="hidden xs:block sm:block">
                <div className="font-heading font-bold text-white text-base sm:text-lg leading-none tracking-wide whitespace-nowrap">
                  SR Car Gallery
                </div>
                <div className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase mt-0.5" style={{ color: '#E8892A' }}>
                  A Curated Collection
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                      lang === 'bn' ? 'font-bengali' : '',
                      location.pathname === link.href || location.pathname.startsWith(link.href + '/')
                        ? 'text-orange-400 bg-orange-500/10'
                        : 'text-platinum-300 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {link.label}
                    {link.children && <ChevronDown className="w-3 h-3 opacity-60" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-52 glass rounded-xl overflow-hidden border border-white/10 shadow-glass"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={cn(
                              'block px-4 py-3 text-sm text-platinum-300 hover:text-white hover:bg-white/5 transition-colors',
                              lang === 'bn' ? 'font-bengali' : ''
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={toggle}
                id="lang-toggle-btn"
                aria-label="Toggle language"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500 transition-all duration-200"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className={lang === 'bn' ? '' : 'font-bengali'}>
                  {tr.language_toggle}
                </span>
              </button>

              <Link
                to="/cars"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-platinum-400 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Search cars"
              >
                <Search className="w-4 h-4" />
              </Link>
              <Link
                to="/dashboard/favorites"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-platinum-400 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Saved cars"
              >
                <Heart className="w-4 h-4" />
              </Link>
              <Button
                asChild
                size="sm"
                className="hidden md:flex"
              >
                <Link to="/sell" className={lang === 'bn' ? 'font-bengali' : ''}>{tr.nav_sell}</Link>
              </Button>
              <Button
                asChild
                variant="glass"
                size="sm"
                className="hidden md:flex"
              >
                <a
                  href="https://wa.me/8801401238019?text=Hello%20SR%20Car%20Gallery!"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </Button>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-platinum-300 hover:text-white hover:bg-white/5 transition-all"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-white/5 bg-navy-900/98 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      to={link.href}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                        lang === 'bn' ? 'font-bengali' : '',
                        location.pathname === link.href
                          ? 'text-orange-400 bg-orange-500/10'
                          : 'text-platinum-300 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={cn(
                              'block px-4 py-2 rounded-xl text-sm text-platinum-400 hover:text-white hover:bg-white/5 transition-colors',
                              lang === 'bn' ? 'font-bengali' : ''
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-3 flex flex-col gap-2">
                  {/* Language toggle in mobile */}
                  <button
                    onClick={toggle}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    <span className={lang === 'bn' ? '' : 'font-bengali'}>
                      {tr.language_toggle}
                    </span>
                  </button>
                  <Button asChild className="w-full">
                    <Link to="/sell" className={lang === 'bn' ? 'font-bengali' : ''}>{tr.nav_sell}</Link>
                  </Button>
                  <Button asChild variant="glass" className="w-full">
                    <a href="tel:+8801401238019">
                      <Phone className="w-4 h-4" />
                      {lang === 'bn' ? 'এখনই কল করুন' : 'Call Now'}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
