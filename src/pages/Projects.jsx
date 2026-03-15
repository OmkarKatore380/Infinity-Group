import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard.jsx'

const filters = ['All', 'Completed', 'Ongoing']

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')

  const fetchProjects = async (status = '') => {
    try {
      setLoading(true)
      let url = 'http://localhost:5000/api/projects'
      if (status) {
        url += `?status=${status.toLowerCase()}`
      }
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Fallback to empty array if API fails
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects(active === 'All' ? '' : active)
  }, [active])

  if (loading) {
    return (
      <div className="container-pro py-16">
        <h1 className="heading-lg mb-8">Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-slate-100 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container-pro py-16">
      <h1 className="heading-lg">Projects</h1>
      <p className="text-slate-700 mt-2">Explore all our residential developments.</p>
      
      <div className="mt-6 flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-md border ${active === f ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-slate-300'} transition-colors`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {projects.length === 0 ? (
        <div className="mt-8 text-center py-12">
          <p className="text-slate-600">No projects found for this filter.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
