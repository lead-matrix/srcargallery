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
    <section className="py-16 bg-[#FAF8F4] border-y border-[#B8943F]/15 overflow-hidden">
      <div className="container-custom mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className={`text-[#B8943F] text-xs font-bold tracking-widest uppercase ${bn ? 'font-bengali' : ''} flex items-center justify-center gap-2`}>
            <span className="w-1 h-1 rounded-full bg-[#B8943F]" />
            {bn ? 'আমরা কিনি এবং বিক্রি করি' : 'We Buy & Sell'}
            <span className="w-1 h-1 rounded-full bg-[#B8943F]" />
          </span>
          <h2 className={`font-heading text-3xl md:text-4xl font-black text-[#0A1628] mt-3 mb-2 ${bn ? 'font-bengali' : ''}`}>
            {bn ? 'আমাদের সংগ্রহে থাকা প্রিমিয়াম ব্র্যান্ডসমূহ' : 'Premium Brands We Carry'}
          </h2>
        </motion.div>
      </div>

      {/* Infinite scroll track */}
      <div className="relative">
        <div className="flex gap-4 animate-[scroll_35s_linear_infinite] w-max">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 bg-white border border-[#B8943F]/12 rounded-xl px-6 py-4 min-w-[200px] hover:border-[#B8943F]/45 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="text-center">
                <div className="font-heading font-extrabold text-[#0A1628] text-lg group-hover:text-[#B8943F] transition-colors">
                  {brand.name}
                </div>
                <div className={`text-[#6B7280] text-xs mt-1 font-medium ${bn ? 'font-bengali' : ''}`}>
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
