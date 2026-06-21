import { motion } from 'framer-motion'
import { useLanguageStore } from '@/store/languageStore'

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
  { name: 'Hybrid', models: 'All Hybrid Vehicles', models_bn: 'সকল হাইব্রিড গাড়ি' },
]

export default function BrandsCarousel() {
  const { lang } = useLanguageStore()
  const bn = lang === 'bn'

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
          <span className={`text-orange-400 text-sm font-semibold tracking-widest uppercase ${bn ? 'font-bengali' : ''}`}>
            {bn ? 'আমরা কিনি এবং বিক্রি করি' : 'We Buy & Sell'}
          </span>
          <h2 className={`font-heading text-3xl md:text-4xl font-black text-white mt-3 mb-2 ${bn ? 'font-bengali' : ''}`}>
            {bn ? 'আমাদের সংগ্রহে থাকা প্রিমিয়াম ব্র্যান্ডসমূহ' : 'Premium Brands We Carry'}
          </h2>
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
                <div className={`text-platinum-500 text-xs mt-1 ${bn ? 'font-bengali' : ''}`}>
                  {bn && (brand as any).models_bn ? (brand as any).models_bn : brand.models}
                </div>
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
