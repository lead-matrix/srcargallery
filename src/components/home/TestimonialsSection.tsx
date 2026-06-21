import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { MOCK_TESTIMONIALS } from '@/lib/mockData'
import { useLanguageStore } from '@/store/languageStore'
import { t } from '@/lib/translations'

export default function TestimonialsSection() {
  const { lang } = useLanguageStore()
  const tr = t[lang]
  const bn = lang === 'bn'

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className={`text-[#B8943F] text-xs font-bold tracking-widest uppercase ${bn ? 'font-bengali' : ''} flex items-center justify-center gap-2`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8943F]" />
            {bn ? 'গ্রাহকদের মতামত' : 'Customer Stories'}
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8943F]" />
          </span>
          <h2 className={`font-heading text-4xl md:text-5xl font-black text-[#0A1628] mt-3 mb-4 ${bn ? 'font-bengali' : ''}`}>
            {bn ? (
              <>আমাদের <span className="text-gradient">গ্রাহকরা যা বলেন</span></>
            ) : (
              <>What Our <span className="text-gradient">Customers Say</span></>
            )}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className="text-[#3D4460] ml-2 font-semibold text-lg">4.9/5</span>
            <span className={`text-[#8C8C8C] text-sm font-medium ${bn ? 'font-bengali' : ''}`}>
              {bn ? '(২০০+ রিভিউ)' : '(200+ reviews)'}
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glass relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#B8943F]/20" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0A1628] to-[#162B52] flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="text-[#0A1628] font-bold text-sm">{testimonial.name}</div>
                  <div className={`text-[#6B7280] text-xs font-semibold ${bn ? 'font-bengali' : ''}`}>
                    {bn && testimonial.car_bought_bn ? testimonial.car_bought_bn : testimonial.car_bought}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className={`text-[#3D4460] text-sm leading-relaxed mb-3 ${bn ? 'font-bengali' : ''}`}>
                {bn && testimonial.review_bn ? testimonial.review_bn : testimonial.review}
              </p>
              {testimonial.verified && (
                <div className={`flex items-center gap-1.5 mt-3 text-emerald-600 text-xs font-bold ${bn ? 'font-bengali' : ''}`}>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  {bn ? 'যাচাইকৃত গ্রাহক' : 'Verified Customer'}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
