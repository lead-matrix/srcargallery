import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, MessageSquare, CheckCircle, Send, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | SR Car Gallery</title>
        <meta name="description" content="Get in touch with SR Car Gallery in Dhaka. Call us at +880 1401-238019, send an email to info@srcargallery.autos or visit our showroom." />
      </Helmet>

      <div className="pt-24 pb-16 bg-navy-950 text-white min-h-screen">
        <div className="container-custom">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
            <h1 className="font-heading text-4xl md:text-5xl font-black mt-3 mb-4">
              We'd Love to <span className="text-gradient">Hear From You</span>
            </h1>
            <p className="text-platinum-400">
              Have questions about a car, need a valuation, or want to book an inspection? Drop us a line!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {[
                { icon: Phone, title: 'Call Us Directly', details: '+880 1401-238019', sub: 'Available Sat-Thu 9am-7pm', link: 'tel:+8801401238019' },
                { icon: Mail, title: 'Email Address', details: 'info@srcargallery.autos', sub: 'We reply within 24 hours', link: 'mailto:info@srcargallery.autos' },
                { icon: MapPin, title: 'Showroom Location', details: 'D-19 B, Agargaon Taltola', sub: 'Sher E Bangla Nagar, Dhaka-1207', link: 'https://maps.google.com/?q=Agargaon+Taltola+Dhaka' }
              ].map((item, idx) => (
                <a 
                  href={item.link} 
                  key={idx}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="glass border border-white/5 p-6 rounded-2xl flex items-start gap-4 hover:border-orange-500/20 transition-all duration-300 block"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-base">{item.title}</h3>
                    <p className="text-sm text-platinum-200 mt-1 font-semibold">{item.details}</p>
                    <p className="text-xs text-platinum-500 mt-0.5">{item.sub}</p>
                  </div>
                </a>
              ))}

              {/* Social Channels */}
              <div className="glass border border-white/5 p-6 rounded-2xl text-center space-y-4">
                <h4 className="font-heading font-bold text-white text-sm">Follow Our Social Channels</h4>
                <div className="flex justify-center gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn-secondary py-2 px-4 text-xs inline-flex items-center gap-1.5">
                    Facebook
                  </a>
                  <a href="https://wa.me/8801401238019" target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-4 text-xs inline-flex items-center gap-1.5">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    onSubmit={handleSubmit}
                    className="glass border border-white/10 rounded-3xl p-8 md:p-10 space-y-6 relative overflow-hidden h-full flex flex-col justify-between"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-700" />
                    
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-white border-b border-white/5 pb-3 mb-6">Send Us a Message</h3>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm text-platinum-400 mb-2">FullName</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                            placeholder="e.g. Sajid Mahmud"
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
                            placeholder="e.g. 018XXXXXXXX"
                            className="input-dark w-full"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm text-platinum-400 mb-2">Email Address</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                            placeholder="e.g. sajid@domain.com"
                            className="input-dark w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-platinum-400 mb-2">Subject</label>
                          <input
                            type="text"
                            required
                            value={formData.subject}
                            onChange={e => setFormData(f => ({ ...f, subject: e.target.value }))}
                            placeholder="e.g. Inquiry about Toyota Premio"
                            className="input-dark w-full"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm text-platinum-400 mb-2">Message</label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                          placeholder="Tell us what you need in detail..."
                          className="input-dark w-full"
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full py-4 text-base font-semibold" size="lg">
                      {loading ? 'Sending Message...' : 'Send Message'}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-navy-900 rounded-3xl p-12 text-center h-full flex flex-col justify-center items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="font-heading text-2xl font-black text-white mb-3">Message Sent!</h3>
                    <p className="text-sm text-platinum-300 max-w-md mx-auto mb-8">
                      Thank you for contacting us. One of our customer representatives will get back to you shortly (usually within 1-2 hours).
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
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
