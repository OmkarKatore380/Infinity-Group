import { useEffect, useState } from 'react'
import { getAllServices } from '../../services/servicesService.js'

export default function AdminDashboard() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    getAllServices().then((list) => setCount(list.length))
  }, [])
  return (
    <div className="container-pro py-12">
      <h1 className="heading-lg">Admin Dashboard</h1>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="heading-md">Services</h2>
          <p className="mt-2 text-slate-700">Total: {count}</p>
        </div>
      </div>
    </div>
  )
}
