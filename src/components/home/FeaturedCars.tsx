import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import CarCard from '@/components/cars/CarCard'
import { MOCK_CARS } from '@/lib/mockData'
import { useState } from 'react'
import { useLanguageStore } from '@/store/languageStore'
import { t } from '@/lib/translations'

export default function FeaturedCars() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { lang } = useLanguageStore()
  const tr = t[lang]
  const bn = lang === 'bn'

  const featured = MOCK_CARS.filter(c => c.featured)
  const justArrived = MOCK_CARS.filter(c => c.just_arrived)

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  return (
    <section className="section-padding bg-navy-900">
      <div className="container-custom">
        {/* Just Arrived */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span className={`text-orange-400 text-sm font-semibold tracking-widest uppercase ${bn ? 'font-bengali' : ''}`}>
                {bn ? 'নতুন আসা গাড়ি' : 'Just Arrived'}
              </span>
            </div>
            <h2 className={`font-heading text-3xl md:text-4xl font-black text-white ${bn ? 'font-bengali' : ''}`}>
              {bn ? (
                <>সদ্য যুক্ত হওয়া <span className="text-gradient">যানবাহনসমূহ</span></>
              ) : (
                <>Freshly Added <span className="text-gradient">Vehicles</span></>
              )}
            </h2>
          </div>
          <Link
            to="/cars?just_arrived=true"
            className={`hidden md:flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-medium ${bn ? 'font-bengali' : ''}`}
          >
            {bn ? 'সব দেখুন' : 'View All'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {justArrived.map((car, i) => (
            <CarCard
              key={car.id}
              car={car}
              index={i}
              onFavorite={toggleFav}
              isFavorited={favorites.has(car.id)}
            />
          ))}
        </div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <span className={`text-orange-400 text-sm font-semibold tracking-widest uppercase ${bn ? 'font-bengali' : ''}`}>
              {tr.featured_title}
            </span>
            <h2 className={`font-heading text-3xl md:text-4xl font-black text-white mt-2 ${bn ? 'font-bengali' : ''}`}>
              {bn ? (
                <>বিশেষভাবে <span className="text-gradient">নির্বাচিত</span></>
              ) : (
                <>Hand-Picked <span className="text-gradient">Selection</span></>
              )}
            </h2>
          </div>
          <Link
            to="/cars"
            className={`hidden md:flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-medium ${bn ? 'font-bengali' : ''}`}
          >
            {tr.featured_view_all}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((car, i) => (
            <CarCard
              key={car.id}
              car={car}
              index={i}
              onFavorite={toggleFav}
              isFavorited={favorites.has(car.id)}
            />
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <Link
            to="/cars"
            className={`btn-primary inline-flex items-center gap-2 ${bn ? 'font-bengali' : ''}`}
          >
            {bn ? 'সব গাড়ি ব্রাউজ করুন' : 'View All Vehicles'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
