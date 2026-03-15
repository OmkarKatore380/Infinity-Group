import { useState, useEffect } from 'react'

export default function AdminStats() {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stats`)
      .then((r) => r.json())
      .then(setStats)
  }, [])

  const handleSave = async () => {
    setLoading(true)
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats)
      })
      alert('Stats saved successfully')
    } catch (e) {
      alert('Failed to save stats')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (index, field, value) => {
    const updated = [...stats]
    updated[index] = {
      ...updated[index],
      [field]: value
    }
    setStats(updated)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-pro">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Stats</h1>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Stats'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow max-md:p-4">
              <h3 className="font-semibold mb-4 max-md:text-lg">Stat {index + 1}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 max-md:text-sm">Icon</label>
                  <select
                    value={stat.icon}
                    onChange={(e) => handleChange(index, "icon", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm max-md:text-sm"
                  >
                    <option value="Building">Building</option>
                    <option value="Users">Users</option>
                    <option value="Calendar">Calendar</option>
                    <option value="Hammer">Hammer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 max-md:text-sm">Value</label>
                  {stat.label === "Premium Residences Delivered" || stat.label === "Active Residential Developments" ? (
                    <div className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2 max-md:p-2 max-md:text-sm">
                      {stat.value} (Auto-calculated)
                    </div>
                  ) : (
                    <input
                      type="number"
                      value={stat.value}
                      onChange={(e) => handleChange(index, "value", parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm max-md:text-sm"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 max-md:text-sm">Label</label>
                  <input
                    value={stat.label}
                    onChange={(e) => handleChange(index, "label", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm max-md:text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}