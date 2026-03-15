import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Footer() {
  const [isAdmin] = useState(false)

  return (
    <footer className="relative mt-20">
      {/* floating blur lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 left-10 w-64 h-64 rounded-full bg-white/5 blur-2xl"/>
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-white/5 blur-2xl"/>
      </div>

      <div className="bg-[#0f172a] text-gray-300 border-t border-neutral-800 relative">
        
        <div className="container-pro pt-16">
          {/* GLASS SECTION */}
          <div className="relative mb-16 p-8 md:p-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Ready to bring your vision to life?
              </h2>
              <p className="mt-4 text-gray-300 italic text-lg max-w-2xl leading-relaxed">
                "Start your journey with Infinity Group – elevating your space with expert design and construction services."
              </p>
              <button className="mt-8 px-8 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Ready To Quote
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-16">
            {/* BRAND */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Infinity Group logo"
                  className="w-10 h-10 rounded-full bg-white object-contain ring-1 ring-slate-200"
                />
                <span className="font-bold text-white text-lg">
                  Infinity Group
                </span>
              </div>

              <p className="mt-4 text-gray-400 max-w-md leading-relaxed text-sm">
                Building Nagpur’s future with structural precision, durable
                engineering, and trusted residential development.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Helping families build homes that stand strong for generations.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/services" className="hover:text-white transition text-sm">Services</Link></li>
                <li><Link to="/projects" className="hover:text-white transition text-sm">Projects</Link></li>
                <li><Link to="/standard" className="hover:text-white transition text-sm">Our Standard</Link></li>
                <li><Link to="/about" className="hover:text-white transition text-sm">About</Link></li>
                <li><Link to="/contact" className="hover:text-white transition text-sm">Contact</Link></li>
              </ul>
            </div>

            {/* PROJECTS */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Projects</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Narendra Nagar</li>
                <li>Bajaj Nagar</li>
                <li>Lakadganj</li>
              </ul>
            </div>

            {/* CLIENT PORTAL */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Client Portal</h4>
              <p className="text-gray-400 text-sm mb-4">
                Access construction updates, documents and investor information for Infinity Group projects.
              </p>
              <input
                type="email"
                placeholder="Registered Email"
                className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="mt-3 w-full px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-sky-500 text-white font-medium hover:opacity-90 transition text-sm">
                Client Sign In
              </button>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Phone: 8805647199</li>
                <li>Phone: 9511611575</li>
                <li>Phone: 8483092263</li>
                <li>Phone: 9172256678</li>
                <li>Phone: 9850330605</li>
                <li>Instagram: infinity_group.ngp</li>
                <li>
                  <a href="https://wa.me/918805647199" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition text-sm">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-t border-neutral-700/50">
          <div className="container-pro flex items-center justify-between py-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Infinity Group. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
  <a href="/admin" className="text-sm text-gray-400 hover:text-white">Admin</a>
  {isAdmin && (
    <Link to="/admin" className="px-4 py-2 rounded-md bg-gradient-to-r from-[#1e40af] via-[#2563eb] to-[#0ea5e9] text-white">
      Admin Panel
    </Link>
  )}
</div>
          </div>
        </div>

      </div>
    </footer>
  )
}
