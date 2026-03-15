import { useState } from 'react'

const sidebar = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'addProject', label: 'Add Project' },
  { key: 'editProject', label: 'Edit Project' },
  { key: 'testimonials', label: 'Manage Testimonials' },
  { key: 'about', label: 'Edit About' },
  { key: 'upload', label: 'Upload Images' }
]

export default function Admin() {
  const [current, setCurrent] = useState('dashboard')
  const [imagePreview, setImagePreview] = useState(null)

  function onImage(e) {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImagePreview(url)
    }
  }

  return (
    <div className="container-pro py-10">
      <div className="grid grid-cols-1 gap-6">
        <aside className="rounded-md border border-slate-200 bg-white p-4 shadow-card max-md:p-3">
          <nav className="space-y-2">
            {sidebar.map((item) => (
              <button
                key={item.key}
                onClick={() => setCurrent(item.key)}
                className={`w-full text-left px-3 py-2 rounded-md max-md:px-2 max-md:py-1.5 max-md:text-sm ${current === item.key ? 'bg-navy text-white' : 'hover:bg-slate-100'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="rounded-md border border-slate-200 bg-white p-6 shadow-card max-md:p-4">
          {current === 'dashboard' && (
            <div>
              <h1 className="heading-lg">Admin Dashboard</h1>
              <p className="text-slate-700 mt-2">Quick overview and links.</p>
            </div>
          )}
          {current === 'addProject' && (
            <div>
              <h2 className="heading-md">Add Project</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <input placeholder="Project Name" className="rounded-md border border-slate-300 p-2" />
                <input placeholder="Location" className="rounded-md border border-slate-300 p-2" />
                <input placeholder="Possession" className="rounded-md border border-slate-300 p-2" />
                <select className="rounded-md border border-slate-300 p-2">
                  <option>Status</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
              </div>
              <textarea placeholder="Description" rows={4} className="mt-4 w-full rounded-md border border-slate-300 p-2" />
              <div className="mt-4">
                <label className="block text-sm font-semibold text-navy">Cover Image</label>
                <input type="file" accept="image/*" onChange={onImage} className="mt-1" />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-3 w-full max-w-sm rounded-md border border-slate-200" />
                )}
              </div>
              <div className="mt-6">
                <button className="btn-primary">Save</button>
              </div>
            </div>
          )}
          {current === 'editProject' && (
            <div>
              <h2 className="heading-md">Edit Project</h2>
              <p className="text-slate-700 mt-2">List of projects for editing (placeholder).</p>
            </div>
          )}
          {current === 'testimonials' && (
            <div>
              <h2 className="heading-md">Manage Testimonials</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <input placeholder="Name" className="rounded-md border border-slate-300 p-2" />
                <input placeholder="Role" className="rounded-md border border-slate-300 p-2" />
                <select className="rounded-md border border-slate-300 p-2">
                  <option>Rating</option>
                  <option>5</option>
                  <option>4</option>
                  <option>3</option>
                </select>
              </div>
              <textarea placeholder="Quote" rows={4} className="mt-4 w-full rounded-md border border-slate-300 p-2" />
              <div className="mt-6">
                <button className="btn-primary">Save</button>
              </div>
            </div>
          )}
          {current === 'about' && (
            <div>
              <h2 className="heading-md">Edit About</h2>
              <div className="mt-4 space-y-3">
                {['Section 1', 'Section 2', 'Section 3'].map((s, i) => (
                  <div key={i} className="border border-slate-200 rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-navy">{s}</span>
                      <button className="btn-outline">Edit</button>
                    </div>
                    <p className="text-slate-700 mt-2">LinkedIn-style editable block placeholder.</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {current === 'upload' && (
            <div>
              <h2 className="heading-md">Upload Images</h2>
              <input type="file" accept="image/*" multiple className="mt-4" />
              <p className="text-slate-700 mt-2">Upload preview and management UI (placeholder).</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
