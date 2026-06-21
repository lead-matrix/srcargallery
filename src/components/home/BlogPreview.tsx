import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import { MOCK_BLOG_POSTS } from '@/lib/mockData'
import { useLanguageStore } from '@/store/languageStore'
import { t } from '@/lib/translations'

export default function BlogPreview() {
  const { lang } = useLanguageStore()
  const tr = t[lang]
  const bn = lang === 'bn'

  return (
    <section className="section-padding bg-[#FAF8F4] border-t border-[#B8943F]/15">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-16"
        >
          <div>
            <span className={`text-[#B8943F] text-xs font-bold tracking-widest uppercase ${bn ? 'font-bengali' : ''} flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8943F]" />
              {bn ? 'বিশেষজ্ঞদের পরামর্শ' : 'Expert Insights'}
            </span>
            <h2 className={`font-heading text-4xl md:text-5xl font-black text-[#0A1628] mt-3 mb-2 ${bn ? 'font-bengali' : ''}`}>
              {bn ? (
                <>আমাদের <span className="text-gradient">ব্লগ থেকে</span></>
              ) : (
                <>From Our <span className="text-gradient">Blog</span></>
              )}
            </h2>
          </div>
          <Link
            to="/blog"
            className={`hidden md:flex items-center gap-2 text-[#9E7A38] hover:text-[#0A1628] transition-colors font-bold ${bn ? 'font-bengali' : ''}`}
          >
            {tr.blog_view_all}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {MOCK_BLOG_POSTS.slice(0, 3).map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#B8943F]/12 group hover:border-[#B8943F]/40 transition-all duration-300 flex flex-col h-full hover:shadow-md"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`bg-white/95 text-[#9E7A38] text-xs font-bold px-3 py-1.5 rounded-full border border-[#B8943F]/25 shadow-sm ${bn ? 'font-bengali' : ''}`}>
                    {bn && post.category_bn ? post.category_bn : post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className={`flex items-center gap-4 text-xs text-[#6B7280] font-semibold mb-3 ${bn ? 'font-bengali' : ''}`}>
                  <span>{post.created_at}</span>
                  <span>•</span>
                  <span>{bn && post.author_bn ? post.author_bn : post.author}</span>
                </div>

                <h3 className={`font-heading text-xl font-bold text-[#0A1628] mb-4 line-clamp-2 group-hover:text-[#B8943F] transition-colors ${bn ? 'font-bengali' : ''}`}>
                  {bn && post.title_bn ? post.title_bn : post.title}
                </h3>

                <p className={`text-[#3D4460] text-sm leading-relaxed mb-6 line-clamp-3 flex-grow ${bn ? 'font-bengali' : ''}`}>
                  {bn && post.excerpt_bn ? post.excerpt_bn : post.excerpt}
                </p>

                <Link
                  to={`/blog/${post.slug}`}
                  className={`inline-flex items-center gap-2 text-sm font-bold text-[#9E7A38] hover:text-[#0A1628] mt-auto group/btn ${bn ? 'font-bengali' : ''}`}
                >
                  {bn ? 'সম্পূর্ণ নিবন্ধ পড়ুন' : 'Read Full Article'}
                  <BookOpen className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link
            to="/blog"
            className={`btn-primary inline-flex items-center gap-2 ${bn ? 'font-bengali' : ''}`}
          >
            {tr.blog_view_all}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
