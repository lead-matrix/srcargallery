import { motion } from 'framer-motion'
import { useRef } from 'react'

const brands = [
  { name: 'Toyota', models: 'Premio, Axio, Noah, Prado, Vitz' },
  { name: 'Honda', models: 'Vezel, Fit, CR-V, HR-V, Grace' },
  { name: 'Nissan', models: 'X-Trail, Note, Serena, March' },
  { name: 'Mitsubishi', models: 'Outlander, Pajero, Eclipse' },
  { name: 'Mazda', models: 'CX-5, CX-3, Atenza, Axela' },
  { name: 'BMW', models: '3 Series, 5 Series, X3, X5' },
  { name: 'Mercedes', models: 'C-Class, E-Class, GLC, GLE' },
  { name: 'Audi', models: 'A4, A6, Q5, Q7' },
  { name: 'Lexus', models: 'RX, NX, IS, ES' },
  { name: 'Hyundai', models: 'Tucson, Sonata, Santa Fe' },
  { name: 'Suzuki', models: 'Swift, Alto, Baleno' },
  { name: 'Hybrid', models: 'All Hybrid Vehicles' },
]

const brandLogos: Record<string, string> = {
  Toyota: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/200px-Toyota_carlogo.svg.png',
  Honda: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/200px-Honda.svg.png',
  Nissan: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Nissan_2020_logo.svg/200px-Nissan_2020_logo.svg.png',
  Mitsubishi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mitsubishi_logo.svg/200px-Mitsubishi_logo.svg.png',
  Mazda: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Mazda_logo_with_text.svg/200px-Mazda_logo_with_text.svg.png',
  BMW: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/200px-BMW.svg.png',
  Mercedes: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/200px-Mercedes-Logo.svg.png',
  Audi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Audi-Logo_2016.svg/200px-Audi-Logo_2016.svg.png',
  Lexus: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Lexus_divisional_emblem.svg/200px-Lexus_divisional_emblem.svg.png',
  Hyundai: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Hyundai_Motor_Company_logo.svg/200px-Hyundai_Motor_Company_logo.svg.png',
  Suzuki: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/200px-Suzuki_logo_2.svg.png',
  Hybrid: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/EV_plug_icon.svg/200px-EV_plug_icon.svg.png',
}

export default function BrandsCarousel() {
  return (
    <section className="py-16 bg-navy-800/50 border-y border-white/5 overflow-hidden">
      <div className="container-custom mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">We Buy & Sell</span>
          <h2 className="font-heading text-3xl md:text-4xl font-black text-white mt-3 mb-2">
            Premium Brands We Carry
          </h2>
          <p className="text-platinum-400 font-bengali">আমরা যে সকল ব্র্যান্ডের গাড়ি কিনি এবং বিক্রি করি</p>
        </motion.div>
      </div>

      {/* Infinite scroll track */}
      <div className="relative">
        <div className="flex gap-4 animate-[scroll_30s_linear_infinite] w-max">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 glass border border-white/8 rounded-2xl px-6 py-4 min-w-[180px] hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300 group cursor-pointer"
            >
              <div className="text-center">
                <div className="font-heading font-bold text-white text-lg group-hover:text-orange-400 transition-colors">
                  {brand.name}
                </div>
                <div className="text-platinum-500 text-xs mt-1">{brand.models}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
