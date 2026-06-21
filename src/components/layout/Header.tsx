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
      {/* Top bar — luxury gold & navy strip */}
      <div className="text-white text-[11px] font-medium py-2 px-4 flex items-center justify-between"
           style={{ background: 'linear-gradient(90deg, #0A1628 0%, #162B52 50%, #0A1628 100%)', borderBottom: '1px solid rgba(184,148,63,0.3)' }}>
        <span className={lang === 'bn' ? 'font-bengali' : ''} style={{ color: '#EAEAEA' }}>
          {lang === 'bn'
            ? 'ঢাকার বিশ্বস্ত গাড়ির শোরুম | D-19 B, Agargaon Taltola, Dhaka-1207'
            : "Dhaka's Trusted Premium Showroom | D-19 B, Agargaon Taltola, Dhaka-1207"}
        </span>
        <div className="flex items-center gap-4 text-[#CDB97E]">
          <a href="tel:+8801401238019" className="flex items-center gap-1 hover:text-white transition-colors">
            <Phone className="w-3 h-3" />
            <span>+880 1401-238019</span>
          </a>
          <a href="mailto:info@srcargallery.autos" className="hidden sm:inline hover:text-white transition-colors">
            info@srcargallery.autos
          </a>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#B8943F]/20'
            : 'bg-[#FAF8F4]/90 backdrop-blur-sm border-b border-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20 py-2">
            {/* Logo & Brand Name (Always showing name next to logo, even on mobile) */}
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="SR Car Gallery Home">
              <div className="relative flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="SR Car Gallery"
                  width={50}
                  height={50}
                  className="w-11 h-11 sm:w-13 sm:h-13 object-contain group-hover:scale-105 transition-transform duration-300"
                  style={{
                    filter: 'drop-shadow(0 2px 6px rgba(184,148,63,0.3))',
                  }}
                />
              </div>
              {/* Brand Name Text - block means it displays everywhere */}
              <div className="block">
                <div className="font-heading font-black text-[#0A1628] text-sm sm:text-base md:text-lg leading-none tracking-wide whitespace-nowrap">
                  SR Car Gallery
                </div>
                <div className="text-[9px] sm:text-xs font-bold tracking-[0.12em] uppercase mt-0.5 text-[#B8943F]">
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
                      'flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 font-heading tracking-wide',
                      lang === 'bn' ? 'font-bengali' : '',
                      location.pathname === link.href || location.pathname.startsWith(link.href + '/')
                        ? 'text-[#B8943F] bg-[#B8943F]/8'
                        : 'text-[#3D4460] hover:text-[#0A1628] hover:bg-[#0A1628]/5'
                    )}
                  >
                    {link.label}
                    {link.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg overflow-hidden border border-[#B8943F]/20 shadow-lg"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={cn(
                              'block px-4 py-3 text-sm font-medium text-[#3D4460] hover:text-[#0A1628] hover:bg-[#FAF8F4] transition-colors',
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
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-[#B8943F]/40 text-[#9E7A38] hover:bg-[#B8943F]/10 transition-all duration-200"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className={lang === 'bn' ? '' : 'font-bengali'}>
                  {tr.language_toggle}
                </span>
              </button>

              <Link
                to="/cars"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-[#3D4460] hover:text-[#0A1628] hover:bg-[#0A1628]/5 transition-all"
                aria-label="Search cars"
              >
                <Search className="w-4 h-4" />
              </Link>
              <Link
                to="/dashboard/favorites"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-[#3D4460] hover:text-[#0A1628] hover:bg-[#0A1628]/5 transition-all"
                aria-label="Saved cars"
              >
                <Heart className="w-4 h-4" />
              </Link>
              
              <Button
                asChild
                size="sm"
                className="hidden md:flex btn-primary"
              >
                <Link to="/sell" className={lang === 'bn' ? 'font-bengali' : ''}>{tr.nav_sell}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden md:flex border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white"
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
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-[#3D4460] hover:text-[#0A1628] hover:bg-[#0A1628]/5 transition-all"
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
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-[#B8943F]/20 bg-white/98 backdrop-blur-lg overflow-hidden shadow-lg"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      to={link.href}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 font-heading',
                        lang === 'bn' ? 'font-bengali' : '',
                        location.pathname === link.href
                          ? 'text-[#B8943F] bg-[#B8943F]/8'
                          : 'text-[#3D4460] hover:text-[#0A1628] hover:bg-[#0A1628]/5'
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#B8943F]/20 pl-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={cn(
                              'block px-4 py-2 rounded-lg text-sm text-[#3D4460] hover:text-[#0A1628] hover:bg-[#0A1628]/5 transition-colors',
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
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-[#B8943F]/40 text-[#9E7A38] hover:bg-[#B8943F]/10 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    <span className={lang === 'bn' ? '' : 'font-bengali'}>
                      {tr.language_toggle}
                    </span>
                  </button>
                  <Button asChild className="w-full btn-primary">
                    <Link to="/sell" className={lang === 'bn' ? 'font-bengali' : ''}>{tr.nav_sell}</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-[#0A1628] text-[#0A1628]">
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
