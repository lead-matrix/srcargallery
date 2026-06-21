import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import { MOCK_BLOG_POSTS } from '@/lib/mockData'

export default function BlogPreview() {
  return (
    <section className="section-padding bg-navy-900 border-t border-white/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-16"
        >
          <div>
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Expert Insights</span>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-white mt-3 mb-2">
              From Our <span className="text-gradient">Blog</span>
            </h2>
            <p className="text-platinum-400 font-bengali">গাড়ি কেনাবেচার নির্দেশিকা এবং বাজারের আপডেট</p>
          </div>
          <Link
            to="/blog"
            className="hidden md:flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-semibold"
          >
            Read All Articles
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
              className="glass rounded-2xl overflow-hidden border border-white/10 group hover:border-orange-500/20 transition-all duration-300 flex flex-col h-full"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-navy-900/90 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-500/30">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-platinum-500 mb-3">
                  <span>{post.created_at}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm font-bengali text-platinum-400 mb-4 line-clamp-1">
                  {post.title_bn}
                </p>

                <p className="text-platinum-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 mt-auto group/btn"
                >
                  Read Full Article
                  <BookOpen className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link
            to="/blog"
            className="btn-primary inline-flex items-center gap-2"
          >
            Read All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
