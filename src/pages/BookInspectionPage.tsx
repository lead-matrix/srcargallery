import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle, Info, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BRANDS } from '@/types/database'

export default function BookInspectionPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    date: '',
    timeSlot: '',
    location: 'showroom',
    address: ''
  })
  
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const timeSlots = [
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '03:00 PM - 05:00 PM',
    '05:00 PM - 07:00 PM'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <>
      <Helmet>
        <title>Book Inspection | SR Car Gallery</title>
        <meta name="description" content="Book a certified multi-point vehicle inspection in Dhaka. Let our experts check the engine, chassis, and bodywork before you buy or sell." />
      </Helmet>

      <div className="pt-24 pb-16 bg-navy-950 text-white min-h-screen">
        <div className="container-custom">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Certified Safety</span>
            <h1 className="font-heading text-4xl md:text-5xl font-black mt-3 mb-6">
              Book a Professional <span className="text-gradient">Multi-Point Inspection</span>
            </h1>
            <p className="text-platinum-400 text-lg leading-relaxed">
              Ensure peace of mind with our 200+ point inspection check. Our certified technicians examine the engine, transmission, suspension, brakes, electricals, and frame structure.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Steps / Process */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass border border-white/5 p-6 rounded-2xl">
                <h3 className="font-heading text-xl font-bold mb-6 text-white">How It Works</h3>
                <div className="space-y-6 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                  {[
                    { title: 'Schedule Online', desc: 'Choose your date, time, and location (home or showroom).' },
                    { title: 'Thorough Checks', desc: 'Our technicians inspect 200+ checkpoints with specialized gear.' },
                    { title: 'Detailed PDF Report', desc: 'Get a full digital report including engine health, chassis structure, and test drive logs.' }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm z-10 flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-white text-sm">{step.title}</h4>
                        <p className="text-xs text-platinum-400 mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass border border-white/5 p-6 rounded-2xl space-y-4">
                <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  Showroom Address
                </h3>
                <p className="text-sm text-platinum-300">
                  D-19 B, Agargaon Taltola, Sher E Bangla Nagar, Dhaka-1207
                </p>
                <div className="text-xs text-platinum-500 bg-white/5 p-3 rounded-xl flex gap-2">
                  <Info className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Inspections at your location are only available within Dhaka Metropolitan Area.</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    onSubmit={handleSubmit}
                    className="glass border border-white/10 rounded-3xl p-8 space-y-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-700" />
                    
                    <h3 className="font-heading text-2xl font-bold text-white border-b border-white/5 pb-3">Book Your Slot</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-platinum-400 mb-2">FullName</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                          placeholder="e.g. Asif Chowdhury"
                          className="input-dark w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-platinum-400 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                          placeholder="e.g. 01712345678"
                          className="input-dark w-full"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-platinum-400 mb-2">Car Brand</label>
                        <select
                          required
                          value={formData.brand}
                          onChange={e => setFormData(f => ({ ...f, brand: e.target.value }))}
                          className="input-dark w-full"
                        >
                          <option value="">Select Brand</option>
                          {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-platinum-400 mb-2">Car Model</label>
                        <input
                          type="text"
                          required
                          value={formData.model}
                          onChange={e => setFormData(f => ({ ...f, model: e.target.value }))}
                          placeholder="e.g. Premio / Vezel"
                          className="input-dark w-full"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-platinum-400 mb-2">Preferred Date</label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={e => setFormData(f => ({ ...f, date: e.target.value }))}
                          className="input-dark w-full text-white appearance-none"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-platinum-400 mb-2">Preferred Time Slot</label>
                        <select
                          required
                          value={formData.timeSlot}
                          onChange={e => setFormData(f => ({ ...f, timeSlot: e.target.value }))}
                          className="input-dark w-full"
                        >
                          <option value="">Select Time Slot</option>
                          {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                      <label className="block text-sm text-platinum-400 mb-2">Location Type</label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData(f => ({ ...f, location: 'showroom', address: '' }))}
                          className={`flex-1 p-3 rounded-xl border text-center font-semibold text-sm transition-all ${
                            formData.location === 'showroom'
                              ? 'border-orange-500 bg-orange-500/10 text-white'
                              : 'border-white/10 text-platinum-400 hover:text-white'
                          }`}
                        >
                          At Showroom
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(f => ({ ...f, location: 'home' }))}
                          className={`flex-1 p-3 rounded-xl border text-center font-semibold text-sm transition-all ${
                            formData.location === 'home'
                              ? 'border-orange-500 bg-orange-500/10 text-white'
                              : 'border-white/10 text-platinum-400 hover:text-white'
                          }`}
                        >
                          At My Home / Office
                        </button>
                      </div>
                    </div>

                    {formData.location === 'home' && (
                      <div>
                        <label className="block text-sm text-platinum-400 mb-2">Full Address</label>
                        <textarea
                          required
                          rows={3}
                          value={formData.address}
                          onChange={e => setFormData(f => ({ ...f, address: e.target.value }))}
                          placeholder="Provide the location in Dhaka where the vehicle is parked."
                          className="input-dark w-full"
                        />
                      </div>
                    )}

                    <Button type="submit" disabled={loading} className="w-full py-4 text-base font-semibold" size="lg">
                      {loading ? 'Processing Booking...' : 'Request Inspection Booking'}
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-navy-900 rounded-3xl p-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="font-heading text-2xl font-black text-white mb-3">Inspection Scheduled!</h3>
                    <p className="text-sm text-platinum-300 max-w-md mx-auto mb-6">
                      We have received your booking details for {formData.date} at {formData.timeSlot}. An agent will call you within 30 minutes to confirm your appointment.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button onClick={() => setSubmitted(false)} variant="outline">
                        Book Another Slot
                      </Button>
                      <a href="/" className="btn-primary inline-flex items-center justify-center">
                        Back to Home
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
