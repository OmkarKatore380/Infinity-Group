import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getServiceBySlug } from '../services/servicesService.js'
import SeoHead from '../components/SeoHead.jsx'

export default function ServiceDetails() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
    getServiceBySlug(slug).then((s) => {
      if (!mounted) return
      setService(s)
      setLoaded(true)
      if (s?.seo?.title) document.title = s.seo.title
      if (s?.seo?.description) {
        let meta = document.querySelector('meta[name="description"]')
        if (!meta) {
          meta = document.createElement('meta')
          meta.setAttribute('name', 'description')
          document.head.appendChild(meta)
        }
        meta.setAttribute('content', s.seo.description)
      }
    })
    return () => {
      mounted = false
    }
  }, [slug])

  if (!loaded) {
    return (
      <div className="container-pro py-20">
        <p className="text-slate-600">Loading service...</p>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="container-pro py-20">
        <h1 className="heading-lg">Service Not Found</h1>
        <p className="mt-2 text-slate-700">The requested service could not be found.</p>
        <Link to="/services" className="btn-outline mt-4">Back to Services</Link>
      </div>
    )
  }

  return (
    <div className="container-pro py-16">
      {service.seo && <SeoHead title={service.seo.title} description={service.seo.description} />}
      <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-card">
        <div className="relative aspect-[16/7] bg-slate-100 max-md:aspect-[4/3]">
          {service.image && (
            <img src={service.image} alt={service.title} className="w-full h-full object-cover object-center" />
          )}
        </div>
        <div className="p-6 max-md:p-4">
          <h1 className="heading-lg max-md:text-3xl">{service.title}</h1>
          <p className="mt-3 text-slate-700 max-md:text-base">{service.description || service.shortDesc}</p>
          <div className="mt-6">
            <Link to="/contact" className="btn-primary max-md:text-sm max-md:px-6 max-md:py-3">Request a Quote</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
