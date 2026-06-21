import { motion } from 'framer-motion'
import { Search, ShieldCheck, Key, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguageStore } from '@/store/languageStore'
import { t } from '@/lib/translations'

const sellerSteps = [
  {
    step: '01',
    icon: Search,
    title: 'Submit Your Car',
    title_bn: 'গাড়ি সাবমিট করুন',
    desc: 'Fill our simple form with your car details and upload photos. Takes less than 5 minutes.',
    desc_bn: 'আমাদের সহজ ফর্মটিতে আপনার গাড়ির বিবরণ দিন এবং ফটো আপলোড করুন। ৫ মিনিটেরও কম সময় লাগে।',
  },
  {
    step: '02',
    icon: ShieldCheck,
    title: 'Free Inspection',
    title_bn: 'বিনামূল্যে পরিদর্শন',
    desc: 'Our team visits your location or you bring the car to our showroom for a free multi-point inspection.',
    desc_bn: 'আমাদের টিম আপনার ঠিকানায় যাবে অথবা আপনি আমাদের শোরুমে এসে গাড়িটি বিনামূল্যে পরিদর্শন করাতে পারেন।',
  },
  {
    step: '03',
    icon: Key,
    title: 'Get Paid Instantly',
    title_bn: 'তাৎক্ষণিক পেমেন্ট পান',
    desc: 'Accept our fair offer and receive payment on the same day. We handle all paperwork.',
    desc_bn: 'আমাদের ন্যায্য অফারটি গ্রহণ করুন এবং একই দিনে পেমেন্ট বুঝে নিন। কাগজের সমস্ত কাজ আমরাই করব।',
  },
]

const buyerSteps = [
  {
    step: '01',
    icon: Search,
    title: 'Browse & Filter',
    title_bn: 'ব্রাউজ ও ফিল্টার করুন',
    desc: 'Search our verified inventory by brand, model, year, price, and more.',
    desc_bn: 'ব্র্যান্ড, মডেল, বছর, দাম এবং আরও অনেক কিছু দিয়ে আমাদের ভেরিফাইড গাড়ির কালেকশন অনুসন্ধান করুন।',
  },
  {
    step: '02',
    icon: ShieldCheck,
    title: 'Check Inspection Report',
    title_bn: 'পরিদর্শন রিপোর্ট দেখুন',
    desc: 'Every car comes with a detailed inspection report. Download the PDF for full transparency.',
    desc_bn: 'প্রতিটি গাড়ির সাথে একটি বিস্তারিত পরিদর্শন রিপোর্ট থাকে। সম্পূর্ণ স্বচ্ছতার জন্য PDF ডাউনলোড করতে পারেন।',
  },
  {
    step: '03',
    icon: Key,
    title: 'Book & Drive',
    title_bn: 'বুক করুন ও ড্রাইভ করুন',
    desc: 'Book a test drive, finalize the deal, and drive away with confidence.',
    desc_bn: 'টেস্ট ড্রাইভ বুক করুন, ডিল ফাইনাল করুন এবং আস্থার সাথে আপনার স্বপ্নের গাড়ি নিয়ে চলে যান।',
  },
]

export default function HowItWorks() {
  const { lang } = useLanguageStore()
  const tr = t[lang]
  const bn = lang === 'bn'

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
            <h4 className={`font-heading font-bold text-white ${bn ? 'font-bengali' : ''}`}>
              {bn ? step.title_bn : step.title}
            </h4>
          </div>
          <p className={`text-platinum-400 text-sm leading-relaxed ${bn ? 'font-bengali' : ''}`}>
            {bn ? step.desc_bn : step.desc}
          </p>
        </div>
      </motion.div>
    )
  }

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
          <span className={`text-orange-400 text-sm font-semibold tracking-widest uppercase ${bn ? 'font-bengali' : ''}`}>
            {tr.how_title}
          </span>
          <h2 className={`font-heading text-4xl md:text-5xl font-black text-white mt-3 mb-4 ${bn ? 'font-bengali' : ''}`}>
            {bn ? (
              <>সহজ। দ্রুত। <span className="text-gradient">স্বচ্ছ।</span></>
            ) : (
              <>Simple. Fast. <span className="text-gradient">Transparent.</span></>
            )}
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
                <h3 className={`font-heading font-bold text-white text-xl ${bn ? 'font-bengali' : ''}`}>
                  {tr.svc_sell_title}
                </h3>
              </div>
            </div>
            <div className="space-y-6">
              {sellerSteps.map((step, i) => <StepCard key={step.step} step={step} index={i} />)}
            </div>
            <div className="mt-8">
              <Link to="/sell" className={`btn-primary inline-flex items-center gap-2 ${bn ? 'font-bengali' : ''}`}>
                {bn ? 'বিক্রি শুরু করুন' : 'Start Selling'}
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
                <h3 className={`font-heading font-bold text-white text-xl ${bn ? 'font-bengali' : ''}`}>
                  {tr.svc_buy_title}
                </h3>
              </div>
            </div>
            <div className="space-y-6">
              {buyerSteps.map((step, i) => <StepCard key={step.step} step={step} index={i} />)}
            </div>
            <div className="mt-8">
              <Link to="/cars" className={`btn-outline inline-flex items-center gap-2 ${bn ? 'font-bengali' : ''}`}>
                {tr.cta_btn_cars}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
