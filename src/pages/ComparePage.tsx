import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Plus, ArrowLeft, ShieldCheck, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCompareStore } from '@/store/compareStore'
import { MOCK_CARS } from '@/lib/mockData'

export default function ComparePage() {
  const { compareIds, removeCar, clear } = useCompareStore()

  const carsToCompare = MOCK_CARS.filter(c => compareIds.includes(c.id))

  const allFeatures = Array.from(
    new Set(carsToCompare.flatMap(car => car.features || []))
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <>
      <Helmet>
        <title>Compare Cars | SR Car Gallery</title>
        <meta name="description" content="Compare specifications, features, mileage, and prices of used cars in Dhaka side-by-side to make the right buying choice." />
      </Helmet>

      <div className="pt-24 pb-16 bg-navy-950 text-white min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <Link to="/cars" className="inline-flex items-center text-sm text-platinum-400 hover:text-orange-400 transition-colors mb-2">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Inventory
              </Link>
              <h1 className="font-heading text-3xl md:text-4xl font-black flex items-center gap-3">
                <Scale className="w-8 h-8 text-orange-500" />
                Compare Vehicles
              </h1>
            </div>
            {carsToCompare.length > 0 && (
              <Button variant="outline" size="sm" onClick={clear}>
                Clear Comparison
              </Button>
            )}
          </div>

          {carsToCompare.length === 0 ? (
            <div className="glass border border-white/5 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-full bg-navy-800 flex items-center justify-center mx-auto">
                <Scale className="w-8 h-8 text-platinum-500" />
              </div>
              <h3 className="font-heading text-xl font-bold">No cars selected for comparison</h3>
              <p className="text-sm text-platinum-400">
                Browse our verified inventory and click the compare icon on any vehicle card to add it here.
              </p>
              <Link to="/cars" className="btn-primary inline-block">
                Browse Cars
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[800px] space-y-4">
                
                {/* Visual Row */}
                <div className="grid grid-cols-4 gap-6 items-stretch">
                  <div className="flex flex-col justify-end p-4">
                    <span className="text-platinum-500 text-xs uppercase font-bold tracking-wider">Comparison Matrix</span>
                    <span className="text-platinum-400 text-xs mt-1">Comparing {carsToCompare.length} models</span>
                  </div>
                  
                  {carsToCompare.map(car => (
                    <motion.div 
                      layout
                      key={car.id} 
                      className="glass border border-white/10 rounded-2xl p-4 flex flex-col justify-between relative group"
                    >
                      <button 
                        onClick={() => removeCar(car.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-navy-950/80 hover:bg-red-900/40 text-platinum-400 hover:text-red-400 border border-white/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-navy-900">
                        <img src={car.thumbnail_url} className="w-full h-full object-cover" alt={car.title} />
                      </div>
                      
                      <div>
                        {car.certified && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold mb-2">
                            <ShieldCheck className="w-3 h-3" /> Certified
                          </span>
                        )}
                        <h3 className="font-heading font-bold text-white text-base truncate">{car.title}</h3>
                        <p className="text-sm font-bold text-orange-400 mt-1">{formatPrice(car.price)}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5">
                        <Link to={`/cars/${car.id}`} className="btn-primary w-full text-xs py-2 px-3 text-center justify-center inline-flex">
                          View Details
                        </Link>
                      </div>
                    </motion.div>
                  ))}

                  {/* Empty Comparison Slot */}
                  {carsToCompare.length < 3 && (
                    <Link to="/cars" className="border border-dashed border-white/10 hover:border-orange-500/30 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-white/2 hover:bg-orange-500/2 transition-all">
                      <Plus className="w-8 h-8 text-platinum-500 mb-2" />
                      <span className="text-xs text-platinum-400 font-semibold">Add Car to Compare</span>
                    </Link>
                  )}
                </div>

                {/* Spec details rows */}
                <div className="glass border border-white/5 rounded-2xl p-6 space-y-4">
                  {[
                    { label: 'Brand', key: 'brand' },
                    { label: 'Model', key: 'model' },
                    { label: 'Year', key: 'year' },
                    { label: 'Registration Year', key: 'registration_year' },
                    { label: 'Mileage', key: 'mileage', suffix: ' km' },
                    { label: 'Fuel Type', key: 'fuel_type' },
                    { label: 'Transmission', key: 'transmission' },
                    { label: 'Engine', key: 'engine_cc', suffix: ' cc' },
                    { label: 'Body Type', key: 'body_type' },
                    { label: 'Seats', key: 'seats' },
                    { label: 'Accident History', key: 'accident_history', format: (val: boolean) => val ? 'Yes' : 'No' }
                  ].map((spec, rIdx) => (
                    <div key={rIdx} className="grid grid-cols-4 gap-6 text-sm py-2 border-b border-white/5 last:border-0 items-center">
                      <span className="text-platinum-400 font-semibold">{spec.label}</span>
                      {carsToCompare.map(car => {
                        const val = car[spec.key as keyof typeof car]
                        let display = val === undefined || val === null ? '-' : String(val)
                        if (spec.format) display = spec.format(val as boolean)
                        if (spec.suffix && val) display += spec.suffix
                        return (
                          <span key={car.id} className="text-white capitalize">
                            {display}
                          </span>
                        )
                      })}
                      {/* Empty column placeholder */}
                      {carsToCompare.length < 3 && <span className="text-platinum-500">-</span>}
                    </div>
                  ))}
                </div>

                {/* Features rows */}
                <div className="glass border border-white/5 rounded-2xl p-6 space-y-4">
                  <h3 className="font-heading text-lg font-bold text-white mb-4">Key Features Comparison</h3>
                  {allFeatures.map((feature, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-6 text-sm py-2 border-b border-white/5 last:border-0 items-center">
                      <span className="text-platinum-400">{feature}</span>
                      {carsToCompare.map(car => {
                        const hasIt = car.features?.includes(feature)
                        return (
                          <span key={car.id} className={hasIt ? 'text-emerald-400 font-bold' : 'text-platinum-600'}>
                            {hasIt ? '✔ Available' : '✘ Not Available'}
                          </span>
                        )
                      })}
                      {carsToCompare.length < 3 && <span className="text-platinum-500">-</span>}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
