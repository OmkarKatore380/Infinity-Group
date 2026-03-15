import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createService, getAllServices, updateService } from '../../services/servicesService.js'

export default function ServiceForm({ mode = 'new' }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    slug: '',
    shortDesc: '',
    description: '',
    image: '',
    seo: { title: '', description: '' },
    status: 'Active'
  })
  const [loading, setLoading] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => {
    if (mode === 'edit' && id) {
      getAllServices().then((list) => {
        const found = list.find((s) => String(s.id) === String(id))
        if (found) setForm(found)
      })
    }
  }, [mode, id])

  function onTitleChange(e) {
    const title = e.target.value
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    setForm((f) => ({ ...f, title, slug, seo: { ...f.seo, title } }))
  }

  function onChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function onSeo(field, value) {
    setForm((f) => ({ ...f, seo: { ...f.seo, [field]: value } }))
  }

  function pickFile() {
    fileRef.current?.click()
  }

  async function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    const bitmap = await createImageBitmap(file)
    const canvas = document.createElement('canvas')
    const maxW = 1200
    const scale = Math.min(1, maxW / bitmap.width)
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.82)
    setForm((f) => ({ ...f, image: dataUrl }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === 'edit') {
        await updateService(form.id, form)
      } else {
        await createService(form)
      }
      navigate('/admin/services')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-pro py-12">
      <div className="flex items-center justify-between">
        <h1 className="heading-lg">{mode === 'edit' ? 'Edit Service' : 'Add Service'}</h1>
        <Link to="/admin/services" className="btn-outline">Back</Link>
      </div>
      <form onSubmit={onSubmit} className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
          <label className="block text-sm font-medium text-slate-700">Title</label>
          <input value={form.title} onChange={onTitleChange} className="mt-1 w-full border rounded-md px-3 py-2" required />

          <label className="block mt-4 text-sm font-medium text-slate-700">Slug</label>
          <input value={form.slug} onChange={(e)=>onChange('slug', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" required />

          <label className="block mt-4 text-sm font-medium text-slate-700">Short Description</label>
          <textarea value={form.shortDesc} onChange={(e)=>onChange('shortDesc', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" rows={3} />

          <label className="block mt-4 text-sm font-medium text-slate-700">Full Description</label>
          <textarea value={form.description} onChange={(e)=>onChange('description', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" rows={6} />

          <label className="block mt-4 text-sm font-medium text-slate-700">Status</label>
          <select value={form.status} onChange={(e)=>onChange('status', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2">
            <option>Active</option>
            <option>Draft</option>
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
          <label className="block text-sm font-medium text-slate-700">Image</label>
          <div className="mt-2">
            {form.image ? (
              <div className="h-40 rounded-md overflow-hidden bg-slate-100">
                <img src={form.image} alt="preview" className="w-full h-full object-cover object-center" />
              </div>
            ) : (
              <div className="h-40 rounded-md overflow-hidden bg-slate-100 grid place-items-center text-slate-500">
                No image selected
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
          <button type="button" onClick={pickFile} className="mt-3 px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">
            Upload Image
          </button>

          <label className="block mt-6 text-sm font-medium text-slate-700">SEO Title</label>
          <input value={form.seo.title} onChange={(e)=>onSeo('title', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />

          <label className="block mt-4 text-sm font-medium text-slate-700">SEO Description</label>
          <textarea value={form.seo.description} onChange={(e)=>onSeo('description', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" rows={3} />

          <div className="mt-6">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Create Service'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
