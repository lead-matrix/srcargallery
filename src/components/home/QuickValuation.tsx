import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BRANDS } from '@/types/database'
import { useLanguageStore } from '@/store/languageStore'
import { t } from '@/lib/translations'

export default function QuickValuation() {
  const navigate = useNavigate()
  const { lang } = useLanguageStore()
  const tr = t[lang]
  const bn = lang === 'bn'

  const [form, setForm] = useState({ brand: '', year: '', mileage: '' })
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(form)
    navigate(`/valuation?${params.toString()}`)
  }

  return (
    <section className="section-padding bg-[#FAF8F4]">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#B8943F]/20">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FAF8F4] to-[#FAF3E8]" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#B8943F]/5 rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0A1628] flex items-center justify-center text-white shadow-md">
                    <Zap className="w-6 h-6 text-[#B8943F]" />
                  </div>
                  <div>
                    <div className={`text-[#B8943F] text-xs font-bold tracking-widest uppercase ${bn ? 'font-bengali' : ''}`}>
                      {bn ? 'এআই চালিত' : 'AI-Powered'}
                    </div>
                    <h2 className={`font-heading text-3xl md:text-4xl font-black text-[#0A1628] ${bn ? 'font-bengali' : ''}`}>
                      {bn ? 'তাৎক্ষণিক গাড়ি মূল্যায়ন' : 'Instant Car Valuation'}
                    </h2>
                  </div>
                </div>
                <p className={`text-[#3D4460] text-lg leading-relaxed ${bn ? 'font-bengali' : ''}`}>
                  {bn ? 'সেকেন্ডের মধ্যে আপনার গাড়ির সঠিক বাজার মূল্যায়ন পান। আমাদের এআই বাজার বিশ্লেষণ করে দাম নির্ধারণ করে।' : 'Get an accurate market estimate for your car in seconds. Our AI analyzes market data, brand, year, mileage, and condition.'}
                </p>
              </div>

              {/* Right — quick form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="bg-white/95 rounded-2xl p-8 border border-[#B8943F]/20 space-y-4 shadow-lg"
              >
                <h3 className={`font-heading font-extrabold text-[#0A1628] text-xl mb-2 ${bn ? 'font-bengali' : ''}`}>
                  {bn ? 'দ্রুত মূল্য যাচাই' : 'Quick Estimate'}
                </h3>

                <select
                  value={form.brand}
                  onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                  className={`input-dark w-full text-[#0A1628] bg-white border border-[#B8943F]/20 ${bn ? 'font-bengali' : ''}`}
                  required
                >
                  <option value="">{bn ? 'ব্র্যান্ড নির্বাচন করুন' : 'Select Brand'}</option>
                  {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>

                <select
                  value={form.year}
                  onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                  className={`input-dark w-full text-[#0A1628] bg-white border border-[#B8943F]/20 ${bn ? 'font-bengali' : ''}`}
                  required
                >
                  <option value="">{bn ? 'বছর নির্বাচন করুন' : 'Select Year'}</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>

                <input
                  type="number"
                  placeholder={bn ? 'মাইলেজ (কিমি)' : 'Mileage (km)'}
                  value={form.mileage}
                  onChange={e => setForm(f => ({ ...f, mileage: e.target.value }))}
                  className={`input-dark w-full text-[#0A1628] bg-white border border-[#B8943F]/20 ${bn ? 'font-bengali' : ''}`}
                  min="0"
                  required
                />

                <Button type="submit" className="w-full btn-primary" size="lg">
                  <span className={bn ? 'font-bengali' : ''}>
                    {tr.svc_value_title}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <p className={`text-center text-[#8C8C8C] text-xs font-semibold ${bn ? 'font-bengali' : ''}`}>
                  {bn ? 'ফ্রি • কোনো অঙ্গীকার নেই • তাৎক্ষণিক ফলাফল' : 'Free • No commitment • Instant result'}
                </p>
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
