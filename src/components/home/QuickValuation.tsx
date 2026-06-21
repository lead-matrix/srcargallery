import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BRANDS } from '@/types/database'

export default function QuickValuation() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ brand: '', year: '', mileage: '' })
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(form)
    navigate(`/valuation?${params.toString()}`)
  }

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-navy-800 border border-orange-500/20" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-orange-400 text-sm font-semibold tracking-widest uppercase">AI-Powered</div>
                    <h2 className="font-heading text-3xl font-black text-white">Instant Car Valuation</h2>
                  </div>
                </div>
                <p className="text-platinum-300 text-lg leading-relaxed mb-4">
                  Get an accurate market estimate for your car in seconds. Our AI analyzes market data, brand, year, mileage, and condition.
                </p>
                <p className="text-platinum-500 font-bengali">
                  আপনার গাড়ির বাজার মূল্য মুহূর্তের মধ্যে জানুন।
                </p>
              </div>

              {/* Right — quick form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-6 border border-white/10 space-y-4"
              >
                <h3 className="font-heading font-bold text-white text-lg mb-2">Quick Estimate</h3>

                <select
                  value={form.brand}
                  onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                  className="input-dark w-full"
                  required
                >
                  <option value="">Select Brand</option>
                  {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>

                <select
                  value={form.year}
                  onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                  className="input-dark w-full"
                  required
                >
                  <option value="">Select Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>

                <input
                  type="number"
                  placeholder="Mileage (km)"
                  value={form.mileage}
                  onChange={e => setForm(f => ({ ...f, mileage: e.target.value }))}
                  className="input-dark w-full"
                  min="0"
                  required
                />

                <Button type="submit" className="w-full" size="lg">
                  Get Valuation
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <p className="text-center text-platinum-500 text-xs">
                  Free • No commitment • Instant result
                </p>
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
