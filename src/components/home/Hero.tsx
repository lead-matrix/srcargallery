import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Zap, Phone, Search, TrendingUp, Sparkles, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'
import { useLanguageStore } from '@/store/languageStore'
import { t } from '@/lib/translations'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { lang } = useLanguageStore()
  const tr = t[lang]

  const stats = [
    { value: '500+', label: tr.hero_stat_sold },
    { value: '2000+', label: tr.hero_stat_happy },
    { value: '98%', label: lang === 'bn' ? 'সন্তুষ্টির হার' : 'Satisfaction Rate' },
    { value: '3 Days', label: lang === 'bn' ? 'গড় বিক্রয় সময়' : 'Avg. Sale Time' },
  ]

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

    // Keep particles sparse and elegant for a clean light showroom look
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.15,
        color: Math.random() > 0.6 ? '#B8943F' : '#0A1628',
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(184, 148, 63, ${(1 - dist / 150) * 0.12})`
            ctx.lineWidth = 0.6
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
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#FAF8F4] via-[#F4EFE6] to-[#FAF8F4]">
      {/* Elegant background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-70 pointer-events-none" />
      
      {/* Animated particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40"
      />

      {/* Showroom Ambient Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#B8943F]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#0A1628]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-16 pb-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - 7 cols on large screens */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Launch Announcement + Verified Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center gap-2 bg-white/80 border border-[#B8943F]/30 rounded-full px-4 py-1.5 mb-6 w-max shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[#0A1628] text-xs font-bold font-heading tracking-wider uppercase flex items-center gap-1">
                {lang === 'bn' ? "নতুন লঞ্চ" : "New Showroom Launch"}
              </span>
              <span className="text-[#B8943F] text-xs font-black px-1.5 py-0.5 rounded bg-[#B8943F]/10 flex items-center gap-0.5 border border-[#B8943F]/20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8943F] fill-current" />
                {lang === 'bn' ? "যাচাইকৃত ডিলার" : "100% Verified"}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`font-heading text-5xl sm:text-6xl md:text-7xl font-black text-[#0A1628] leading-[1.05] mb-6 tracking-tight ${lang === 'bn' ? 'font-bengali' : ''}`}
            >
              {lang === 'bn' ? (
                <>স্মার্টভাবে কিনুন।{' '}<span className="text-gradient">দ্রুত বেচুন।</span><br />সুখে চালান।</>
              ) : (
                <>Buy Smart.{' '}<span className="text-gradient">Sell Fast.</span><br />Drive Luxury.</>
              )}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className={`text-[#3D4460] text-base sm:text-lg leading-relaxed mb-8 max-w-xl ${lang === 'bn' ? 'font-bengali' : ''}`}
            >
              {lang === 'bn' 
                ? "আমাদের কার শো-রুমের প্রতিটি গাড়ি কঠোরভাবে পরীক্ষা করা এবং প্রত্যয়িত। স্বচ্ছ ইতিহাস এবং শতভাগ নির্ভরতার সাথে ঢাকার অন্যতম সেরা কালেকশন ব্রাউজ করুন।" 
                : "Experience Bangladesh's premier luxury automotive showroom. Browse verified, multi-point inspected vehicles with transparent pricing and instant home-delivery options."}
            </motion.p>

            {/* Tactile, premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button asChild size="lg" className="btn-primary hover:shadow-lg">
                <Link to="/cars" className={lang === 'bn' ? 'font-bengali' : ''}>
                  <Search className="w-5 h-5 text-white" />
                  {tr.hero_btn_buy}
                </Link>
              </Button>
              <Button asChild size="lg" className="btn-gold hover:shadow-lg">
                <Link to="/sell" className={lang === 'bn' ? 'font-bengali' : ''}>
                  <TrendingUp className="w-5 h-5" />
                  {tr.hero_btn_sell}
                </Link>
              </Button>
              <Button asChild size="lg" className="btn-glass-light border-[#B8943F]/35 hover:bg-white/90">
                <Link to="/book-inspection" className={lang === 'bn' ? 'font-bengali' : ''}>
                  <ShieldCheck className="w-5 h-5 text-[#B8943F]" />
                  {tr.hero_btn_inspect}
                </Link>
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap gap-6 border-t border-[#B8943F]/15 pt-6"
            >
              {[
                { icon: ShieldCheck, en: '100% Inspected & Certified', bn: '১০০% পরিদর্শিত ও প্রত্যয়িত' },
                { icon: Zap, en: 'Same-Day Cash Valuation', bn: 'একই দিনে ক্যাশ ভ্যালুয়েশন' },
                { icon: Award, en: 'Official Warranty & Support', bn: 'অফিসিয়াল ওয়ারেন্টি ও সাপোর্ট' },
              ].map(({ icon: Icon, en, bn }) => (
                <div key={en} className="flex items-center gap-2 text-[#3D4460] text-sm font-medium">
                  <Icon className="w-4 h-4 text-[#B8943F] flex-shrink-0" />
                  <span className={lang === 'bn' ? 'font-bengali' : ''}>{lang === 'bn' ? bn : en}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - 5 cols, featuring the Showroom stage visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[480px]">
              
              {/* Showroom Platform Stage */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[110%] h-12 bg-gradient-to-t from-black/20 via-black/5 to-transparent blur-md rounded-full -z-10" />
              
              {/* Main Showcase Image */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#B8943F]/20 shadow-2xl bg-white p-2">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80"
                    alt="Luxury Mercedes Benz Showroom at SR Car Gallery"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Verified tag corner */}
                  <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 fill-current" />
                    Verified Active
                  </div>
                </div>

                {/* Info Bar */}
                <div className="p-4 bg-white flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#8C8C8C] tracking-wide uppercase">Featured Premium</div>
                    <div className="text-[#0A1628] font-bold text-base">Mercedes-Benz C-Class</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#8C8C8C] line-through">৳72 Lac</div>
                    <div className="text-[#B8943F] font-black text-lg">৳68 Lac</div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card 1 - Gold themed */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-5 bg-white border border-[#B8943F]/30 rounded-2xl p-4 shadow-xl z-20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#B8943F]/10 flex items-center justify-center text-[#B8943F]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-black text-[#0A1628] font-heading">500+</div>
                  <div className={`text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wider ${lang === 'bn' ? 'font-bengali' : ''}`}>
                    {tr.hero_stat_sold}
                  </div>
                </div>
              </motion.div>

              {/* Floating Stat Card 2 - Blue themed */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                className="absolute -bottom-5 -left-5 bg-white border border-[#B8943F]/25 rounded-2xl p-4 shadow-xl z-20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-black text-[#0A1628] font-heading">98%</div>
                  <div className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wider">
                    {lang === 'bn' ? 'সন্তুষ্টি' : 'Satisfaction'}
                  </div>
                </div>
              </motion.div>

              {/* Decorative design details */}
              <div className="absolute inset-0 rounded-2xl border border-[#B8943F]/10 scale-105 pointer-events-none -z-10" />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#B8943F]/20 rounded-xl overflow-hidden border border-[#B8943F]/20 mt-12 shadow-md"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-5 px-4 bg-white hover:bg-[#FAF8F4] transition-colors"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.65 + i * 0.1 }}
                className="font-heading text-3xl font-black text-[#0A1628] mb-0.5"
              >
                {stat.value}
              </motion.div>
              <div className={`text-[#8C8C8C] text-xs font-bold uppercase tracking-wider text-center ${lang === 'bn' ? 'font-bengali' : ''}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#8C8C8C] pointer-events-none"
      >
        <span className={`text-[10px] font-bold uppercase tracking-widest ${lang === 'bn' ? 'font-bengali' : ''}`}>
          {lang === 'bn' ? 'শোরুম এক্সপ্লোর করুন' : 'Explore Showroom'}
        </span>
        <div className="w-5 h-8 rounded-full border border-[#8C8C8C]/40 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-[#B8943F] rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
