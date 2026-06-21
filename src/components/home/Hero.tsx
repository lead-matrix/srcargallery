import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Zap, Phone, Search, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'

const stats = [
  { value: '500+', label: 'Cars Sold', label_bn: 'গাড়ি বিক্রি' },
  { value: '2000+', label: 'Happy Customers', label_bn: 'সন্তুষ্ট গ্রাহক' },
  { value: '98%', label: 'Satisfaction Rate', label_bn: 'সন্তুষ্টির হার' },
  { value: '3 Days', label: 'Avg. Sale Time', label_bn: 'গড় বিক্রয় সময়' },
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.6 ? '#FF6B35' : '#415693',
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 107, 53, ${(1 - dist / 120) * 0.08})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0')
        ctx.fill()
      })

      animId = requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero-gradient">
      {/* Animated particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60"
      />

      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left column */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass border border-orange-500/20 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-orange-300 text-sm font-medium">Dhaka's Most Trusted Car Gallery</span>
              <span className="text-platinum-500 text-sm font-bengali">| বিশ্বস্ত গাড়ির শোরুম</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6"
            >
              Buy Smart.{' '}
              <span className="text-gradient">Sell Fast.</span>
              <br />
              Drive Happy.
            </motion.h1>

            {/* Bengali headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bengali text-xl text-orange-300 mb-4"
            >
              স্মার্টভাবে কিনুন। দ্রুত বেচুন। সুখে চালান।
            </motion.p>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-platinum-300 text-lg leading-relaxed mb-8 max-w-xl"
            >
              SR Car Gallery buys quality used cars across Bangladesh and offers carefully inspected vehicles
              at competitive prices. Simple, transparent, and hassle-free.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button asChild size="xl" className="shadow-glow-orange">
                <Link to="/cars">
                  <Search className="w-5 h-5" />
                  View Cars
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link to="/sell">
                  <TrendingUp className="w-5 h-5" />
                  Sell Your Car
                </Link>
              </Button>
              <Button asChild size="xl" variant="glass">
                <Link to="/book-inspection">
                  <ShieldCheck className="w-5 h-5" />
                  Book Inspection
                </Link>
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: ShieldCheck, text: 'Inspected & Certified' },
                { icon: Zap, text: 'Same-Day Offer' },
                { icon: Phone, text: '24/7 WhatsApp Support' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-platinum-300 text-sm">
                  <Icon className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — Hero visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Main car image */}
              <div className="relative w-[520px] h-[340px] rounded-3xl overflow-hidden border border-white/10 shadow-card-hover">
                <img
                  src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80"
                  alt="Featured car at SR Car Gallery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />

                {/* Price badge */}
                <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-2 border border-white/10">
                  <div className="text-xs text-platinum-400">Toyota Premio 2018</div>
                  <div className="text-white font-bold text-lg">৳32 Lac</div>
                  <div className="text-emerald-400 text-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Certified Vehicle
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 glass rounded-2xl p-4 border border-white/10 shadow-glass"
              >
                <div className="text-2xl font-bold text-orange-400 font-heading">500+</div>
                <div className="text-xs text-platinum-400">Cars Sold</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 border border-white/10 shadow-glass"
              >
                <div className="text-2xl font-bold text-emerald-400 font-heading">98%</div>
                <div className="text-xs text-platinum-400">Satisfaction</div>
              </motion.div>

              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-orange-500/5 blur-xl -z-10 scale-110" />
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8 mt-8"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-6 px-4 glass hover:bg-white/8 transition-colors"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                className="font-heading text-3xl font-black text-white mb-1"
              >
                {stat.value}
              </motion.div>
              <div className="text-platinum-400 text-sm">{stat.label}</div>
              <div className="text-platinum-500 text-xs font-bengali">{stat.label_bn}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-platinum-500"
      >
        <span className="text-xs">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-orange-500 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
