import { motion } from 'framer-motion'
import { Search, ShieldCheck, Key, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const sellerSteps = [
  {
    step: '01',
    icon: Search,
    title: 'Submit Your Car',
    title_bn: 'গাড়ি জমা দিন',
    desc: 'Fill our simple form with your car details and upload photos. Takes less than 5 minutes.',
  },
  {
    step: '02',
    icon: ShieldCheck,
    title: 'Free Inspection',
    title_bn: 'বিনামূল্যে ইন্সপেকশন',
    desc: 'Our team visits your location or you bring the car to our showroom for a free multi-point inspection.',
  },
  {
    step: '03',
    icon: Key,
    title: 'Get Paid Instantly',
    title_bn: 'তাৎক্ষণিক পেমেন্ট',
    desc: 'Accept our fair offer and receive payment on the same day. We handle all paperwork.',
  },
]

const buyerSteps = [
  {
    step: '01',
    icon: Search,
    title: 'Browse & Filter',
    title_bn: 'খুঁজুন ও ফিল্টার করুন',
    desc: 'Search our verified inventory by brand, model, year, price, and more.',
  },
  {
    step: '02',
    icon: ShieldCheck,
    title: 'Check Inspection Report',
    title_bn: 'ইন্সপেকশন রিপোর্ট দেখুন',
    desc: 'Every car comes with a detailed inspection report. Download the PDF for full transparency.',
  },
  {
    step: '03',
    icon: Key,
    title: 'Book & Drive',
    title_bn: 'বুক করুন ও চালান',
    desc: 'Book a test drive, finalize the deal, and drive away with confidence.',
  },
]

const StepCard = ({ step, index }: { step: typeof sellerSteps[0], index: number }) => {
  const Icon = step.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="flex items-start gap-4"
    >
      <div className="flex-shrink-0">
        <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-heading font-black text-lg shadow-glow-orange">
          {step.step}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-4 h-4 text-orange-400" />
          <h4 className="font-heading font-bold text-white">{step.title}</h4>
        </div>
        <p className="text-xs text-platinum-500 font-bengali mb-2">{step.title_bn}</p>
        <p className="text-platinum-400 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section className="section-padding bg-navy-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">How It Works</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            Simple. Fast.{' '}
            <span className="text-gradient">Transparent.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Seller */}
          <div className="glass rounded-3xl p-8 border border-white/8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-xl">Sell Your Car</h3>
                <p className="text-platinum-500 text-sm font-bengali">গাড়ি বিক্রি করুন</p>
              </div>
            </div>
            <div className="space-y-6">
              {sellerSteps.map((step, i) => <StepCard key={step.step} step={step} index={i} />)}
            </div>
            <div className="mt-8">
              <Link to="/sell" className="btn-primary inline-flex items-center gap-2">
                Start Selling
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Buyer */}
          <div className="glass rounded-3xl p-8 border border-white/8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-xl">Buy a Car</h3>
                <p className="text-platinum-500 text-sm font-bengali">গাড়ি কিনুন</p>
              </div>
            </div>
            <div className="space-y-6">
              {buyerSteps.map((step, i) => <StepCard key={step.step} step={step} index={i} />)}
            </div>
            <div className="mt-8">
              <Link to="/cars" className="btn-outline inline-flex items-center gap-2">
                Browse Inventory
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
