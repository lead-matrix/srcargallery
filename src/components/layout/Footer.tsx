import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Car } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import { t } from '@/lib/translations'

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const popularBrands = [
  'Toyota', 'Honda', 'Nissan', 'Mitsubishi', 'Mazda', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus',
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { lang } = useLanguageStore()
  const tr = t[lang]
  const bn = lang === 'bn'

  const quickLinks = [
    { href: '/cars', label: tr.nav_buy },
    { href: '/sell', label: tr.nav_sell },
    { href: '/valuation', label: tr.nav_valuation },
    { href: '/book-inspection', label: tr.nav_inspection },
    { href: '/compare', label: tr.nav_compare },
    { href: '/blog', label: tr.nav_blog },
  ]

  const popularSearches = [
    { label: bn ? 'টয়োটা প্রিমিও ব্যবহৃত' : 'Used Toyota Premio', href: '/cars?brand=Toyota&model=Premio' },
    { label: bn ? 'টয়োটা অ্যাক্সিও ব্যবহৃত' : 'Used Toyota Axio', href: '/cars?brand=Toyota&model=Axio' },
    { label: bn ? 'হোন্ডা ভেজেল ব্যবহৃত' : 'Used Honda Vezel', href: '/cars?brand=Honda&model=Vezel' },
    { label: bn ? 'হাইব্রিড গাড়ি ঢাকা' : 'Hybrid Cars Dhaka', href: '/cars?fuel_type=hybrid' },
    { label: bn ? '৫০ লাখের নিচে এসইউভি' : 'SUV Under 50 Lac', href: '/cars?body_type=suv&price_max=5000000' },
    { label: bn ? 'আমার গাড়ি বিক্রি করুন' : 'Sell My Car Dhaka', href: '/sell' },
  ]

  return (
    <footer className="bg-navy-950 border-t border-white/5">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className={`font-heading text-2xl font-bold text-white ${bn ? 'font-bengali' : ''}`}>
              {tr.cta_title}
            </h3>
            <p className={`text-orange-100 mt-1 ${bn ? 'font-bengali' : ''}`}>
              {tr.cta_subtitle}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/cars"
              className={`bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors flex items-center gap-2 ${bn ? 'font-bengali' : ''}`}
            >
              <Car className="w-4 h-4" />
              {tr.cta_btn_cars}
            </Link>
            <Link
              to="/sell"
              className={`border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 ${bn ? 'font-bengali' : ''}`}
            >
              {tr.cta_btn_sell}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center font-heading font-black text-white text-xl shadow-glow-orange">
                SR
              </div>
              <div>
                <div className="font-heading font-bold text-white text-lg">SR Car Gallery</div>
                <div className="text-orange-400 text-xs">A Curated Collection</div>
              </div>
            </Link>
            <p className={`text-platinum-400 text-sm leading-relaxed mb-6 ${bn ? 'font-bengali' : ''}`}>
              {tr.footer_tagline}
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: FacebookIcon, href: '#', label: 'Facebook' },
                { icon: YoutubeIcon, href: '#', label: 'YouTube' },
                { icon: InstagramIcon, href: '#', label: 'Instagram' },
                { icon: MessageCircle, href: 'https://wa.me/8801401238019', label: 'WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-navy-800 border border-white/8 flex items-center justify-center text-platinum-400 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className={`font-heading font-semibold text-white mb-6 ${bn ? 'font-bengali' : ''}`}>
              {tr.footer_quick_links}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`text-platinum-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2 group ${bn ? 'font-bengali' : ''}`}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Searches */}
          <div>
            <h4 className={`font-heading font-semibold text-white mb-6 ${bn ? 'font-bengali' : ''}`}>
              {bn ? 'জনপ্রিয় অনুসন্ধান' : 'Popular Searches'}
            </h4>
            <ul className="space-y-3">
              {popularSearches.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`text-platinum-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2 group ${bn ? 'font-bengali' : ''}`}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`font-heading font-semibold text-white mb-6 ${bn ? 'font-bengali' : ''}`}>
              {tr.footer_contact_us}
            </h4>
            <div className="space-y-4">
              <a
                href="https://maps.google.com/?q=Agargaon+Taltola+Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-platinum-400 hover:text-orange-400 transition-colors group"
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-orange-400" />
                <span>D-19 B, Agargaon Taltola, Sher-E-Bangla Nagar, Dhaka-1207</span>
              </a>
              <a
                href="tel:+8801401238019"
                className="flex items-center gap-3 text-sm text-platinum-400 hover:text-orange-400 transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +880 1401-238019
              </a>
              <a
                href="mailto:info@srcargallery.autos"
                className="flex items-center gap-3 text-sm text-platinum-400 hover:text-orange-400 transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                info@srcargallery.autos
              </a>
            </div>

            <div className="mt-6">
              <h5 className={`text-white text-sm font-semibold mb-3 ${bn ? 'font-bengali' : ''}`}>
                {tr.footer_hours}
              </h5>
              <div className={`space-y-1.5 text-sm text-platinum-400 ${bn ? 'font-bengali' : ''}`}>
                <div className="flex justify-between">
                  <span>{bn ? 'শনি – বৃহস্পতি' : 'Saturday – Thursday'}</span>
                  <span className="text-emerald-400">10am – 8pm</span>
                </div>
                <div className="flex justify-between">
                  <span>{bn ? 'শুক্রবার' : 'Friday'}</span>
                  <span className="text-orange-400">2pm – 8pm</span>
                </div>
              </div>
            </div>

            {/* Brands we buy */}
            <div className="mt-6">
              <h5 className={`text-white text-sm font-semibold mb-3 ${bn ? 'font-bengali' : ''}`}>
                {bn ? 'আমরা যে ব্র্যান্ড কিনি' : 'Brands We Buy'}
              </h5>
              <div className="flex flex-wrap gap-2">
                {popularBrands.slice(0, 6).map((brand) => (
                  <Link
                    key={brand}
                    to={`/cars?brand=${brand}`}
                    className="text-xs text-platinum-500 hover:text-orange-400 bg-navy-800 border border-white/8 px-2.5 py-1 rounded-lg hover:border-orange-500/30 transition-all"
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-platinum-500">
          <p className={bn ? 'font-bengali' : ''}>
            © {currentYear} SR Car Gallery. {tr.footer_rights} | {bn ? 'বাংলাদেশে ব্যবহৃত গাড়ি বিক্রয়' : 'Used Cars for Sale in Bangladesh'}
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className={`hover:text-platinum-300 transition-colors ${bn ? 'font-bengali' : ''}`}>
              {tr.footer_privacy}
            </Link>
            <Link to="/terms" className={`hover:text-platinum-300 transition-colors ${bn ? 'font-bengali' : ''}`}>
              {tr.footer_terms}
            </Link>
            <Link to="/admin" className="hover:text-platinum-300 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
