import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Car, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import { t } from '@/lib/translations'

export default function ServicesSection() {
  const { lang } = useLanguageStore()
  const tr = t[lang]
  const bn = lang === 'bn'

  const services = [
    {
      icon: Car,
      title: tr.svc_buy_title,
      description: tr.svc_buy_desc,
      href: '/cars',
      cta: tr.svc_cta,
      color: 'from-orange-500/20 to-orange-600/5',
      border: 'border-orange-500/20',
      iconBg: 'bg-orange-500/20 text-orange-400',
      features: bn
        ? ['HD ইমেজ গ্যালারি', '৩৬০° ভিউ', 'ইন্সপেকশন রিপোর্ট', 'ফাইন্যান্সিং ক্যালকুলেটর', 'তুলনা টুল']
        : ['HD Image Gallery', '360° View', 'Inspection Report', 'Financing Calculator', 'Compare Tool'],
    },
    {
      icon: TrendingUp,
      title: tr.svc_sell_title,
      description: tr.svc_sell_desc,
      href: '/sell',
      cta: tr.svc_cta,
      color: 'from-blue-500/20 to-blue-600/5',
      border: 'border-blue-500/20',
      iconBg: 'bg-blue-500/20 text-blue-400',
      features: bn
        ? ['বিনামূল্যে ইন্সপেকশন', 'একই দিনে অফার', 'দ্রুত পেমেন্ট', 'মালিকানা হস্তান্তর', 'কোনো লুকানো চার্জ নেই']
        : ['Free Inspection', 'Same-Day Offer', 'Fast Payment', 'Ownership Transfer', 'No Hidden Charges'],
    },
    {
      icon: ShieldCheck,
      title: tr.svc_inspect_title,
      description: tr.svc_inspect_desc,
      href: '/book-inspection',
      cta: tr.svc_cta,
      color: 'from-emerald-500/20 to-emerald-600/5',
      border: 'border-emerald-500/20',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      features: bn
        ? ['ইঞ্জিন চেক', 'বডি ইন্সপেকশন', 'ইলেকট্রনিক্স টেস্ট', 'ডকুমেন্ট যাচাই', 'PDF রিপোর্ট']
        : ['Engine Check', 'Body Inspection', 'Electronics Test', 'Document Verify', 'PDF Report'],
    },
  ]

  return (
    <section className="section-padding bg-navy-900" id="services">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className={`text-orange-400 text-sm font-semibold tracking-widest uppercase ${bn ? 'font-bengali' : ''}`}>
            {tr.services_title}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            {bn ? (
              <>সবকিছু <span className="text-gradient">এক জায়গায়</span></>
            ) : (
              <>Everything You Need in{' '}<span className="text-gradient">One Place</span></>
            )}
          </h2>
          <p className={`text-platinum-400 text-lg max-w-2xl mx-auto ${bn ? 'font-bengali' : ''}`}>
            {tr.services_subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative rounded-2xl border ${service.border} bg-gradient-to-br ${service.color} p-8 hover:shadow-card-hover transition-all duration-300 group`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className={`font-heading text-2xl font-bold text-white mb-4 ${bn ? 'font-bengali' : ''}`}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className={`text-platinum-300 text-sm leading-relaxed mb-6 ${bn ? 'font-bengali' : ''}`}>
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className={`flex items-center gap-2 text-sm text-platinum-300 ${bn ? 'font-bengali' : ''}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={service.href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors group/link ${bn ? 'font-bengali' : ''}`}
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
