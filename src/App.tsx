import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

// Lazy-loaded pages for code splitting
const HomePage           = lazy(() => import('@/pages/HomePage'))
const CarsPage           = lazy(() => import('@/pages/CarsPage'))
const CarDetailPage      = lazy(() => import('@/pages/CarDetailPage'))
const SellPage           = lazy(() => import('@/pages/SellPage'))
const ValuationPage      = lazy(() => import('@/pages/ValuationPage'))
const BookInspectionPage = lazy(() => import('@/pages/BookInspectionPage'))
const ComparePage        = lazy(() => import('@/pages/ComparePage'))
const BlogPage           = lazy(() => import('@/pages/BlogPage'))
const BlogPostPage       = lazy(() => import('@/pages/BlogPostPage'))
const AboutPage          = lazy(() => import('@/pages/AboutPage'))
const ContactPage        = lazy(() => import('@/pages/ContactPage'))
const LoginPage          = lazy(() => import('@/pages/LoginPage'))
const RegisterPage       = lazy(() => import('@/pages/RegisterPage'))
const DashboardPage      = lazy(() => import('@/pages/DashboardPage'))
const AdminDashboard     = lazy(() => import('@/pages/AdminDashboard'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 rounded-full border-4 border-orange-500/30 border-t-orange-500 animate-spin" />
    </div>
  )
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isAuthRoute  = location.pathname.startsWith('/auth')

  return (
    <div className="flex flex-col min-h-screen bg-navy-900 text-white selection:bg-orange-500/30 selection:text-orange-300">
      {!isAdminRoute && !isAuthRoute && <Header />}
      <div className="flex-grow">{children}</div>
      {!isAdminRoute && !isAuthRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
    </div>
  )
}

function AppContent() {
  return (
    <LayoutWrapper>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"               element={<HomePage />} />
          <Route path="/cars"           element={<CarsPage />} />
          <Route path="/cars/:id"       element={<CarDetailPage />} />
          <Route path="/sell"           element={<SellPage />} />
          <Route path="/valuation"      element={<ValuationPage />} />
          <Route path="/book-inspection" element={<BookInspectionPage />} />
          <Route path="/compare"        element={<ComparePage />} />
          <Route path="/blog"           element={<BlogPage />} />
          <Route path="/blog/:slug"     element={<BlogPostPage />} />
          <Route path="/about"          element={<AboutPage />} />
          <Route path="/contact"        element={<ContactPage />} />
          <Route path="/auth/login"     element={<LoginPage />} />
          <Route path="/auth/register"  element={<RegisterPage />} />
          <Route path="/dashboard"      element={<DashboardPage />} />
          <Route path="/admin"          element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </LayoutWrapper>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  )
}
