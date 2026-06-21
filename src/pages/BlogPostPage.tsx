import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Calendar, User, Share2, Link2, BookOpen } from 'lucide-react'
import { MOCK_BLOG_POSTS } from '@/lib/mockData'
import { Button } from '@/components/ui/button'

const samplePostDetails: Record<string, string> = {
  'how-to-check-used-car-before-buying-bangladesh': `
    <h3>1. Check the Exterior and Body Panels</h3>
    <p>Inspect the car in broad daylight. Look for paint mismatches, uneven panel gaps, and signs of repaint or denting. These often indicate previous accident history. Check for rust along the door edges, wheel arches, and floorboards.</p>
    
    <h3>2. Engine and Transmission Inspection</h3>
    <p>Open the hood and check for oil leaks, coolant quality, and sound levels. A clean engine bay might be an attempt to cover oil leaks. Start the engine and listen for any knocking sounds. Shift the gears; shifts should be smooth without lags or jerks.</p>
    
    <h3>3. Verify the Registration Documents</h3>
    <p>In Bangladesh, verifying paper trails is vital. Always verify:
    <ul>
      <li>Smart Card / Registration Certificate</li>
      <li>Tax Token validity</li>
      <li>Fitness Certificate</li>
      <li>Owner transfer history / Auction sheet (if imported recently)</li>
    </ul>
    Make sure the chassis and engine numbers match exactly with the smart card.</p>
    
    <h3>4. Take a Test Drive</h3>
    <p>Drive the vehicle on both smooth and broken roads in Dhaka. Turn off the music and listen to the suspension. Test the brakes at moderate speeds and check if the car pulls to one side.</p>
  `,
  'top-5-used-cars-dhaka-under-30-lac': `
    <h3>1. Toyota Axio (2015-2018)</h3>
    <p>Axio remains the absolute king of budget sedans in Bangladesh. With a fuel-efficient 1.5L hybrid engine, low maintenance costs, and amazing resale value, it is the safest pick under 25-30 Lac BDT.</p>
    
    <h3>2. Honda Grace (2015-2017)</h3>
    <p>If you want a more premium cabin, Grace is a phenomenal alternative to the Axio. It offers double-clutch hybrid transmission, more rear legroom, and a sporty look.</p>
    
    <h3>3. Toyota Fielder (2015-2018)</h3>
    <p>For families who need massive cargo space, Fielder wagon is unbeatable. It shares the same robust hybrid mechanics as Axio but adds estate-like practicality.</p>
    
    <h3>4. Nissan Note e-Power (2017-2019)</h3>
    <p>e-Power technology uses a petrol engine to generate electricity for electric motors. It offers EV-like instant torque and outstanding mileage, making it ideal for Dhaka traffic.</p>
  `,
  'best-price-selling-car-bangladesh': `
    <h3>1. Detail the Car Inside and Out</h3>
    <p>First impressions matter. Professional detailing can increase your car's valuation by BDT 50,000 to 1,00,000. Clean the engine bay, polish the exterior, and shampoo the interior seats.</p>
    
    <h3>2. Resolve Minor Mechanical Issues</h3>
    <p>Fix broken bulbs, loose suspension links, and worn-out wiper blades. Buyers will negotiate aggressively if they hear minor squeaks or notice dashboard warning lights.</p>
    
    <h3>3. Compile Complete Service Logs</h3>
    <p>Having a documented folder showing regular engine oil changes, spark plug replacements, and gear oil maintenance builds trust and supports a higher price.</p>
  `
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const post = MOCK_BLOG_POSTS.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="pt-24 pb-16 text-center text-white min-h-screen bg-navy-950 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold">Article not found</h2>
        <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
      </div>
    )
  }

  const relatedPosts = MOCK_BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2)
  const fullHtmlContent = samplePostDetails[post.slug] || `<p>${post.excerpt}</p>`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | SR Car Gallery Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="pt-24 pb-16 bg-navy-950 text-white min-h-screen">
        <div className="container-custom max-w-4xl mx-auto">
          
          {/* Breadcrumbs / Back button */}
          <Link to="/blog" className="inline-flex items-center text-sm text-platinum-400 hover:text-orange-400 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
          </Link>

          {/* Title & Metadata */}
          <div className="space-y-4 mb-8">
            <span className="bg-orange-500/10 text-orange-400 text-xs font-bold px-3 py-1 rounded-full border border-orange-500/20 tracking-wider uppercase">
              {post.category}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-black leading-tight text-white">
              {post.title}
            </h1>
            <p className="text-lg font-bengali text-platinum-400">
              {post.title_bn}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-platinum-500 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-orange-400" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-400" />
                <span>{post.created_at}</span>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <button onClick={handleCopyLink} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-platinum-400 hover:text-white transition-all">
                  <Link2 className="w-4 h-4" />
                </button>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-platinum-400 hover:text-white transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3.3 0-5 1.7-5 5v2z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Cover image */}
          <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-12 border border-white/10 bg-navy-900">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Article body */}
          <div className="prose prose-invert max-w-none mb-16 space-y-6 text-platinum-300 leading-relaxed text-base">
            <p className="text-lg font-semibold text-white mb-8 border-l-4 border-orange-500 pl-4">
              {post.excerpt}
            </p>
            <div 
              className="blog-detail-content space-y-6"
              dangerouslySetInnerHTML={{ __html: fullHtmlContent }} 
            />
          </div>

          {/* Custom style for styling HTML injection */}
          <style>{`
            .blog-detail-content h3 {
              font-family: 'Poppins', sans-serif;
              font-size: 1.5rem;
              font-weight: 700;
              color: white;
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            .blog-detail-content p {
              margin-bottom: 1.25rem;
            }
            .blog-detail-content ul {
              list-style-type: disc;
              padding-left: 1.5rem;
              margin-bottom: 1.25rem;
            }
            .blog-detail-content li {
              margin-bottom: 0.5rem;
            }
          `}</style>

          {/* Related Articles */}
          <div className="border-t border-white/10 pt-12">
            <h3 className="font-heading text-2xl font-bold mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map(p => (
                <div key={p.id} className="glass border border-white/5 rounded-2xl p-6 flex gap-4 items-center">
                  <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-navy-900">
                    <img src={p.cover_image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">{p.category}</span>
                    <h4 className="font-heading font-bold text-white text-sm line-clamp-2 mt-1 hover:text-orange-400 transition-colors">
                      <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
