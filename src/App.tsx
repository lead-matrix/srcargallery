import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import HomePage from '@/pages/HomePage'
import CarsPage from '@/pages/CarsPage'
import CarDetailPage from '@/pages/CarDetailPage'
import SellPage from '@/pages/SellPage'
import ValuationPage from '@/pages/ValuationPage'
import BookInspectionPage from '@/pages/BookInspectionPage'
import ComparePage from '@/pages/ComparePage'
import BlogPage from '@/pages/BlogPage'
import BlogPostPage from '@/pages/BlogPostPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import AdminDashboard from '@/pages/AdminDashboard'

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isAuthRoute = location.pathname.startsWith('/auth')

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/valuation" element={<ValuationPage />} />
        <Route path="/book-inspection" element={<BookInspectionPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
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
