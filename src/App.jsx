import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import SplashScreen from './components/system/SplashScreen.jsx'
import FloatingActions from './components/FloatingActions.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import ServiceDetails from './pages/ServiceDetails.jsx'
import AdminAuthGuard from './components/admin/AdminAuthGuard.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import AdminProjects from './admin/AdminProjects.jsx'
import AdminProcess from './pages/admin/AdminProcess.jsx'
import AdminServices from './pages/admin/ServicesAdmin.jsx'
import AdminServiceForm from './pages/admin/ServiceForm.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import OurStandard from './pages/OurStandard.jsx'
import About from './pages/About.jsx'
import Testimonials from './pages/Testimonials.jsx'
import Contact from './pages/Contact.jsx'
import Admin from './pages/Admin.jsx'
import AdminStats from './admin/AdminStats.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  return (
    <SmoothScroll>
      <SplashScreen visible={loading} />
      <Header />
      <main className={`pt-[112px] transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-stats" element={<AdminStats />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/standard" element={<OurStandard />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminAuthGuard><AdminDashboard /></AdminAuthGuard>} />
          <Route path="/admin/projects" element={<AdminAuthGuard><AdminProjects /></AdminAuthGuard>} />
          <Route path="/admin/process" element={<AdminAuthGuard><AdminProcess /></AdminAuthGuard>} />
          <Route path="/admin/services" element={<AdminAuthGuard><AdminServices /></AdminAuthGuard>} />
          <Route path="/admin/services/new" element={<AdminAuthGuard><AdminServiceForm mode="new" /></AdminAuthGuard>} />
          <Route path="/admin/services/edit/:id" element={<AdminAuthGuard><AdminServiceForm mode="edit" /></AdminAuthGuard>} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </SmoothScroll>
  )
}