import { Helmet } from 'react-helmet-async'
import Hero from '@/components/home/Hero'
import ServicesSection from '@/components/home/ServicesSection'
import BrandsCarousel from '@/components/home/BrandsCarousel'
import FeaturedCars from '@/components/home/FeaturedCars'
import HowItWorks from '@/components/home/HowItWorks'
import QuickValuation from '@/components/home/QuickValuation'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import BlogPreview from '@/components/home/BlogPreview'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>SR Car Gallery | Buy & Sell Used Cars in Dhaka, Bangladesh</title>
        <meta
          name="description"
          content="SR Car Gallery is Dhaka's trusted used car dealership. Buy inspected used cars or sell your car for the best market price. Toyota, Honda, BMW, Mercedes and more. Call +880 1401-238019."
        />
        <meta name="keywords" content="used cars for sale in Bangladesh, buy used cars in Dhaka, sell your car in Dhaka, car showroom in Dhaka, second hand cars Bangladesh, used Toyota Premio, used Toyota Axio, used Honda Vezel, best used car dealer Dhaka" />
        <link rel="canonical" href="https://srcargallery.autos" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            "name": "SR Car Gallery",
            "description": "Trusted used car dealership in Dhaka, Bangladesh",
            "url": "https://srcargallery.autos",
            "telephone": "+8801401238019",
            "email": "info@srcargallery.autos",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "D-19 B, Agargaon Taltola, Sher-E-Bangla Nagar",
              "addressLocality": "Dhaka",
              "postalCode": "1207",
              "addressCountry": "BD",
            },
            "openingHours": ["Sa-Th 09:00-19:00", "Fr 14:00-19:00"],
            "priceRange": "৳৳৳",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "200",
            },
          })}
        </script>
      </Helmet>

      <main>
        <Hero />
        <ServicesSection />
        <BrandsCarousel />
        <FeaturedCars />
        <HowItWorks />
        <QuickValuation />
        <TestimonialsSection />
        <BlogPreview />
      </main>
    </>
  )
}
