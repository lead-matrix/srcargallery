import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, BookOpen, Clock, ArrowRight } from 'lucide-react'
import { MOCK_BLOG_POSTS } from '@/lib/mockData'

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(MOCK_BLOG_POSTS.map(p => p.category).filter((c): c is string => !!c)))]
  }, [])

  const filteredPosts = useMemo(() => {
    return MOCK_BLOG_POSTS.filter(post => {
      const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          (post.excerpt || '').toLowerCase().includes(search.toLowerCase())
      const matchCategory = activeCategory === 'All' || post.category === activeCategory
      return matchSearch && matchCategory
    })
  }, [search, activeCategory])

  return (
    <>
      <Helmet>
        <title>Blog & Resource Center | SR Car Gallery</title>
        <meta name="description" content="Read expert tips, car buying and selling guides, market pricing updates, and hybrid car maintenance guides for Dhaka, Bangladesh." />
      </Helmet>

      <div className="pt-24 pb-16 bg-navy-950 text-white min-h-screen">
        <div className="container-custom">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Expert Insights</span>
            <h1 className="font-heading text-4xl md:text-5xl font-black mt-3 mb-4">
              Our <span className="text-gradient">Blog & Resources</span>
            </h1>
            <p className="text-platinum-400 font-bengali">গাড়ি ক্রয়-বিক্রয় এবং রক্ষণাবেক্ষণের প্রয়োজনীয় টিপস ও নির্দেশিকা</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-dark pl-10 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex-shrink-0 ${
                    activeCategory === cat
                      ? 'border-orange-500 bg-orange-500/10 text-white'
                      : 'border-white/5 hover:border-white/10 text-platinum-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-platinum-400">
              No articles found matching your criteria.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/20 transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
                    <img 
                      src={post.cover_image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-navy-900/90 text-orange-400 text-[10px] font-bold px-3 py-1 rounded-full border border-orange-500/30 tracking-wider uppercase">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-platinum-500 mb-3">
                      <span>{post.created_at}</span>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs font-bengali text-platinum-400 mb-3 line-clamp-1">
                      {post.title_bn}
                    </p>

                    <p className="text-platinum-300 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 mt-auto group/link"
                    >
                      Read Article
                      <BookOpen className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  )
}
