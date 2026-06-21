import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts'
import { 
  Users, Car, ShieldAlert, CircleDollarSign, Plus, CheckCircle, 
  Trash2, FileText, ChevronRight, LogOut, ArrowLeft, ArrowUpRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MOCK_CARS } from '@/lib/mockData'
import type { CarWithImages } from '@/types/database'

const analyticsData = [
  { month: 'Jan', sales: 4500000, profit: 450000 },
  { month: 'Feb', sales: 6200000, profit: 580000 },
  { month: 'Mar', sales: 8800000, profit: 820000 },
  { month: 'Apr', sales: 11000000, profit: 1100000 },
  { month: 'May', sales: 9500000, profit: 900000 },
  { month: 'Jun', sales: 12500000, profit: 1250000 }
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'leads' | 'appointments'>('overview')
  const [cars, setCars] = useState(MOCK_CARS)
  const [leads, setLeads] = useState([
    { id: 'l_1', name: 'Tanvir Rahman', phone: '01712345678', model: 'Toyota Premio 2018', expected: 3200000, status: 'New' },
    { id: 'l_2', name: 'Farhan Ahmed', phone: '01898765432', model: 'Honda Vezel 2019', expected: 4100000, status: 'Reviewed' }
  ])
  const [appointments, setAppointments] = useState([
    { id: 'ap_1', name: 'Asif Chowdhury', phone: '01911223344', car: 'Toyota Noah 2017', date: '2026-06-25', time: '10:00 AM - 12:00 PM', status: 'Pending' }
  ])
  
  useEffect(() => {
    const session = localStorage.getItem('sr_user_session')
    if (!session || JSON.parse(session).role !== 'admin') {
      navigate('/auth/login')
      return
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('sr_user_session')
    navigate('/')
  }

  const handleDeleteCar = (id: string) => {
    setCars(prev => prev.filter(c => c.id !== id))
  }

  const handleToggleStatus = (id: string) => {
    setCars(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'available' ? 'reserved' : c.status === 'reserved' ? 'sold' : 'available'
        return { ...c, status: nextStatus }
      }
      return c
    }))
  }

  const handleAddMockCar = () => {
    const newId = (cars.length + 1).toString()
    const newCar: CarWithImages = {
      id: newId,
      title: `Toyota Axio ${newId}`,
      title_bn: `টয়োটা অ্যাক্সিও ${newId}`,
      brand: 'Toyota',
      model: 'Axio',
      year: 2018,
      price: 2600000,
      negotiable: true,
      status: 'available' as const,
      body_type: 'sedan',
      fuel_type: 'hybrid',
      transmission: 'automatic',
      mileage: 38000,
      color: 'White',
      engine_cc: 1500,
      seats: 5,
      registration_year: 2019,
      tax_token_valid: true,
      fitness_valid: true,
      insurance_valid: true,
      ownership_count: 1,
      accident_history: false,
      certified: true,
      just_arrived: true,
      featured: false,
      thumbnail_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      description: 'Newly added mock car for dashboard demo.',
      car_images: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setCars(prev => [newCar, ...prev])
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0
    }).format(val)
  }

  return (
    <>
      <Helmet>
        <title>Admin Console | SR Car Gallery</title>
      </Helmet>

      <div className="pt-24 pb-16 bg-navy-950 text-white min-h-screen">
        <div className="container-custom">
          
          {/* Header */}
          <div className="glass border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center font-bold text-white shadow-glow-orange">
                AC
              </div>
              <div>
                <h1 className="font-heading text-2xl font-black text-white">Admin Console</h1>
                <p className="text-sm text-platinum-400">SR Car Gallery Management Portal</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link to="/dashboard" className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Client Dashboard
              </Link>
              <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Log Out
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Total Revenue', value: '৳ 5.25 Crore', sub: 'Last 6 Months', icon: CircleDollarSign },
              { label: 'Net Profit', value: '৳ 51.2 Lakh', sub: 'Last 6 Months', icon: ArrowUpRight },
              { label: 'Total Inventory', value: `${cars.length} Cars`, sub: 'Active Showcase', icon: Car },
              { label: 'Total CRM Leads', value: `${leads.length} Leads`, sub: 'Awaiting valuation', icon: Users }
            ].map((stat, idx) => (
              <div key={idx} className="glass border border-white/5 p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-platinum-400 uppercase font-bold tracking-wider">{stat.label}</span>
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    <stat.icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-black text-white">{stat.value}</h3>
                <p className="text-[10px] text-platinum-500 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1 space-y-2">
              {[
                { id: 'overview', label: 'Overview Analytics', icon: ArrowUpRight },
                { id: 'inventory', label: 'Inventory (CMS)', icon: Car },
                { id: 'leads', label: 'Valuation Leads', icon: Users },
                { id: 'appointments', label: 'Appointments', icon: CheckCircle }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-4 rounded-xl font-heading font-semibold text-sm transition-all flex items-center gap-3 ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white shadow-glow-orange'
                      : 'glass border border-white/5 text-platinum-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-4 glass border border-white/5 rounded-3xl p-6 md:p-8">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="font-heading text-xl font-bold border-b border-white/5 pb-3">Monthly Sales & Profits</h2>
                    <p className="text-sm text-platinum-400 mt-2">Historical reporting for showroom performance</p>
                  </div>
                  
                  <div className="h-80 bg-navy-950/40 p-4 rounded-2xl border border-white/5">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#ff6b35" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                        <XAxis dataKey="month" stroke="#aaa" />
                        <YAxis stroke="#aaa" />
                        <Tooltip contentStyle={{ backgroundColor: '#0e1220', borderColor: '#222', color: '#fff' }} />
                        <Area type="monotone" dataKey="sales" name="Sales (BDT)" stroke="#ff6b35" fillOpacity={1} fill="url(#colorSales)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* TAB 2: INVENTORY */}
              {activeTab === 'inventory' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <div>
                      <h2 className="font-heading text-xl font-bold">Showroom Inventory</h2>
                      <p className="text-sm text-platinum-400 mt-1">Manage vehicles visible to website visitors</p>
                    </div>
                    <Button onClick={handleAddMockCar} size="sm" className="flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Add Mock Car
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-platinum-400 font-bold">
                          <th className="py-3 px-4">Title</th>
                          <th className="py-3 px-4">Price</th>
                          <th className="py-3 px-4">Mileage</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cars.map(car => (
                          <tr key={car.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                            <td className="py-3 px-4 font-semibold text-white">{car.title}</td>
                            <td className="py-3 px-4 text-orange-400 font-bold">{(car.price / 100000).toFixed(1)} Lac</td>
                            <td className="py-3 px-4 text-platinum-300">{car.mileage.toLocaleString()} km</td>
                            <td className="py-3 px-4">
                              <button 
                                onClick={() => handleToggleStatus(car.id)}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                                  car.status === 'available'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : car.status === 'reserved'
                                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                              >
                                {car.status}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button 
                                onClick={() => handleDeleteCar(car.id)}
                                className="p-1.5 rounded-lg bg-red-950/20 text-red-400 hover:bg-red-900/40 hover:text-red-300 border border-red-500/20 transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: LEADS */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-xl font-bold border-b border-white/5 pb-3">AI Valuation Requests</h2>
                    <p className="text-sm text-platinum-400 mt-2">Incoming seller requests submitted from the web site form</p>
                  </div>

                  <div className="space-y-4">
                    {leads.map(lead => (
                      <div key={lead.id} className="glass border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h4 className="font-heading font-bold text-white text-base">{lead.model}</h4>
                          <p className="text-xs text-platinum-400 mt-1">Submitted by: {lead.name} ({lead.phone})</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-orange-400 font-bold">Expected BDT {(lead.expected / 100000).toFixed(1)} Lac</span>
                          <span className="text-[10px] font-bold bg-white/10 text-platinum-300 px-2.5 py-1 rounded-full">
                            {lead.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: APPOINTMENTS */}
              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-xl font-bold border-b border-white/5 pb-3">Test Drive & Inspection bookings</h2>
                    <p className="text-sm text-platinum-400 mt-2">Scheduled appointments at showrooms or mobile locations</p>
                  </div>

                  <div className="space-y-4">
                    {appointments.map(apt => (
                      <div key={apt.id} className="glass border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h4 className="font-heading font-bold text-white text-base">{apt.car}</h4>
                          <p className="text-xs text-platinum-400 mt-1">Customer: {apt.name} ({apt.phone}) • Slot: {apt.date} ({apt.time})</p>
                        </div>
                        <div>
                          <span className="text-xs font-bold bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/20">
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </>
  )
}
