import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, ShieldAlert, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdminRole, setIsAdminRole] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      setLoading(false)
      // Save simulated session details
      localStorage.setItem('sr_user_session', JSON.stringify({
        email,
        role: isAdminRole ? 'admin' : 'user',
        name: isAdminRole ? 'Admin Manager' : 'Sajid Mahmud'
      }))

      if (isAdminRole) {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    }, 1000)
  }

  return (
    <>
      <Helmet>
        <title>Login | SR Car Gallery</title>
      </Helmet>

      <div className="pt-24 pb-16 bg-navy-950 text-white min-h-screen flex items-center justify-center">
        <div className="container-custom max-w-md w-full">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass border border-white/10 rounded-3xl p-8 relative overflow-hidden space-y-6"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-700" />
            
            <div className="text-center space-y-2">
              <h1 className="font-heading text-3xl font-black text-white flex items-center justify-center gap-2">
                <LogIn className="w-6 h-6 text-orange-500" /> Login
              </h1>
              <p className="text-sm text-platinum-400">Access your dashboard or inventory</p>
            </div>

            {error && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-platinum-400 mb-1.5 uppercase font-bold tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="input-dark pl-10 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-platinum-400 mb-1.5 uppercase font-bold tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-dark pl-10 w-full"
                  />
                </div>
              </div>

              {/* Demo Account Role Selector */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                <span className="block text-xs font-bold text-orange-400 uppercase tracking-widest">Demo Access Role</span>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsAdminRole(false)}
                    className={`flex-1 py-2 px-3 rounded-lg border text-center text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                      !isAdminRole 
                        ? 'border-orange-500 bg-orange-500/10 text-white' 
                        : 'border-white/5 text-platinum-400'
                    }`}
                  >
                    {!isAdminRole && <Check className="w-3.5 h-3.5" />} User Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdminRole(true)}
                    className={`flex-1 py-2 px-3 rounded-lg border text-center text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                      isAdminRole 
                        ? 'border-orange-500 bg-orange-500/10 text-white' 
                        : 'border-white/5 text-platinum-400'
                    }`}
                  >
                    {isAdminRole && <Check className="w-3.5 h-3.5" />} Admin Console
                  </button>
                </div>
                <p className="text-[10px] text-platinum-500 leading-relaxed pt-1">
                  *Selecting a role updates the destination dashboard upon logging in (no password validation required for demo).
                </p>
              </div>

              <Button type="submit" disabled={loading} className="w-full py-3" size="lg">
                {loading ? 'Logging you in...' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center text-sm pt-4 border-t border-white/5">
              <span className="text-platinum-500">Don't have an account? </span>
              <Link to="/auth/register" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                Sign Up
              </Link>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  )
}
