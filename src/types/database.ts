export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: Car
        Insert: Omit<Car, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Car, 'id'>>
      }
      car_images: {
        Row: CarImage
        Insert: Omit<CarImage, 'id'>
        Update: Partial<Omit<CarImage, 'id'>>
      }
      inspection_reports: {
        Row: InspectionReport
        Insert: Omit<InspectionReport, 'id' | 'created_at'>
        Update: Partial<Omit<InspectionReport, 'id'>>
      }
      sell_requests: {
        Row: SellRequest
        Insert: Omit<SellRequest, 'id' | 'created_at'>
        Update: Partial<Omit<SellRequest, 'id'>>
      }
      valuations: {
        Row: Valuation
        Insert: Omit<Valuation, 'id' | 'created_at'>
        Update: Partial<Omit<Valuation, 'id'>>
      }
      leads: {
        Row: Lead
        Insert: Omit<Lead, 'id' | 'created_at'>
        Update: Partial<Omit<Lead, 'id'>>
      }
      appointments: {
        Row: Appointment
        Insert: Omit<Appointment, 'id' | 'created_at'>
        Update: Partial<Omit<Appointment, 'id'>>
      }
      users: {
        Row: UserProfile
        Insert: Omit<UserProfile, 'created_at'>
        Update: Partial<UserProfile>
      }
      favorites: {
        Row: Favorite
        Insert: Omit<Favorite, 'id' | 'created_at'>
        Update: Partial<Favorite>
      }
      blog_posts: {
        Row: BlogPost
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<BlogPost, 'id'>>
      }
      transactions: {
        Row: Transaction
        Insert: Omit<Transaction, 'id' | 'created_at'>
        Update: Partial<Omit<Transaction, 'id'>>
      }
      testimonials: {
        Row: Testimonial
        Insert: Omit<Testimonial, 'id' | 'created_at'>
        Update: Partial<Omit<Testimonial, 'id'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      car_status: 'available' | 'reserved' | 'sold' | 'inspection'
      fuel_type: 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'cng'
      transmission: 'automatic' | 'manual' | 'cvt'
      body_type: 'sedan' | 'suv' | 'hatchback' | 'microbus' | 'pickup' | 'coupe' | 'wagon' | 'convertible'
      condition: 'excellent' | 'good' | 'fair' | 'poor'
      lead_status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
      appointment_type: 'test_drive' | 'inspection' | 'purchase' | 'valuation'
      appointment_status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
      sell_request_status: 'pending' | 'reviewing' | 'offer_made' | 'accepted' | 'rejected' | 'purchased'
    }
  }
}

export interface Car {
  id: string
  title: string
  title_bn?: string
  brand: string
  model: string
  variant?: string
  year: number
  price: number
  negotiable: boolean
  status: 'available' | 'reserved' | 'sold' | 'inspection'
  body_type: 'sedan' | 'suv' | 'hatchback' | 'microbus' | 'pickup' | 'coupe' | 'wagon' | 'convertible'
  fuel_type: 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'cng'
  transmission: 'automatic' | 'manual' | 'cvt'
  mileage: number
  color: string
  exterior_color?: string
  interior_color?: string
  engine_cc?: number
  engine_type?: string
  horsepower?: number
  seats?: number
  doors?: number
  registration_number?: string
  registration_year?: number
  tax_token_valid?: boolean
  tax_token_expiry?: string
  fitness_valid?: boolean
  fitness_expiry?: string
  insurance_valid?: boolean
  insurance_expiry?: string
  ownership_count?: number
  previous_owners?: string
  accident_history?: boolean
  accident_details?: string
  service_history?: string
  description?: string
  description_bn?: string
  features?: string[]
  certified: boolean
  just_arrived: boolean
  featured: boolean
  thumbnail_url?: string
  purchase_price?: number
  created_at: string
  updated_at: string
}

export interface CarImage {
  id: string
  car_id: string
  url: string
  alt?: string
  order_index: number
  is_primary: boolean
}

export interface InspectionReport {
  id: string
  car_id: string
  inspector_name?: string
  inspection_date: string
  overall_score: number
  engine_score: number
  transmission_score: number
  body_score: number
  interior_score: number
  electronics_score: number
  tyres_score: number
  brakes_score: number
  suspension_score: number
  ac_score: number
  notes?: string
  pdf_url?: string
  created_at: string
}

export interface SellRequest {
  id: string
  owner_name: string
  phone: string
  email?: string
  brand: string
  model: string
  year: number
  mileage: number
  fuel_type: string
  transmission: string
  color: string
  registration_number?: string
  expected_price: number
  description?: string
  status: 'pending' | 'reviewing' | 'offer_made' | 'accepted' | 'rejected' | 'purchased'
  offer_price?: number
  photos?: string[]
  registration_card_url?: string
  admin_notes?: string
  created_at: string
}

export interface Valuation {
  id: string
  brand: string
  model: string
  year: number
  mileage: number
  condition: string
  transmission: string
  fuel_type?: string
  estimated_min: number
  estimated_max: number
  estimated_value: number
  contact_phone?: string
  created_at: string
}

export interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  type: 'buyer' | 'seller' | 'general'
  car_id?: string
  message?: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
  source?: string
  created_at: string
}

export interface Appointment {
  id: string
  name: string
  phone: string
  email?: string
  type: 'test_drive' | 'inspection' | 'purchase' | 'valuation'
  car_id?: string
  date: string
  time_slot: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
}

export interface UserProfile {
  id: string
  email?: string
  phone?: string
  full_name?: string
  avatar_url?: string
  role: 'user' | 'admin' | 'staff'
  created_at: string
}

export interface Favorite {
  id: string
  user_id: string
  car_id: string
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  title_bn?: string
  slug: string
  excerpt?: string
  excerpt_bn?: string
  content: string
  content_bn?: string
  cover_image?: string
  author?: string
  author_bn?: string
  category?: string
  category_bn?: string
  tags?: string[]
  published: boolean
  seo_title?: string
  seo_description?: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  car_id: string
  buyer_name?: string
  buyer_phone?: string
  sale_price: number
  purchase_price?: number
  profit?: number
  sale_date: string
  invoice_url?: string
  notes?: string
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  avatar?: string
  rating: number
  review: string
  review_bn?: string
  car_bought?: string
  car_bought_bn?: string
  date?: string
  verified: boolean
  created_at: string
}

// Frontend-only types
export interface CarFilter {
  brand?: string
  model?: string
  year_min?: number
  year_max?: number
  price_min?: number
  price_max?: number
  fuel_type?: string
  transmission?: string
  body_type?: string
  color?: string
  mileage_max?: number
  status?: string
  search?: string
  sort?: 'price_asc' | 'price_desc' | 'year_desc' | 'year_asc' | 'mileage_asc' | 'newest'
}

export interface CarWithImages extends Car {
  car_images?: CarImage[]
  inspection_reports?: InspectionReport[]
}

export const BRANDS = [
  'Toyota', 'Honda', 'Nissan', 'Mitsubishi', 'Mazda',
  'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Hyundai',
  'Kia', 'Suzuki', 'Subaru', 'Volkswagen', 'Ford',
] as const

export const BODY_TYPES = [
  { value: 'sedan', label: 'Sedan', label_bn: 'সেডান' },
  { value: 'suv', label: 'SUV', label_bn: 'এসইউভি' },
  { value: 'hatchback', label: 'Hatchback', label_bn: 'হ্যাচব্যাক' },
  { value: 'microbus', label: 'Microbus', label_bn: 'মাইক্রোবাস' },
  { value: 'pickup', label: 'Pickup', label_bn: 'পিকআপ' },
  { value: 'wagon', label: 'Wagon', label_bn: 'ওয়াগন' },
  { value: 'coupe', label: 'Coupe', label_bn: 'কুপে' },
] as const

export const FUEL_TYPES = [
  { value: 'petrol', label: 'Petrol', label_bn: 'পেট্রোল' },
  { value: 'diesel', label: 'Diesel', label_bn: 'ডিজেল' },
  { value: 'hybrid', label: 'Hybrid', label_bn: 'হাইব্রিড' },
  { value: 'electric', label: 'Electric', label_bn: 'ইলেকট্রিক' },
  { value: 'cng', label: 'CNG', label_bn: 'সিএনজি' },
] as const

export const TRANSMISSIONS = [
  { value: 'automatic', label: 'Automatic', label_bn: 'অটোমেটিক' },
  { value: 'manual', label: 'Manual', label_bn: 'ম্যানুয়াল' },
  { value: 'cvt', label: 'CVT', label_bn: 'সিভিটি' },
] as const

export const CONDITIONS = [
  { value: 'excellent', label: 'Excellent', label_bn: 'চমৎকার' },
  { value: 'good', label: 'Good', label_bn: 'ভালো' },
  { value: 'fair', label: 'Fair', label_bn: 'মোটামুটি' },
  { value: 'poor', label: 'Poor', label_bn: 'খারাপ' },
] as const
