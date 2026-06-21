import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Grid, List, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CarCard from '@/components/cars/CarCard'
import { MOCK_CARS } from '@/lib/mockData'
import { BRANDS, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS } from '@/types/database'
import type { CarFilter } from '@/types/database'

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 25 }, (_, i) => currentYear - i)

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'year_desc', label: 'Year: Newest' },
  { value: 'mileage_asc', label: 'Lowest Mileage' },
]

export default function CarsPage() {
  const [filters, setFilters] = useState<CarFilter>({})
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [sort, setSort] = useState('newest')

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const setFilter = (key: keyof CarFilter, value: string | number | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }))
  }

  const clearFilters = () => {
    setFilters({})
    setSearch('')
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length + (search ? 1 : 0)

  const filtered = useMemo(() => {
    let cars = [...MOCK_CARS]

    if (search) {
      const s = search.toLowerCase()
      cars = cars.filter(c =>
        c.title.toLowerCase().includes(s) ||
        c.brand.toLowerCase().includes(s) ||
        c.model.toLowerCase().includes(s)
      )
    }

    if (filters.brand) cars = cars.filter(c => c.brand === filters.brand)
    if (filters.fuel_type) cars = cars.filter(c => c.fuel_type === filters.fuel_type)
    if (filters.transmission) cars = cars.filter(c => c.transmission === filters.transmission)
    if (filters.body_type) cars = cars.filter(c => c.body_type === filters.body_type)
    if (filters.year_min) cars = cars.filter(c => c.year >= (filters.year_min as number))
    if (filters.year_max) cars = cars.filter(c => c.year <= (filters.year_max as number))
    if (filters.price_min) cars = cars.filter(c => c.price >= (filters.price_min as number))
    if (filters.price_max) cars = cars.filter(c => c.price <= (filters.price_max as number))
    if (filters.mileage_max) cars = cars.filter(c => c.mileage <= (filters.mileage_max as number))

    switch (sort) {
      case 'price_asc': cars.sort((a, b) => a.price - b.price); break
      case 'price_desc': cars.sort((a, b) => b.price - a.price); break
      case 'year_desc': cars.sort((a, b) => b.year - a.year); break
      case 'mileage_asc': cars.sort((a, b) => a.mileage - b.mileage); break
      default: cars.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    return cars
  }, [filters, search, sort])

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-b border-white/8 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0">
      <h4 className="text-white font-semibold text-sm mb-3">{title}</h4>
      {children}
    </div>
  )

  const FilterSelect = ({
    value, onChange, options, placeholder,
  }: {
    value: string; onChange: (v: string) => void
    options: { value: string; label: string }[]; placeholder: string
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-dark w-full appearance-none pr-8"
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-500 pointer-events-none" />
    </div>
  )

  const Sidebar = () => (
    <div className="bg-navy-800 border border-white/8 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-white text-lg">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-orange-400 text-sm hover:text-orange-300 transition-colors flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      <FilterSection title="Brand">
        <FilterSelect
          value={filters.brand || ''}
          onChange={v => setFilter('brand', v)}
          options={BRANDS.map(b => ({ value: b, label: b }))}
          placeholder="All Brands"
        />
      </FilterSection>

      <FilterSection title="Body Type">
        <div className="grid grid-cols-2 gap-2">
          {BODY_TYPES.map(bt => (
            <button
              key={bt.value}
              onClick={() => setFilter('body_type', filters.body_type === bt.value ? '' : bt.value)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                filters.body_type === bt.value
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'border-white/10 text-platinum-400 hover:border-orange-500/30 hover:text-white'
              }`}
            >
              {bt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Fuel Type">
        <div className="space-y-2">
          {FUEL_TYPES.map(ft => (
            <label key={ft.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="fuel"
                value={ft.value}
                checked={filters.fuel_type === ft.value}
                onChange={() => setFilter('fuel_type', filters.fuel_type === ft.value ? '' : ft.value)}
                className="w-4 h-4 accent-orange-500"
              />
              <span className="text-sm text-platinum-300 group-hover:text-white transition-colors">
                {ft.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Transmission">
        <div className="space-y-2">
          {TRANSMISSIONS.map(t => (
            <label key={t.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="transmission"
                value={t.value}
                checked={filters.transmission === t.value}
                onChange={() => setFilter('transmission', filters.transmission === t.value ? '' : t.value)}
                className="w-4 h-4 accent-orange-500"
              />
              <span className="text-sm text-platinum-300 group-hover:text-white transition-colors">
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Year">
        <div className="grid grid-cols-2 gap-2">
          <FilterSelect
            value={String(filters.year_min || '')}
            onChange={v => setFilter('year_min', v ? parseInt(v) : undefined)}
            options={years.map(y => ({ value: String(y), label: String(y) }))}
            placeholder="Min Year"
          />
          <FilterSelect
            value={String(filters.year_max || '')}
            onChange={v => setFilter('year_max', v ? parseInt(v) : undefined)}
            options={years.map(y => ({ value: String(y), label: String(y) }))}
            placeholder="Max Year"
          />
        </div>
      </FilterSection>

      <FilterSection title="Price (BDT)">
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min ৳"
            value={filters.price_min || ''}
            onChange={e => setFilter('price_min', e.target.value ? parseInt(e.target.value) : undefined)}
          />
          <Input
            type="number"
            placeholder="Max ৳"
            value={filters.price_max || ''}
            onChange={e => setFilter('price_max', e.target.value ? parseInt(e.target.value) : undefined)}
          />
        </div>
      </FilterSection>

      <FilterSection title="Max Mileage (km)">
        <Input
          type="number"
          placeholder="e.g. 100000"
          value={filters.mileage_max || ''}
          onChange={e => setFilter('mileage_max', e.target.value ? parseInt(e.target.value) : undefined)}
        />
      </FilterSection>
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Used Cars for Sale in Dhaka | SR Car Gallery Bangladesh</title>
        <meta name="description" content="Browse our inventory of inspected used cars for sale in Dhaka. Toyota, Honda, Nissan, BMW, Mercedes and more. Competitive prices, inspection reports included." />
      </Helmet>

      <div className="min-h-screen bg-navy-900">
        {/* Page header */}
        <div className="bg-navy-800/50 border-b border-white/5 py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-heading text-4xl font-black text-white mb-2">
              Used Cars for Sale in Bangladesh
            </h1>
            <p className="text-platinum-400 font-bengali">বাংলাদেশে বিক্রয়যোগ্য সেকেন্ড হ্যান্ড গাড়ি</p>

            {/* Search bar */}
            <div className="mt-6 relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-platinum-500" />
              <Input
                type="text"
                placeholder="Search by brand, model, or keyword..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-12 h-13 text-base"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-platinum-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                  <span className="text-platinum-400 text-sm">
                    <span className="text-white font-semibold">{filtered.length}</span> vehicles found
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative hidden sm:block">
                    <select
                      value={sort}
                      onChange={e => setSort(e.target.value)}
                      className="input-dark py-2 text-sm pr-8 appearance-none"
                    >
                      {SORT_OPTIONS.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-platinum-500 pointer-events-none" />
                  </div>

                  <div className="flex border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setView('grid')}
                      className={`p-2.5 transition-colors ${view === 'grid' ? 'bg-orange-500 text-white' : 'text-platinum-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setView('list')}
                      className={`p-2.5 transition-colors ${view === 'list' ? 'bg-orange-500 text-white' : 'text-platinum-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile sidebar */}
              {sidebarOpen && (
                <div className="lg:hidden mb-6">
                  <Sidebar />
                </div>
              )}

              {/* Cars grid */}
              {filtered.length > 0 ? (
                <div className={`grid gap-6 ${view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {filtered.map((car, i) => (
                    <CarCard
                      key={car.id}
                      car={car}
                      index={i}
                      onFavorite={toggleFav}
                      isFavorited={favorites.has(car.id)}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">No cars found</h3>
                  <p className="text-platinum-400 mb-6">Try adjusting your filters or search terms.</p>
                  <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
