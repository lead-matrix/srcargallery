import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wrench, Check, ShieldCheck, HelpCircle, ArrowLeft, ArrowRight,
  TrendingUp, Activity, Smartphone, Calendar, Gauge 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BRANDS } from '@/types/database'
import { useLanguageStore } from '@/store/languageStore'
import { t } from '@/lib/translations'

type Step = 'brand' | 'model_year' | 'mileage' | 'fuel_cond' | 'result'

const baseBrandValues: Record<string, number> = {
  Toyota: 2800000,
  Honda: 2500000,
  Nissan: 2200000,
  Mitsubishi: 2400000,
  Mazda: 2300000,
  BMW: 6500000,
  Mercedes: 7200000,
  Audi: 6000000,
  Lexus: 5500000,
  Hyundai: 1800000,
  Suzuki: 1200000,
  Hybrid: 2500000
}

export default function ValuationPage() {
  const [step, setStep] = useState<Step>('brand')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState(new Date().getFullYear())
  const [mileage, setMileage] = useState('')
  const [fuel, setFuel] = useState('hybrid')
  const [condition, setCondition] = useState('Excellent')
  const [calculatedRange, setCalculatedRange] = useState({ min: 0, max: 0, base: 0 })

  const { lang } = useLanguageStore()
  const tr = t[lang]
  const bn = lang === 'bn'

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i)

  const handleNext = () => {
    if (step === 'brand' && brand) setStep('model_year')
    else if (step === 'model_year' && model && year) setStep('mileage')
    else if (step === 'mileage' && mileage) setStep('fuel_cond')
    else if (step === 'fuel_cond') {
      calculateValuation()
      setStep('result')
    }
  }

  const handleBack = () => {
    if (step === 'model_year') setStep('brand')
    else if (step === 'mileage') setStep('model_year')
    else if (step === 'fuel_cond') setStep('mileage')
    else if (step === 'result') setStep('fuel_cond')
  }

  const calculateValuation = () => {
    const baseValue = baseBrandValues[brand] || 2000000
    
    // Year factor: lose 5% value per year
    const age = currentYear - year
    const yearMultiplier = Math.max(0.4, 1 - age * 0.05)
    
    // Mileage factor: lose value for higher mileage
    const miles = parseFloat(mileage) || 0
    const mileageMultiplier = Math.max(0.6, 1 - (miles / 150000) * 0.2)
    
    // Condition factor
    let condMultiplier = 1.0
    if (condition === 'Good') condMultiplier = 0.92
    if (condition === 'Fair') condMultiplier = 0.82
    if (condition === 'Needs Work') condMultiplier = 0.65

    const estimatedBase = baseValue * yearMultiplier * mileageMultiplier * condMultiplier
    const min = Math.round((estimatedBase * 0.95) / 10000) * 10000
    const max = Math.round((estimatedBase * 1.05) / 10000) * 10000
    
    setCalculatedRange({ min, max, base: Math.round(estimatedBase) })
  }

  const formatPrice = (price: number) => {
    if (bn) {
      return `৳${(price / 100000).toFixed(0)} লাখ`
    }
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0
    }).format(price)
  }

  const progress = () => {
    if (step === 'brand') return 20
    if (step === 'model_year') return 40
    if (step === 'mileage') return 60
    if (step === 'fuel_cond') return 80
    return 100
  }

  return (
    <>
      <Helmet>
        <title>{tr.val_title} | SR Car Gallery</title>
        <meta name="description" content="Use our smart AI algorithm to estimate the fair market price of your used car in Dhaka. Takes less than a minute." />
      </Helmet>

      <div className="pt-24 pb-16 bg-navy-950 text-white min-h-screen flex flex-col justify-center">
        <div className="container-custom max-w-2xl mx-auto w-full">
          
          {/* Progress bar */}
          {step !== 'result' && (
            <div className="mb-8">
              <div className={`flex justify-between items-center text-xs text-platinum-500 mb-2 ${bn ? 'font-bengali' : ''}`}>
                <span>{bn ? 'মূল্যায়ন অগ্রগতি' : 'VALUATION PROGRESS'}</span>
                <span>{progress()}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress()}%` }}
                  className="bg-orange-500 h-full rounded-full"
                />
              </div>
            </div>
          )}

          <div className="glass rounded-3xl border border-white/10 p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-700" />

            <AnimatePresence mode="wait">
              {/* BRAND STEP */}
              {step === 'brand' && (
                <motion.div
                  key="brand"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className={`font-heading text-2xl font-bold mb-2 ${bn ? 'font-bengali' : ''}`}>
                    {bn ? 'আপনার গাড়ির ব্র্যান্ড নির্বাচন করুন' : "Select Your Car's Brand"}
                  </h2>
                  <p className={`text-sm text-platinum-400 mb-8 ${bn ? 'font-bengali' : ''}`}>
                    {bn ? 'আপনার গাড়িটি কোন ব্র্যান্ডের বা প্রস্তুতকারকের?' : 'What is the manufacturer of your car?'}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {BRANDS.map((b) => (
                      <button
                        key={b}
                        onClick={() => {
                          setBrand(b)
                          setStep('model_year')
                        }}
                        className={`p-4 rounded-xl border text-center font-semibold transition-all duration-300 ${
                          brand === b 
                            ? 'border-orange-500 bg-orange-500/10 text-white' 
                            : 'border-white/10 hover:border-white/20 text-platinum-300 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* MODEL & YEAR STEP */}
              {step === 'model_year' && (
                <motion.div
                  key="model_year"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className={`font-heading text-2xl font-bold mb-2 ${bn ? 'font-bengali' : ''}`}>
                      {bn ? 'মডেল ও উৎপাদন বছর' : 'Model & Manufacturing Year'}
                    </h2>
                    <p className={`text-sm text-platinum-400 ${bn ? 'font-bengali' : ''}`}>
                      {bn ? `আপনার ${brand} গাড়ির বিবরণ দিন` : `Specify details about your ${brand}`}
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'মডেলের নাম' : 'Model Name'}</label>
                    <input
                      type="text"
                      value={model}
                      onChange={e => setModel(e.target.value)}
                      placeholder="e.g. Premio, Vezel, Axio"
                      className={`input-dark w-full text-lg ${bn ? 'font-bengali' : ''}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'ম্যানুফ্যাকচারিং বছর' : 'Manufacturing Year'}</label>
                    <select
                      value={year}
                      onChange={e => setYear(parseInt(e.target.value))}
                      className={`input-dark w-full text-lg ${bn ? 'font-bengali' : ''}`}
                    >
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/5">
                    <Button onClick={handleBack} variant="outline" className={`flex-1 ${bn ? 'font-bengali' : ''}`}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> {bn ? 'পেছনে' : 'Back'}
                    </Button>
                    <Button onClick={handleNext} disabled={!model} className={`flex-1 ${bn ? 'font-bengali' : ''}`}>
                      {bn ? 'পরবর্তী' : 'Next'} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* MILEAGE STEP */}
              {step === 'mileage' && (
                <motion.div
                  key="mileage"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className={`font-heading text-2xl font-bold mb-2 ${bn ? 'font-bengali' : ''}`}>
                      {bn ? 'গাড়িটি কত কিলোমিটার চলেছে?' : 'How much has it been driven?'}
                    </h2>
                    <p className={`text-sm text-platinum-400 ${bn ? 'font-bengali' : ''}`}>
                      {bn ? 'মোট মাইলেজটি কিলোমিটারে লিখুন' : 'Provide the total mileage in kilometers'}
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'মাইলেজ (কিমি)' : 'Mileage (km)'}</label>
                    <input
                      type="number"
                      value={mileage}
                      onChange={e => setMileage(e.target.value)}
                      placeholder="e.g. 45000"
                      className={`input-dark w-full text-lg ${bn ? 'font-bengali' : ''}`}
                      min="0"
                    />
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/5">
                    <Button onClick={handleBack} variant="outline" className={`flex-1 ${bn ? 'font-bengali' : ''}`}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> {bn ? 'পেছনে' : 'Back'}
                    </Button>
                    <Button onClick={handleNext} disabled={!mileage} className={`flex-1 ${bn ? 'font-bengali' : ''}`}>
                      {bn ? 'পরবর্তী' : 'Next'} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* FUEL & CONDITION STEP */}
              {step === 'fuel_cond' && (
                <motion.div
                  key="fuel_cond"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className={`font-heading text-2xl font-bold mb-2 ${bn ? 'font-bengali' : ''}`}>
                      {bn ? 'জ্বালানি ধরণ ও সাধারণ অবস্থা' : 'Fuel Type & Condition'}
                    </h2>
                    <p className={`text-sm text-platinum-400 ${bn ? 'font-bengali' : ''}`}>
                      {bn ? 'মূল্যায়নের জন্য চূড়ান্ত বিবরণ দিন' : 'Final details for AI valuation'}
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'জ্বালানির ধরণ' : 'Fuel Type'}</label>
                    <select
                      value={fuel}
                      onChange={e => setFuel(e.target.value)}
                      className={`input-dark w-full text-lg ${bn ? 'font-bengali' : ''}`}
                    >
                      <option value="hybrid">{bn ? 'হাইব্রিড' : 'Hybrid'}</option>
                      <option value="petrol">{bn ? 'অকটেন / পেট্রোল' : 'Octane / Petrol'}</option>
                      <option value="diesel">{bn ? 'ডিজেল' : 'Diesel'}</option>
                      <option value="cng">{bn ? 'সিএনজি / এলপিজি' : 'CNG / LPG'}</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'সাধারণ অবস্থা' : 'General Condition'}</label>
                    <select
                      value={condition}
                      onChange={e => setCondition(e.target.value)}
                      className={`input-dark w-full text-lg ${bn ? 'font-bengali' : ''}`}
                    >
                      <option value="Excellent">{bn ? 'চমৎকার (মেরামতের প্রয়োজন নেই)' : 'Excellent (No repair needed)'}</option>
                      <option value="Good">{bn ? 'ভালো (হালকা বাহ্যিক কাজ আছে)' : 'Good (Minor cosmetic work)'}</option>
                      <option value="Fair">{bn ? 'মোটামুটি (মেরামত প্রয়োজন)' : 'Fair (Needs styling/repair)'}</option>
                      <option value="Needs Work">{bn ? 'মেরামত প্রয়োজন (যান্ত্রিক সমস্যা আছে)' : 'Needs Mechanical Work'}</option>
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/5">
                    <Button onClick={handleBack} variant="outline" className={`flex-1 ${bn ? 'font-bengali' : ''}`}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> {bn ? 'পেছনে' : 'Back'}
                    </Button>
                    <Button onClick={handleNext} className={`flex-1 ${bn ? 'font-bengali' : ''}`}>
                      {bn ? 'মূল্য নির্ধারণ করুন' : 'Estimate Price'} <TrendingUp className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* RESULT STEP */}
              {step === 'result' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8"
                >
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <span className={`text-orange-400 text-xs font-bold tracking-widest uppercase ${bn ? 'font-bengali' : ''}`}>
                      {bn ? 'আনুমানিক ন্যায্য মূল্য সীমা' : 'Estimated Fair Value Range'}
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-black text-white mt-2">
                      {formatPrice(calculatedRange.min)} - {formatPrice(calculatedRange.max)}
                    </h2>
                    <p className={`text-sm text-platinum-400 mt-2 ${bn ? 'font-bengali' : ''}`}>
                      {bn ? (
                        <>একটি {year} সালের {brand} {model} ({mileage} কিমি চালানো) এর জন্য</>
                      ) : (
                        <>For a {year} {brand} {model} ({mileage} km)</>
                      )}
                    </p>
                  </div>

                  {/* Pricing metrics breakdown */}
                  <div className="glass rounded-2xl border border-white/5 p-6 text-left space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className={`text-platinum-400 ${bn ? 'font-bengali' : ''}`}>{bn ? 'ভিত্তি ব্র্যান্ড মূল্য' : 'Base Brand Value'}</span>
                      <span className="text-white font-bold">{formatPrice(baseBrandValues[brand] || 2000000)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className={`text-platinum-400 ${bn ? 'font-bengali' : ''}`}>
                        {bn ? `বয়সভিত্তিক অবমূল্যায়ন (${currentYear - year} বছর)` : `Age Depreciation (${currentYear - year} years)`}
                      </span>
                      <span className="text-red-400">-{Math.round((1 - (calculatedRange.base / (baseBrandValues[brand] || 2000000))) * 100)}%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className={`text-platinum-400 ${bn ? 'font-bengali' : ''}`}>{bn ? 'গাড়ির অবস্থা মান' : 'Condition Rating'}</span>
                      <span className={`text-emerald-400 font-semibold ${bn ? 'font-bengali' : ''}`}>
                        {bn ? (
                          condition === 'Excellent' ? 'চমৎকার' :
                          condition === 'Good' ? 'ভালো' :
                          condition === 'Fair' ? 'মোটামুটি' : 'মেরামতযোগ্য'
                        ) : condition}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => setStep('brand')} variant="outline" className={`flex-1 ${bn ? 'font-bengali' : ''}`}>
                      {bn ? 'নতুন মূল্যায়ন' : 'New Valuation'}
                    </Button>
                    <a 
                      href={`/sell?brand=${brand}&model=${model}&year=${year}&mileage=${mileage}`} 
                      className={`btn-primary flex-1 inline-flex items-center justify-center ${bn ? 'font-bengali' : ''}`}
                    >
                      {bn ? 'গাড়িটি এখনই বিক্রি করুন' : 'Sell This Car Now'}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}
