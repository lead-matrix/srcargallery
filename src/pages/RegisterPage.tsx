import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserPlus, User, Mail, Phone, Lock, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      // Save simulated user details
      localStorage.setItem('sr_user_session', JSON.stringify({
        email,
        role: 'user',
        name
      }))
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <>
      <Helmet>
        <title>Register | SR Car Gallery</title>
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
                <UserPlus className="w-6 h-6 text-orange-500" /> Register
              </h1>
              <p className="text-sm text-platinum-400">Create your account to save favorites and track sales</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs text-platinum-400 mb-1.5 uppercase font-bold tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Sajid Mahmud"
                    className="input-dark pl-10 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-platinum-400 mb-1.5 uppercase font-bold tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="sajid@example.com"
                    className="input-dark pl-10 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-platinum-400 mb-1.5 uppercase font-bold tracking-wider">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. 01712345678"
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

              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" required className="mt-1 accent-orange-500" id="terms" />
                <label htmlFor="terms" className="text-xs text-platinum-400 leading-relaxed cursor-pointer">
                  I agree to the Terms of Service and Privacy Policy, including automatic car verification checks.
                </label>
              </div>

              <Button type="submit" disabled={loading} className="w-full py-3" size="lg">
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>

            <div className="text-center text-sm pt-4 border-t border-white/5">
              <span className="text-platinum-500">Already have an account? </span>
              <Link to="/auth/login" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                Sign In
              </Link>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  )
}
