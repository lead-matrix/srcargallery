import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Upload, ShieldCheck, HeartHandshake, BadgePercent, 
  CircleDollarSign, FileText, CheckCircle2, ChevronRight 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BRANDS } from '@/types/database'
import { useLanguageStore } from '@/store/languageStore'
import { t } from '@/lib/translations'

const sellSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  phone: z.string().regex(/^\+?(88)?01[3-9]\d{8}$/, 'Enter a valid Bangladeshi phone number'),
  email: z.string().email('Enter a valid email address'),
  brand: z.string().min(1, 'Select brand'),
  model: z.string().min(1, 'Enter model name'),
  year: z.number().min(2000).max(new Date().getFullYear()),
  mileage: z.number().min(0, 'Mileage cannot be negative'),
  price: z.number().min(100000, 'Price must be at least BDT 1,00,000'),
  condition: z.string().min(1, 'Select condition'),
  transmission: z.string().min(1, 'Select transmission'),
  fuel_type: z.string().min(1, 'Select fuel type')
})

type SellFormValues = z.infer<typeof sellSchema>

export default function SellPage() {
  const [images, setImages] = useState<File[]>([])
  const [regCard, setRegCard] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { lang } = useLanguageStore()
  const tr = t[lang]
  const bn = lang === 'bn'

  const { register, handleSubmit, formState: { errors } } = useForm<SellFormValues>({
    resolver: zodResolver(sellSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      condition: 'Excellent',
      transmission: 'automatic',
      fuel_type: 'hybrid'
    }
  })

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 26 }, (_, i) => currentYear - i)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(prev => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleRegCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRegCard(e.target.files[0])
    }
  }

  const onSubmit = async (data: SellFormValues) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      console.log('Submitted data:', data, images, regCard)
    }, 1500)
  }

  return (
    <>
      <Helmet>
        <title>{tr.sell_title} | SR Car Gallery Dhaka</title>
        <meta name="description" content="Sell your used car in Dhaka for the best price. Get a free inspection, same-day valuation, instant cash, and hassle-free paper transfer." />
      </Helmet>

      <div className="pt-24 pb-16 bg-navy-950 text-white min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-orange-400 text-sm font-semibold tracking-widest uppercase ${bn ? 'font-bengali' : ''}`}
            >
              {bn ? 'কোনো ঝামেলা নেই • একই দিনে অফার' : 'Zero Hassle • Same Day Offer'}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`font-heading text-4xl md:text-6xl font-black mt-3 mb-6 ${bn ? 'font-bengali' : ''}`}
            >
              {bn ? (
                <>আপনার গাড়ি বিক্রি করুন <span className="text-gradient">সেরা বাজারে দামে</span></>
              ) : (
                <>Sell Your Car in Dhaka for <span className="text-gradient">Best Market Price</span></>
              )}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-platinum-400 text-lg leading-relaxed ${bn ? 'font-bengali' : ''}`}
            >
              {tr.sell_subtitle}
            </motion.p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: ShieldCheck, title: bn ? 'বিনামূল্যে পরিদর্শন' : 'Free Inspection', desc: bn ? 'আপনার বাসায় বা আমাদের শোরুমে' : 'At your home or our showroom' },
              { icon: CircleDollarSign, title: bn ? 'সেরা মূল্য' : 'Top Price', desc: bn ? 'বাজারের তথ্যভিত্তিক সর্বোচ্চ দর' : 'Best market rates based on data' },
              { icon: HeartHandshake, title: bn ? 'তাৎক্ষণিক পেমেন্ট' : 'Instant Payment', desc: bn ? 'একই দিনে ব্যাংক ট্রান্সফার বা ক্যাশ' : 'Same-day bank transfer or cash' },
              { icon: FileText, title: bn ? 'কাগজপত্র হস্তান্তর' : 'Paperwork Done', desc: bn ? 'মালিকানা পরিবর্তন ফ্রীতে করে দেই' : 'We handle ownership transfer free' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="glass p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className={`font-heading font-bold text-white mb-2 ${bn ? 'font-bengali' : ''}`}>{item.title}</h3>
                <p className={`text-sm text-platinum-400 ${bn ? 'font-bengali' : ''}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="sell-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="glass rounded-3xl border border-white/10 p-8 md:p-12 space-y-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-700" />
                  
                  {/* Step 1: Contact Details */}
                  <div>
                    <h2 className={`text-2xl font-bold font-heading mb-6 flex items-center gap-3 border-b border-white/5 pb-3 ${bn ? 'font-bengali' : ''}`}>
                      <span className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center text-sm font-bold">1</span>
                      {bn ? 'যোগাযোগের তথ্য' : 'Contact Information'}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'আপনার নাম' : 'Your Name'}</label>
                        <input {...register('name')} className={`input-dark w-full ${bn ? 'font-bengali' : ''}`} placeholder={bn ? 'যেমন: তানভীর রহমান' : 'e.g. Tanvir Rahman'} />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'ফোন নম্বর' : 'Phone Number'}</label>
                        <input {...register('phone')} className={`input-dark w-full ${bn ? 'font-bengali' : ''}`} placeholder={bn ? 'যেমন: ০১৭১২৩৪৫৬৭৮' : 'e.g. 01712345678'} />
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'ইমেইল ঠিকানা' : 'Email Address'}</label>
                        <input {...register('email')} className={`input-dark w-full ${bn ? 'font-bengali' : ''}`} placeholder="e.g. name@domain.com" />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Car Specs */}
                  <div>
                    <h2 className={`text-2xl font-bold font-heading mb-6 flex items-center gap-3 border-b border-white/5 pb-3 ${bn ? 'font-bengali' : ''}`}>
                      <span className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center text-sm font-bold">2</span>
                      {bn ? 'গাড়ির স্পেসিফিকেশন' : 'Vehicle Specifications'}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'ব্র্যান্ড' : 'Brand'}</label>
                        <select {...register('brand')} className={`input-dark w-full ${bn ? 'font-bengali' : ''}`}>
                          <option value="">{bn ? 'ব্র্যান্ড নির্বাচন করুন' : 'Select Brand'}</option>
                          {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        {errors.brand && <p className="text-red-400 text-xs mt-1">{errors.brand.message}</p>}
                      </div>
                      <div>
                        <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'মডেল' : 'Model'}</label>
                        <input {...register('model')} className={`input-dark w-full ${bn ? 'font-bengali' : ''}`} placeholder="e.g. Premio / Vezel" />
                        {errors.model && <p className="text-red-400 text-xs mt-1">{errors.model.message}</p>}
                      </div>
                      <div>
                        <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'ম্যানুফ্যাকচারিং বছর' : 'Manufacturing Year'}</label>
                        <select {...register('year', { valueAsNumber: true })} className={`input-dark w-full ${bn ? 'font-bengali' : ''}`}>
                          {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year.message}</p>}
                      </div>
                      <div>
                        <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'মাইলেজ (কিমি)' : 'Mileage (km)'}</label>
                        <input type="number" {...register('mileage', { valueAsNumber: true })} className={`input-dark w-full ${bn ? 'font-bengali' : ''}`} placeholder="e.g. 45000" />
                        {errors.mileage && <p className="text-red-400 text-xs mt-1">{errors.mileage.message}</p>}
                      </div>
                      <div>
                        <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'জ্বালানির ধরণ' : 'Fuel Type'}</label>
                        <select {...register('fuel_type')} className={`input-dark w-full ${bn ? 'font-bengali' : ''}`}>
                          <option value="hybrid">{bn ? 'হাইব্রিড' : 'Hybrid'}</option>
                          <option value="petrol">{bn ? 'অকটেন / পেট্রোল' : 'Octane / Petrol'}</option>
                          <option value="diesel">{bn ? 'ডিজেল' : 'Diesel'}</option>
                          <option value="electric">{bn ? 'ইলেকট্রিক' : 'Electric'}</option>
                          <option value="cng">{bn ? 'সিএনজি / এলপিজি' : 'CNG / LPG'}</option>
                        </select>
                        {errors.fuel_type && <p className="text-red-400 text-xs mt-1">{errors.fuel_type.message}</p>}
                      </div>
                      <div>
                        <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'ট্রান্সমিশন' : 'Transmission'}</label>
                        <select {...register('transmission')} className={`input-dark w-full ${bn ? 'font-bengali' : ''}`}>
                          <option value="automatic">{bn ? 'অটোমেটিক' : 'Automatic'}</option>
                          <option value="manual">{bn ? 'ম্যানুয়াল' : 'Manual'}</option>
                          <option value="cvt">{bn ? 'সিভিটি' : 'CVT'}</option>
                        </select>
                        {errors.transmission && <p className="text-red-400 text-xs mt-1">{errors.transmission.message}</p>}
                      </div>
                      <div>
                        <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'সাধারণ অবস্থা' : 'General Condition'}</label>
                        <select {...register('condition')} className={`input-dark w-full ${bn ? 'font-bengali' : ''}`}>
                          <option value="Excellent">{bn ? 'চমৎকার (কোনো কাজের প্রয়োজন নেই)' : 'Excellent (No work needed)'}</option>
                          <option value="Good">{bn ? 'ভালো (হালকা স্ক্র্যাচ আছে)' : 'Good (Minor scratches)'}</option>
                          <option value="Fair">{bn ? 'মোটামুটি (কিছু কাজ প্রয়োজন)' : 'Fair (Needs cosmetic work)'}</option>
                          <option value="Needs Work">{bn ? 'কাজের প্রয়োজন (ইঞ্জিন/সাসপেনশন মেরামত দরকার)' : 'Needs Work (Engine/suspension work needed)'}</option>
                        </select>
                        {errors.condition && <p className="text-red-400 text-xs mt-1">{errors.condition.message}</p>}
                      </div>
                      <div>
                        <label className={`block text-sm text-platinum-400 mb-2 ${bn ? 'font-bengali' : ''}`}>{bn ? 'আকাঙ্ক্ষিত মূল্য (টাকা)' : 'Expected Price (BDT)'}</label>
                        <input type="number" {...register('price', { valueAsNumber: true })} className={`input-dark w-full ${bn ? 'font-bengali' : ''}`} placeholder="e.g. 2800000" />
                        {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Photos Upload */}
                  <div>
                    <h2 className={`text-2xl font-bold font-heading mb-6 flex items-center gap-3 border-b border-white/5 pb-3 ${bn ? 'font-bengali' : ''}`}>
                      <span className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center text-sm font-bold">3</span>
                      {bn ? 'ছবি ও রেজিস্ট্রেশন কাগজপত্র' : 'Photos & Registration Document'}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Car Images */}
                      <div className="border border-white/10 border-dashed rounded-2xl p-6 hover:bg-white/5 transition-all">
                        <label className="flex flex-col items-center justify-center cursor-pointer">
                          <Upload className="w-8 h-8 text-orange-400 mb-3" />
                          <span className={`font-heading font-semibold text-white ${bn ? 'font-bengali' : ''}`}>{bn ? 'গাড়ির ছবি আপলোড করুন' : 'Upload Vehicle Photos'}</span>
                          <span className={`text-xs text-platinum-500 mt-1 ${bn ? 'font-bengali' : ''}`}>{bn ? 'সর্বোচ্চ ১০টি ছবি নির্বাচন করুন (JPEG, PNG)' : 'Select up to 10 photos (JPEG, PNG)'}</span>
                          <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>

                        {images.length > 0 && (
                          <div className="grid grid-cols-4 gap-2 mt-4">
                            {images.map((file, idx) => (
                              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group">
                                <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="Car upload thumbnail" />
                                <button 
                                  type="button" 
                                  onClick={() => removeImage(idx)}
                                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600/90 text-white flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Registration Card */}
                      <div className="border border-white/10 border-dashed rounded-2xl p-6 hover:bg-white/5 transition-all flex flex-col justify-center">
                        <label className="flex flex-col items-center justify-center cursor-pointer">
                          <FileText className="w-8 h-8 text-orange-400 mb-3" />
                          <span className={`font-heading font-semibold text-white ${bn ? 'font-bengali' : ''}`}>{bn ? 'রেজিস্ট্রেশন কার্ড কপি' : 'Registration Card Copy'}</span>
                          <span className={`text-xs text-platinum-500 mt-1 ${bn ? 'font-bengali' : ''}`}>{bn ? 'দ্রুত মূল্যায়নের জন্য সহায়ক' : 'Helpful for immediate evaluation'}</span>
                          <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleRegCardChange} />
                        </label>
                        {regCard && (
                          <div className="mt-4 p-3 glass rounded-xl border border-white/5 flex items-center justify-between text-xs">
                            <span className="truncate">{regCard.name}</span>
                            <button type="button" onClick={() => setRegCard(null)} className="text-red-400 font-bold ml-2">{bn ? 'মুছুন' : 'Remove'}</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full py-4 text-base font-semibold" size="lg">
                    <span className={bn ? 'font-bengali' : ''}>
                      {loading ? (bn ? 'জমা দেওয়া হচ্ছে...' : 'Submitting Details...') : (bn ? 'মূল্যায়ন অনুরোধ পাঠান' : 'Submit valuation Request')}
                    </span>
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-navy-900 rounded-3xl p-8 md:p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className={`font-heading text-3xl font-black mb-4 ${bn ? 'font-bengali' : ''}`}>{bn ? 'অনুরোধ সফলভাবে জমা দেওয়া হয়েছে!' : 'Request Submitted Successfully!'}</h2>
                  <p className={`text-platinum-300 text-lg max-w-xl mx-auto mb-8 ${bn ? 'font-bengali' : ''}`}>
                    {bn ? 'আপনার গাড়ি বিবরণ জমা দেওয়ার জন্য ধন্যবাদ। আমাদের একজন মূল্যায়ন বিশেষজ্ঞ বিবরণগুলো পর্যালোচনা করে ২ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবেন।' : 'Thank you for submitting your car. Our valuation expert will review the details and contact you within 2 hours with an initial estimate.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => setSubmitted(false)} variant="outline" className={bn ? 'font-bengali' : ''}>
                      {bn ? 'আরেকটি গাড়ি জমা দিন' : 'Submit Another Car'}
                    </Button>
                    <a href="https://wa.me/8801401238019" target="_blank" rel="noopener noreferrer" className={`btn-primary inline-flex items-center justify-center ${bn ? 'font-bengali' : ''}`}>
                      {tr.cta_btn_whatsapp}
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
