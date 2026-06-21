import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { MOCK_TESTIMONIALS } from '@/lib/mockData'

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-navy-800/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Customer Stories</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            What Our{' '}
            <span className="text-gradient">Customers Say</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className="text-platinum-300 ml-2 font-semibold">4.9/5</span>
            <span className="text-platinum-500 text-sm">(200+ reviews)</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glass relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-orange-500/20" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-bold text-sm">
                  {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-platinum-500 text-xs">{t.car_bought}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-platinum-300 text-sm leading-relaxed mb-3">{t.review}</p>
              {t.review_bn && (
                <p className="text-platinum-500 text-xs font-bengali leading-relaxed">{t.review_bn}</p>
              )}
              {t.verified && (
                <div className="flex items-center gap-1 mt-3 text-emerald-400 text-xs">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  Verified Customer
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
