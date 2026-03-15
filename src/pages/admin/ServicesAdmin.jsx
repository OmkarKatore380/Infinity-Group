import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteService, getAllServices } from '../../services/servicesService.js'

export default function AdminServices() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    refresh()
  }, [])

  function refresh() {
    setLoading(true)
    getAllServices().then((l) => {
      setList(l)
      setLoading(false)
    })
  }

  async function onDelete(id) {
    await deleteService(id)
    refresh()
  }

  return (
    <div className="container-pro py-12">
      <div className="flex items-center justify-between">
        <h1 className="heading-lg">Manage Services</h1>
        <Link to="/admin/services/new" className="btn-primary">Add New Service</Link>
      </div>

      {loading ? (
        <p className="mt-6 text-slate-600">Loading...</p>
      ) : (
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((s) => (
            <div key={s.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <div className="h-36 rounded-md overflow-hidden bg-slate-100">
                {s.image && <img src={s.image} alt={s.title} className="w-full h-full object-cover object-center" />}
              </div>
              <h3 className="heading-md mt-4">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600">Status: {s.status || 'Active'}</p>
              <div className="mt-4 flex gap-3">
                <Link to={`/admin/services/edit/${s.id}`} className="btn-outline">Edit</Link>
                <button onClick={() => onDelete(s.id)} className="px-4 py-2 rounded-md border border-red-500 text-red-600 hover:bg-red-50">Delete</button>
                <Link to={`/services/${s.slug}`} className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">View</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
