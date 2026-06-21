import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Car, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Car,
    title: 'Buy a Car',
    title_bn: 'গাড়ি কিনুন',
    description: 'Browse verified vehicles with complete details, HD photos, inspection reports, financing options, and transparent pricing.',
    description_bn: 'সম্পূর্ণ বিবরণ, HD ছবি, ইন্সপেকশন রিপোর্ট এবং স্বচ্ছ মূল্য সহ যাচাইকৃত গাড়ি ব্রাউজ করুন।',
    href: '/cars',
    cta: 'Browse Inventory',
    color: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/20',
    iconBg: 'bg-orange-500/20 text-orange-400',
    features: ['HD Image Gallery', '360° View', 'Inspection Report', 'Financing Calculator', 'Compare Tool'],
  },
  {
    icon: TrendingUp,
    title: 'Sell Your Car',
    title_bn: 'গাড়ি বেচুন',
    description: 'Get a fair valuation within minutes. We buy Toyota, Honda, Nissan, Mitsubishi, BMW, Mercedes, Audi, Lexus, Hybrids, SUVs, Sedans, Microbuses.',
    description_bn: 'মিনিটের মধ্যে ন্যায্য মূল্যায়ন পান। আমরা কিনি Toyota, Honda, Nissan, Mitsubishi এবং আরও অনেক ব্র্যান্ড।',
    href: '/sell',
    cta: 'Get Valuation',
    color: 'from-blue-500/20 to-blue-600/5',
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/20 text-blue-400',
    features: ['Free Inspection', 'Same-Day Offer', 'Fast Payment', 'Ownership Transfer', 'No Hidden Charges'],
  },
  {
    icon: ShieldCheck,
    title: 'Vehicle Inspection',
    title_bn: 'গাড়ি ইন্সপেকশন',
    description: 'Professional multi-point inspection before every purchase. Our certified inspectors check engine, body, electronics, and more.',
    description_bn: 'প্রতিটি ক্রয়ের আগে পেশাদার মাল্টি-পয়েন্ট ইন্সপেকশন। ইঞ্জিন, বডি, ইলেকট্রনিক্স এবং আরও অনেক কিছু চেক করা হয়।',
    href: '/book-inspection',
    cta: 'Book Inspection',
    color: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
    features: ['Engine Check', 'Body Inspection', 'Electronics Test', 'Document Verify', 'PDF Report'],
  },
]

export default function ServicesSection() {
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
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Our Services</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            Everything You Need in{' '}
            <span className="text-gradient">One Place</span>
          </h2>
          <p className="text-platinum-400 text-lg max-w-2xl mx-auto">
            Whether you're buying or selling, we handle every step with transparency and professionalism.
          </p>
          <p className="text-platinum-500 text-base font-bengali mt-2">
            কেনা হোক বা বেচা হোক — আমরা প্রতিটি পদক্ষেপ স্বচ্ছতার সাথে পরিচালনা করি।
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
                <h3 className="font-heading text-2xl font-bold text-white mb-1">{service.title}</h3>
                <p className="text-platinum-500 text-sm font-bengali mb-4">{service.title_bn}</p>

                {/* Description */}
                <p className="text-platinum-300 text-sm leading-relaxed mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-platinum-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors group/link"
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
