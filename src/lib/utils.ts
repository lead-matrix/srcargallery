import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = 'BDT'): string {
  if (currency === 'BDT') {
    if (price >= 10000000) {
      return `৳${(price / 10000000).toFixed(2)} কোটি`
    } else if (price >= 100000) {
      return `৳${(price / 100000).toFixed(2)} লক্ষ`
    }
    return `৳${price.toLocaleString('en-BD')}`
  }
  return new Intl.NumberFormat('en-BD', { style: 'currency', currency }).format(price)
}

export function formatPriceEn(price: number): string {
  if (price >= 10000000) {
    return `৳${(price / 10000000).toFixed(2)} Crore`
  } else if (price >= 100000) {
    return `৳${(price / 100000).toFixed(1)} Lac`
  }
  return `৳${price.toLocaleString()}`
}

export function formatMileage(km: number): string {
  return `${km.toLocaleString()} km`
}

export function formatYear(year: number): string {
  return year.toString()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getWhatsAppUrl(message: string): string {
  const phone = import.meta.env.VITE_WHATSAPP || '8801401238019'
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function getCarWhatsAppMessage(car: { title: string; price: number; id: string }): string {
  return `Hello SR Car Gallery! I'm interested in the ${car.title} priced at ${formatPriceEn(car.price)}. Please provide more details. (ID: ${car.id})`
}

export function estimateCarPrice(params: {
  brand: string
  model: string
  year: number
  mileage: number
  condition: string
  transmission: string
}): { min: number; max: number; estimate: number } {
  // Base prices by brand tier (BDT)
  const brandMultipliers: Record<string, number> = {
    Toyota: 1.0, Honda: 0.95, Nissan: 0.85, Mitsubishi: 0.88,
    Mazda: 0.82, BMW: 1.8, Mercedes: 2.0, Audi: 1.7, Lexus: 1.6,
    Hyundai: 0.75, Kia: 0.72, Suzuki: 0.65,
  }

  const basePrice = 1500000 // BDT 15 Lac base
  const brandMult = brandMultipliers[params.brand] || 0.8
  const currentYear = new Date().getFullYear()
  const age = currentYear - params.year
  const ageFactor = Math.max(0.3, 1 - age * 0.07)
  const mileageFactor = Math.max(0.5, 1 - params.mileage / 500000)

  const conditionFactors: Record<string, number> = {
    excellent: 1.15, good: 1.0, fair: 0.82, poor: 0.65,
  }
  const conditionFactor = conditionFactors[params.condition] || 1.0
  const transFactor = params.transmission === 'automatic' ? 1.1 : 1.0

  const estimate = Math.round(basePrice * brandMult * ageFactor * mileageFactor * conditionFactor * transFactor)
  return {
    estimate,
    min: Math.round(estimate * 0.9),
    max: Math.round(estimate * 1.1),
  }
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + '…' : str
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export function timeAgo(date: string | Date): string {
  const now = new Date()
  const then = new Date(date)
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  return then.toLocaleDateString('en-BD')
}
