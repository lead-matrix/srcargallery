import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Heart, Car, Calendar, LogOut, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MOCK_CARS } from '@/lib/mockData'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'favorites' | 'listings' | 'appointments'>('favorites')
  const [user, setUser] = useState<{ email: string, name: string, role: string } | null>(null)

  useEffect(() => {
    const session = localStorage.getItem('sr_user_session')
    if (!session) {
      navigate('/auth/login')
      return
    }
    setUser(JSON.parse(session))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('sr_user_session')
    navigate('/')
  }

  // Mock Dashboard data
  const favorites = MOCK_CARS.slice(0, 2)
  const sellRequests = [
    { id: 'req_1', model: 'Toyota Premio 2017', price: 2900000, status: 'Pending Inspection', date: '2026-06-20' }
  ]
  const appointments = [
    { id: 'apt_1', type: 'Test Drive', model: 'Honda Vezel 2019', date: '2026-06-25', time: '12:00 PM - 02:00 PM', location: 'Showroom' }
  ]

  if (!user) return null

  return (
    <>
      <Helmet>
        <title>User Dashboard | SR Car Gallery</title>
      </Helmet>

      <div className="pt-24 pb-16 bg-navy-950 text-white min-h-screen">
        <div className="container-custom">
          
          {/* Dashboard Header */}
          <div className="glass border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center font-bold text-xl text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="font-heading text-2xl font-black text-white">{user.name}</h1>
                <p className="text-sm text-platinum-400">{user.email} • Customer Portal</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              {user.role === 'admin' && (
                <Link to="/admin" className="btn-secondary py-2 px-4 text-sm inline-flex items-center">
                  Admin Console
                </Link>
              )}
              <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Log Out
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1 space-y-2">
              {[
                { id: 'favorites', label: 'Favorites', icon: Heart, count: favorites.length },
                { id: 'listings', label: 'My Sell Requests', icon: Car, count: sellRequests.length },
                { id: 'appointments', label: 'Appointments', icon: Calendar, count: appointments.length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-4 rounded-xl font-heading font-semibold text-sm transition-all flex items-center justify-between ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white shadow-glow-orange'
                      : 'glass border border-white/5 text-platinum-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                  {tab.count > 0 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-navy-950/80 text-orange-400' : 'bg-white/10 text-platinum-300'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Dashboard Content */}
            <div className="lg:col-span-3">
              {activeTab === 'favorites' && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold border-b border-white/5 pb-3">Saved Vehicles</h2>
                  {favorites.length === 0 ? (
                    <p className="text-sm text-platinum-500">No saved vehicles yet.</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {favorites.map(car => (
                        <div key={car.id} className="glass border border-white/10 rounded-2xl p-4 flex gap-4 items-center group">
                          <div className="w-28 h-20 rounded-xl overflow-hidden bg-navy-900 flex-shrink-0">
                            <img src={car.thumbnail_url} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-heading font-bold text-white text-sm line-clamp-1">{car.title}</h4>
                            <p className="text-xs text-orange-400 font-bold mt-1">BDT {(car.price / 100000).toFixed(1)} Lac</p>
                            <Link to={`/cars/${car.id}`} className="text-xs text-platinum-400 group-hover:text-orange-400 flex items-center gap-1 mt-2 transition-colors">
                              View Details <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'listings' && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold border-b border-white/5 pb-3">My Sell Requests</h2>
                  {sellRequests.length === 0 ? (
                    <p className="text-sm text-platinum-500">No requests submitted yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {sellRequests.map(req => (
                        <div key={req.id} className="glass border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <h4 className="font-heading font-bold text-white text-base">{req.model}</h4>
                            <p className="text-xs text-platinum-400 mt-1">Submitted on {req.date} • Expected: BDT {(req.price / 100000).toFixed(1)} Lac</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold bg-orange-500/20 text-orange-400 px-3 py-1.5 rounded-full border border-orange-500/30">
                              {req.status}
                            </span>
                            <Link to="/book-inspection" className="btn-primary py-1.5 px-4 text-xs font-semibold">
                              Schedule Inspection
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold border-b border-white/5 pb-3">Appointments</h2>
                  {appointments.length === 0 ? (
                    <p className="text-sm text-platinum-500">No upcoming appointments.</p>
                  ) : (
                    <div className="space-y-4">
                      {appointments.map(apt => (
                        <div key={apt.id} className="glass border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                              {apt.type}
                            </span>
                            <h4 className="font-heading font-bold text-white text-base mt-2">{apt.model}</h4>
                            <p className="text-xs text-platinum-400 mt-1">Date: {apt.date} • Time Slot: {apt.time}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-platinum-500">Location</div>
                            <div className="text-sm font-semibold text-white flex items-center gap-1.5 mt-0.5 justify-end">
                              <ShieldCheck className="w-4 h-4 text-emerald-400" />
                              {apt.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
