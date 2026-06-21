import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const STORAGE_BUCKETS = {
  CAR_IMAGES: 'car-images',
  INSPECTION_DOCS: 'inspection-docs',
  SELL_IMAGES: 'sell-request-images',
  REGISTRATION_CARDS: 'registration-cards',
} as const
