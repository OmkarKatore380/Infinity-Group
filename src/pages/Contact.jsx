import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    location: '',
    budget: '',
    message: ''
  })
  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="container-pro py-16">
      <h1 className="heading-lg">Request a Quote</h1>
      <p className="text-slate-700 mt-2">We will respond within 1–2 business days.</p>

      <div className="mt-8 grid grid-cols-1 gap-8">
        <form className="rounded-md border border-slate-200 bg-white p-6 shadow-card max-md:p-4" noValidate>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy max-md:text-sm">Full Name</label>
              <input name="name" value={form.name} onChange={onChange} required className="mt-1 w-full rounded-md border border-slate-300 p-2 max-md:p-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy max-md:text-sm">Phone</label>
              <input name="phone" value={form.phone} onChange={onChange} required className="mt-1 w-full rounded-md border border-slate-300 p-2 max-md:p-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy max-md:text-sm">Email</label>
              <input type="email" name="email" value={form.email} onChange={onChange} required className="mt-1 w-full rounded-md border border-slate-300 p-2 max-md:p-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy max-md:text-sm">Project Type</label>
              <select name="projectType" value={form.projectType} onChange={onChange} required className="mt-1 w-full rounded-md border border-slate-300 p-2 max-md:p-2">
                <option value="">Select</option>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Renovation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy max-md:text-sm">Location</label>
              <input name="location" value={form.location} onChange={onChange} required className="mt-1 w-full rounded-md border border-slate-300 p-2 max-md:p-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy max-md:text-sm">Estimated Budget</label>
              <input name="budget" value={form.budget} onChange={onChange} className="mt-1 w-full rounded-md border border-slate-300 p-2 max-md:p-2" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold text-navy max-md:text-sm">Message</label>
            <textarea name="message" value={form.message} onChange={onChange} rows={4} className="mt-1 w-full rounded-md border border-slate-300 p-2 max-md:p-2" />
          </div>
          <div className="mt-6">
            <button className="btn-primary max-md:text-sm max-md:px-6 max-md:py-3">Submit</button>
          </div>
        </form>

        <div className="rounded-md border border-slate-200 bg-white p-6 shadow-card max-md:p-4">
          <h3 className="heading-md max-md:text-xl">Office</h3>
          <p className="text-slate-700 mt-2 max-md:text-sm">Nagpur, Maharashtra</p>
          <div className="mt-4 space-y-2 text-slate-700 max-md:text-sm">
            <p>8805647199</p>
            <p>9511611575</p>
            <p>8483092263</p>
            <p>9172256678</p>
            <p>9850330605</p>
            <p>Instagram: infinity_group.ngp</p>
            <a href="https://wa.me/918805647199" className="text-navy hover:underline max-md:text-sm" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <div className="mt-6 h-40 rounded-md bg-slate-100 grid place-items-center text-slate-600 max-md:h-32">
            Google Map (placeholder)
          </div>
        </div>
      </div>
    </div>
  )
}
