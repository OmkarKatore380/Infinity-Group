import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard.jsx'

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [compare, setCompare] = useState(50)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/projects/${id}`)
        if (!response.ok) {
          throw new Error('Project not found')
        }
        const data = await response.json()
        setProject(data)
      } catch (error) {
        console.error('Error fetching project:', error)
        setProject(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  if (loading) {
    return (
      <div className="container-pro py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-8"></div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-64 bg-slate-200 rounded-md"></div>
            </div>
            <div>
              <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-slate-200 rounded-md mb-4"></div>
              <div className="h-8 bg-slate-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container-pro py-16">
        <p className="text-slate-700">Project not found.</p>
        <Link to="/projects" className="btn-outline mt-4">Back to Projects</Link>
      </div>
    )
  }

  // Get related projects (same status, exclude current)
  const getRelatedProjects = () => {
    // This would ideally come from the backend, but for now we'll fetch all and filter
    return [] // Will be populated when we implement the related projects endpoint
  }

  return (
    <div className="container-pro py-16">
      <div className="flex items-center justify-between">
        <h1 className="heading-lg">{project.name}</h1>
        <Link to="/contact" className="btn-primary">Inquiry</Link>
      </div>
      <p className="text-slate-700 mt-2">{project.location} • Status: {project.status}</p>

      <div className="mt-8 grid grid-cols-1 gap-6">
        <div className="space-y-4">
          {/* Large Image Viewer */}
          <div className="relative rounded-md overflow-hidden border border-slate-200">
            <img 
              src={project.primaryImage || project.coverImage} 
              alt={`${project.name} main view`} 
              className="w-full h-64 object-cover max-md:h-48" 
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex flex-wrap gap-2">
            {/* Primary image as first thumbnail */}
            {(project.primaryImage || project.coverImage) && (
              <img 
                src={project.primaryImage || project.coverImage} 
                alt="Primary view" 
                className="w-20 h-16 object-cover rounded-md border border-slate-200 cursor-pointer hover:border-navy transition-colors max-md:w-16 max-md:h-12"
              />
            )}
            
            {/* Secondary gallery images */}
            {(project.secondaryImages || []).map((src, i) => (
              <img 
                key={i} 
                src={src} 
                alt={`Gallery ${i+1}`} 
                className="w-20 h-16 object-cover rounded-md border border-slate-200 cursor-pointer hover:border-navy transition-colors max-md:w-16 max-md:h-12"
              />
            ))}
            
            {/* Fallback to old gallery if no new images */}
            {!project.primaryImage && !(project.secondaryImages || []).length && project.gallery && project.gallery.map((src, i) => (
              <img 
                key={i} 
                src={src} 
                alt={`Gallery ${i+1}`} 
                className="w-20 h-16 object-cover rounded-md border border-slate-200 cursor-pointer hover:border-navy transition-colors max-md:w-16 max-md:h-12"
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="heading-md">Before / After</h3>
          <div className="relative mt-3 rounded-md overflow-hidden border border-slate-200">
            <img src={project.coverImage} alt="After" className="w-full h-64 object-cover max-md:h-48" />
            <img
              src="https://images.unsplash.com/photo-1444417898484-39bfd9f14718?q=80&w=1200&auto=format&fit=crop"
              alt="Before"
              className="absolute inset-0 h-64 w-full object-cover max-md:h-48"
              style={{ clipPath: `inset(0 ${100 - compare}% 0 0)` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={compare}
            onChange={(e) => setCompare(Number(e.target.value))}
            className="mt-3 w-full"
            aria-label="Comparison slider"
          />

          <h3 className="heading-md mt-8">Project Details</h3>
          <ul className="mt-3 space-y-2 text-slate-700 max-md:text-sm">
            <li>• Status: {project.status}</li>
            <li>• Location: {project.location}</li>
            <li>• Description: {project.description}</li>
          </ul>

          {project.amenities && project.amenities.length > 0 && (
            <>
              <h3 className="heading-md mt-8">Amenities</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {project.amenities.map((a) => (
                  <span key={a} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-300 max-md:px-2 max-md:py-1 max-md:text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#0B2149" aria-hidden="true"><circle cx="12" cy="12" r="10"/></svg>
                    {a}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="heading-md">Full Description</h3>
        <p className="text-slate-700 mt-2">{project.fullDescription || project.description}</p>
      </div>

      {/* Related Projects Section */}
      <div className="mt-16">
        <h3 className="heading-md mb-6">Related Projects</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* This would show related projects based on status or location */}
          <p className="text-slate-600 col-span-full">Related projects will be displayed here.</p>
        </div>
      </div>
    </div>
  )
}
