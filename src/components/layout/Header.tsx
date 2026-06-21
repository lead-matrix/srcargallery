import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, ChevronDown, Heart, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/cars', label: 'Buy a Car', label_bn: 'গাড়ি কিনুন' },
  { href: '/sell', label: 'Sell Your Car', label_bn: 'গাড়ি বেচুন' },
  {
    href: '/valuation',
    label: 'Valuation',
    label_bn: 'মূল্যায়ন',
    children: [
      { href: '/valuation', label: 'Car Valuation', label_bn: 'গাড়ির মূল্যায়ন' },
      { href: '/book-inspection', label: 'Book Inspection', label_bn: 'ইন্সপেকশন বুক' },
    ],
  },
  { href: '/compare', label: 'Compare', label_bn: 'তুলনা' },
  { href: '/blog', label: 'Blog', label_bn: 'ব্লগ' },
  { href: '/about', label: 'About Us', label_bn: 'আমাদের সম্পর্কে' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const location = useLocation()

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
      {/* Top bar */}
      <div className="bg-orange-500 text-white text-xs py-2 px-4 hidden md:flex items-center justify-between">
        <span className="font-bengali">ঢাকার বিশ্বস্ত গাড়ির শোরুম | D-19 B, Agargaon Taltola, Dhaka-1207</span>
        <div className="flex items-center gap-4">
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
            ? 'bg-navy-900/95 backdrop-blur-lg border-b border-white/5 shadow-glass'
            : 'bg-navy-900/80 backdrop-blur-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center font-heading font-black text-white text-lg shadow-glow-orange group-hover:scale-105 transition-transform duration-300">
                  SR
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-navy-900"></div>
              </div>
              <div>
                <div className="font-heading font-bold text-white text-lg leading-none">SR Car Gallery</div>
                <div className="text-orange-400 text-xs font-medium">A Curated Collection</div>
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
                            className="block px-4 py-3 text-sm text-platinum-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                            <div className="text-xs text-platinum-500 font-bengali">{child.label_bn}</div>
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
                <Link to="/sell">Sell Your Car</Link>
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
                        location.pathname === link.href
                          ? 'text-orange-400 bg-orange-500/10'
                          : 'text-platinum-300 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <div>
                        <div>{link.label}</div>
                        <div className="text-xs text-platinum-500 font-bengali">{link.label_bn}</div>
                      </div>
                    </Link>
                    {link.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block px-4 py-2 rounded-xl text-sm text-platinum-400 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-3 flex flex-col gap-2">
                  <Button asChild className="w-full">
                    <Link to="/sell">Sell Your Car</Link>
                  </Button>
                  <Button asChild variant="glass" className="w-full">
                    <a href="tel:+8801401238019">
                      <Phone className="w-4 h-4" />
                      Call Now
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
