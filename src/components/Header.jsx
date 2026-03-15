import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useScrollDirection from '../utils/useScrollDirection'
import BrandLogo from './BrandLogo.jsx'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/standard', label: 'Our Standard' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
]

export default function Header() {
  const dir = useScrollDirection(6)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isLoggedIn] = useState(false)
  const [isAdmin] = useState(false)

  function closeMobile() {
    setMobileOpen(false)
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ${dir === 'down' ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="bg-navy text-white text-sm">
        <div className="container-pro flex items-center justify-between py-2">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a href="tel:8805647199" className="hover:underline">8805647199</a>
            <a href="tel:9511611575" className="hover:underline">9511611575</a>
            <a href="https://instagram.com/infinity_group.ngp" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:opacity-90" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-2.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/></svg>
            </a>
          </div>
          <a href="https://wa.me/918805647199" target="_blank" rel="noreferrer" className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.79 11.79 0 0 0 12 .75C5.85.75.87 5.73.87 11.9c0 2.05.54 4.06 1.56 5.83L.75 23.25l5.69-1.51a11.9 11.9 0 0 0 5.56 1.42h.01c6.15 0 11.13-4.98 11.13-11.15 0-2.98-1.16-5.78-3.62-8.53ZM12 21.12h-.01a10.17 10.17 0 0 1-5.18-1.42l-.37-.22-3.38.9.9-3.29-.24-.34a10.21 10.21 0 0 1-1.6-5.42c0-5.64 4.59-10.23 10.24-10.23 2.73 0 5.29 1.05 7.22 2.95a10.12 10.12 0 0 1 3 7.19c0 5.64-4.59 10.18-10.19 10.18Zm5.6-7.64c-.3-.15-1.76-.86-2.03-.95-.27-.1-.46-.15-.66.15-.2.3-.76.95-.93 1.14-.17.2-.34.23-.64.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.14-.14.3-.34.45-.51.15-.17.2-.3.3-.51.1-.2.05-.39-.02-.55-.08-.15-.66-1.58-.9-2.16-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.57-.02-.2 0-.52.08-.79.39-.27.3-1.04 1.02-1.04 2.47s1.07 2.86 1.22 3.05c.15.2 2.1 3.21 5.07 4.5.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
      <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 shadow-card">
        <div className="container-pro flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Infinity Group logo" className="w-[50px] h-[50px] rounded-full bg-white object-contain ring-1 ring-slate-200" />
            <span className="font-bold text-navy">Infinity Group</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `text-sm font-medium hover:text-navy ${isActive ? 'text-navy' : 'text-slate-700'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary max-md:hidden">Request a Quote</Link>
            {isLoggedIn ? (
              <div className="relative group">
                <div className="w-8 h-8 rounded-full bg-navy/20" />
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-card border border-slate-100 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                  <Link to="/profile" className="block px-3 py-2 hover:bg-slate-50">Profile</Link>
                  {isAdmin && <Link to="/admin" className="block px-3 py-2 hover:bg-slate-50">Admin Panel</Link>}
                  <button className="w-full text-left px-3 py-2 hover:bg-slate-50">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/auth" className="btn-outline max-md:hidden">Login / Register</Link>
            )}
          </nav>
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-slate-300"
            aria-label="Open navigation"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="#0B2149" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}
        >
          <div className="container-pro py-4 space-y-4">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `block text-base font-medium ${isActive ? 'text-navy' : 'text-slate-800'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={closeMobile} className="block text-base font-medium text-navy">
                Admin Panel
              </Link>
            )}
            <Link to="/contact" onClick={closeMobile} className="btn-primary w-full">Request a Quote</Link>
            <div className="pt-2">
              {isLoggedIn ? (
                <button className="btn-outline w-full">Logout</button>
              ) : (
                <Link to="/auth" onClick={closeMobile} className="btn-outline w-full">
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
