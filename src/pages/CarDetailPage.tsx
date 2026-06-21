import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Phone, MessageCircle, Heart, Share2, ShieldCheck, Download, Calendar,
  Gauge, Fuel, Settings, MapPin, Users, ChevronLeft, ChevronRight,
  CheckCircle, XCircle, AlertCircle, ArrowRight, Car, ClipboardList,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPriceEn, formatMileage } from '@/lib/utils'
import { MOCK_CARS } from '@/lib/mockData'
import CarCard from '@/components/cars/CarCard'

export default function CarDetailPage() {
  const { id } = useParams()
  const car = MOCK_CARS.find(c => c.id === id) || MOCK_CARS[0]
  const similarCars = MOCK_CARS.filter(c => c.id !== car.id && (c.brand === car.brand || c.body_type === car.body_type)).slice(0, 4)

  const images = car.car_images?.length
    ? car.car_images
    : [{ id: 'main', car_id: car.id, url: car.thumbnail_url || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200', alt: car.title, order_index: 0, is_primary: true }]

  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [loanAmount, setLoanAmount] = useState(Math.round(car.price * 0.7))
  const [downPayment, setDownPayment] = useState(Math.round(car.price * 0.3))
  const [tenure, setTenure] = useState(36)
  const [rate] = useState(9)

  const monthlyPayment = Math.round(
    (loanAmount * (rate / 100 / 12)) / (1 - Math.pow(1 + rate / 100 / 12, -tenure))
  )

  const prevImage = () => setCurrentImage(i => (i - 1 + images.length) % images.length)
  const nextImage = () => setCurrentImage(i => (i + 1) % images.length)

  const whatsappMsg = `Hello SR Car Gallery! I'm interested in the ${car.title} priced at ${formatPriceEn(car.price)}. (ID: ${car.id})`

  const StatusIcon = ({ valid }: { valid?: boolean }) =>
    valid ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" /> :
      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />

  const specs = [
    { label: 'Year', value: car.year, icon: Calendar },
    { label: 'Mileage', value: formatMileage(car.mileage), icon: Gauge },
    { label: 'Fuel', value: car.fuel_type?.charAt(0).toUpperCase() + car.fuel_type?.slice(1), icon: Fuel },
    { label: 'Transmission', value: car.transmission?.toUpperCase(), icon: Settings },
    { label: 'Engine', value: car.engine_cc ? `${car.engine_cc}cc` : 'N/A', icon: Car },
    { label: 'Color', value: car.color, icon: Car },
    { label: 'Seats', value: car.seats || 5, icon: Users },
    { label: 'Ownership', value: `${car.ownership_count || 1} Owner`, icon: Users },
  ]

  return (
    <>
      <Helmet>
        <title>{car.title} — SR Car Gallery Bangladesh</title>
        <meta name="description" content={`Buy ${car.title} at ${formatPriceEn(car.price)}. ${car.mileage.toLocaleString()}km, ${car.year}, ${car.transmission}. Inspected and certified by SR Car Gallery Dhaka.`} />
      </Helmet>

      <div className="min-h-screen bg-navy-900">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-6 pb-2">
          <div className="flex items-center gap-2 text-sm text-platinum-500">
            <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/cars" className="hover:text-orange-400 transition-colors">Cars</Link>
            <span>/</span>
            <span className="text-platinum-300">{car.title}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left — Images + Details */}
            <div className="lg:col-span-2">
              {/* Image gallery */}
              <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[16/10] bg-navy-800">
                <img
                  src={images[currentImage]?.url}
                  alt={images[currentImage]?.alt || car.title}
                  className="w-full h-full object-cover"
                />

                {/* Nav arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-900/70 text-white flex items-center justify-center hover:bg-navy-900 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-900/70 text-white flex items-center justify-center hover:bg-navy-900 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImage(i)}
                          className={`rounded-full transition-all duration-200 ${i === currentImage ? 'bg-orange-500 w-6 h-2' : 'bg-white/40 w-2 h-2'}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {car.certified && (
                    <Badge variant="certified" className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Certified
                    </Badge>
                  )}
                  {car.just_arrived && <Badge variant="new">Just Arrived</Badge>}
                </div>

                <button className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="glass border border-white/10 rounded-xl p-2 text-platinum-400 hover:text-orange-400 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </div>
                </button>
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-3 mb-6 overflow-x-auto pb-1 scrollbar-none">
                  {images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setCurrentImage(i)}
                      className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        i === currentImage ? 'border-orange-500' : 'border-transparent hover:border-white/20'
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Title & Price */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="font-heading text-3xl font-black text-white">{car.title}</h1>
                  {car.title_bn && <p className="text-platinum-400 font-bengali mt-1">{car.title_bn}</p>}
                  <div className="flex items-center gap-2 mt-2 text-platinum-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    Agargaon Taltola, Dhaka-1207
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-heading text-4xl font-black text-orange-400">{formatPriceEn(car.price)}</div>
                  {car.negotiable && <Badge variant="negotiable" className="mt-1">Negotiable</Badge>}
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {specs.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="glass rounded-xl p-4 border border-white/8">
                    <Icon className="w-5 h-5 text-orange-400 mb-2" />
                    <div className="text-platinum-500 text-xs">{label}</div>
                    <div className="text-white font-semibold text-sm mt-0.5">{value}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              {car.features && car.features.length > 0 && (
                <div className="glass rounded-2xl p-6 border border-white/8 mb-6">
                  <h2 className="font-heading font-bold text-white text-xl mb-4">Features & Equipment</h2>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map(f => (
                      <span key={f} className="flex items-center gap-1.5 text-sm text-platinum-300 bg-navy-700 border border-white/8 px-3 py-1.5 rounded-xl">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents & Legal */}
              <div className="glass rounded-2xl p-6 border border-white/8 mb-6">
                <h2 className="font-heading font-bold text-white text-xl mb-4 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-orange-400" />
                  Documents & Legal Status
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Tax Token', valid: car.tax_token_valid, expiry: car.tax_token_expiry },
                    { label: 'Fitness Certificate', valid: car.fitness_valid, expiry: car.fitness_expiry },
                    { label: 'Insurance', valid: car.insurance_valid, expiry: car.insurance_expiry },
                    { label: 'Accident History', valid: !car.accident_history },
                  ].map(({ label, valid, expiry }) => (
                    <div key={label} className="flex items-center gap-3 p-3 bg-navy-800 rounded-xl">
                      <StatusIcon valid={valid} />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{label}</div>
                        {expiry && <div className="text-platinum-500 text-xs">Expires: {expiry}</div>}
                      </div>
                      <span className={`text-xs font-semibold ${valid ? 'text-emerald-400' : 'text-red-400'}`}>
                        {valid ? 'Valid' : label === 'Accident History' ? 'Yes' : 'Expired'}
                      </span>
                    </div>
                  ))}
                </div>

                {car.ownership_count && (
                  <div className="mt-4 p-3 bg-navy-800 rounded-xl flex items-center gap-3">
                    <Users className="w-4 h-4 text-orange-400" />
                    <div>
                      <span className="text-white text-sm font-medium">{car.ownership_count} Previous Owner{car.ownership_count > 1 ? 's' : ''}</span>
                      {car.previous_owners && <div className="text-platinum-500 text-xs">{car.previous_owners}</div>}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {car.description && (
                <div className="glass rounded-2xl p-6 border border-white/8 mb-6">
                  <h2 className="font-heading font-bold text-white text-xl mb-4">Description</h2>
                  <p className="text-platinum-300 leading-relaxed">{car.description}</p>
                  {car.description_bn && (
                    <p className="text-platinum-400 font-bengali text-sm mt-3 leading-relaxed">{car.description_bn}</p>
                  )}
                </div>
              )}

              {/* Inspection note */}
              <div className="flex items-start gap-4 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-8">
                <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-emerald-400 font-semibold mb-1">Professionally Inspected</h3>
                  <p className="text-platinum-300 text-sm">This vehicle has passed SR Car Gallery's 150-point inspection. Download the full report below.</p>
                  <button className="mt-3 flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors">
                    <Download className="w-4 h-4" />
                    Download Inspection Report (PDF)
                  </button>
                </div>
              </div>

              {/* Similar Cars */}
              {similarCars.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white mb-6">Similar Vehicles</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {similarCars.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Sticky sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                {/* Action buttons */}
                <div className="glass rounded-2xl p-6 border border-white/8">
                  <div className="font-heading text-3xl font-black text-orange-400 mb-1">{formatPriceEn(car.price)}</div>
                  {car.negotiable && <p className="text-platinum-400 text-sm mb-5">Price is negotiable</p>}

                  <div className="space-y-3 mt-4">
                    <Button asChild className="w-full" size="lg">
                      <a href={`https://wa.me/8801401238019?text=${encodeURIComponent(whatsappMsg)}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp Inquiry
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <a href="tel:+8801401238019">
                        <Phone className="w-5 h-5" />
                        Call Now
                      </a>
                    </Button>
                    <Button asChild variant="secondary" className="w-full" size="lg">
                      <Link to="/book-inspection">
                        <Calendar className="w-5 h-5" />
                        Book Test Drive
                      </Link>
                    </Button>
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border transition-all text-sm font-semibold ${
                        isFavorited
                          ? 'bg-red-500/20 border-red-500/30 text-red-400'
                          : 'border-white/10 text-platinum-400 hover:border-orange-500/30 hover:text-orange-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                      {isFavorited ? 'Saved to Favorites' : 'Save to Favorites'}
                    </button>
                  </div>
                </div>

                {/* Financing Calculator */}
                <div className="glass rounded-2xl p-6 border border-white/8">
                  <h3 className="font-heading font-bold text-white text-lg mb-5 flex items-center gap-2">
                    <Car className="w-5 h-5 text-orange-400" />
                    Financing Calculator
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-platinum-400 text-xs mb-1.5 block">Down Payment (৳)</label>
                      <input
                        type="range"
                        min={car.price * 0.1}
                        max={car.price * 0.9}
                        step={50000}
                        value={downPayment}
                        onChange={e => {
                          const dp = parseInt(e.target.value)
                          setDownPayment(dp)
                          setLoanAmount(car.price - dp)
                        }}
                        className="w-full accent-orange-500"
                      />
                      <div className="flex justify-between text-xs text-platinum-500 mt-1">
                        <span>{formatPriceEn(downPayment)}</span>
                        <span>{Math.round(downPayment / car.price * 100)}%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-platinum-400 text-xs mb-1.5 block">Loan Tenure</label>
                      <div className="flex gap-2">
                        {[12, 24, 36, 48, 60].map(t => (
                          <button
                            key={t}
                            onClick={() => setTenure(t)}
                            className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${
                              tenure === t
                                ? 'bg-orange-500 text-white border-orange-500'
                                : 'border-white/10 text-platinum-400 hover:border-orange-500/30'
                            }`}
                          >
                            {t}mo
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-navy-700 rounded-xl p-4 text-center">
                      <div className="text-platinum-400 text-xs mb-1">Estimated Monthly Payment</div>
                      <div className="font-heading text-3xl font-black text-orange-400">{formatPriceEn(monthlyPayment)}</div>
                      <div className="text-platinum-500 text-xs mt-1">at {rate}% p.a. over {tenure} months</div>
                    </div>

                    <p className="text-platinum-500 text-xs">* Estimated only. Contact us for actual financing options.</p>
                  </div>
                </div>

                {/* Alert */}
                <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                  <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-platinum-300 text-sm">This vehicle may sell quickly. Contact us now to secure it.</p>
                    <Link to="/book-inspection" className="mt-2 flex items-center gap-1 text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors">
                      Reserve Vehicle <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
