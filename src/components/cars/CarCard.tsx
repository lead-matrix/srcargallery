import { Link } from 'react-router-dom'
import { Heart, MapPin, Gauge, Fuel, Settings, ShieldCheck, ArrowRight, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPriceEn, formatMileage } from '@/lib/utils'
import type { CarWithImages } from '@/types/database'
import { motion } from 'framer-motion'

interface CarCardProps {
  car: CarWithImages
  onFavorite?: (id: string) => void
  isFavorited?: boolean
  index?: number
}

export default function CarCard({ car, onFavorite, isFavorited = false, index = 0 }: CarCardProps) {
  const thumbnail = car.thumbnail_url || car.car_images?.[0]?.url || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'

  const statusBadge = {
    available: null,
    reserved: <Badge variant="reserved">Reserved</Badge>,
    sold: <Badge variant="sold">Sold</Badge>,
    inspection: <Badge variant="negotiable">In Inspection</Badge>,
  }[car.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="car-card group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={thumbnail}
          alt={car.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {car.certified && (
            <Badge variant="certified" className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Certified
            </Badge>
          )}
          {car.just_arrived && <Badge variant="new">Just Arrived</Badge>}
          {statusBadge}
          {car.fuel_type === 'hybrid' && <Badge variant="hybrid">Hybrid</Badge>}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            onFavorite?.(car.id)
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
            isFavorited
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-navy-900/70 text-platinum-400 hover:bg-red-500/20 hover:text-red-400'
          }`}
          aria-label="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Negotiable badge */}
        {car.negotiable && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="negotiable">Negotiable</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Price */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="font-heading font-bold text-white text-lg leading-tight truncate group-hover:text-orange-400 transition-colors">
              {car.title}
            </h3>
            {car.title_bn && (
              <p className="text-platinum-400 text-xs font-bengali mt-0.5">{car.title_bn}</p>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-heading font-black text-orange-400 text-xl">
              {formatPriceEn(car.price)}
            </div>
            {car.negotiable && (
              <div className="text-xs text-platinum-500">Negotiable</div>
            )}
          </div>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-platinum-400">
            <Calendar className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-platinum-400">
            <Gauge className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
            <span>{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-platinum-400">
            <Fuel className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
            <span className="capitalize">{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-platinum-400">
            <Settings className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
            <span className="capitalize">{car.transmission}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-xs text-platinum-500 mb-4">
          <MapPin className="w-3 h-3" />
          <span>Agargaon Taltola, Dhaka</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button asChild className="flex-1 text-sm" size="sm">
            <Link to={`/cars/${car.id}`}>
              View Details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="whatsapp"
            size="icon"
            className="w-10 h-9 flex-shrink-0 rounded-xl"
          >
            <a
              href={`https://wa.me/8801401238019?text=Hello! I'm interested in the ${car.title} priced at ${formatPriceEn(car.price)}. (ID: ${car.id})`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Inquire via WhatsApp"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
