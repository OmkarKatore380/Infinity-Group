import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // Explicitly mapping your premium assets to the data
  const projectAssets = {
    "Infinity Dreams": "/Dreams.jpg",
    "Infinity Glory": "/glory.jpg",
    "Infinity Nirman": "/Nirman.jpg",
    "Infinity Park View": "/parkview.jpg",
    "Infinity Prathamesh": "/Prathmesh.jpg",
    "Infinity Punyashlok": "/punyashlok.jpg"
  }

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5000/api/projects?limit=4')
        if (!response.ok) throw new Error('Failed to fetch projects')
        const data = await response.json()
        
        // Injecting the local high-res images into the project objects
        const enrichedData = data.map(p => ({
          ...p,
          displayImage: projectAssets[p.name] || p.coverImage
        }))
        
        setProjects(enrichedData)
      } catch (error) {
        console.error('Error fetching featured projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedProjects()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container-pro">
          <div className="h-10 bg-slate-100 w-48 mb-12 animate-pulse rounded" />
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-7 h-[500px] bg-slate-50 animate-pulse rounded-2xl" />
            <div className="col-span-12 md:col-span-5 h-[500px] bg-slate-50 animate-pulse rounded-2xl" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container-pro">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-yellow-600 font-bold tracking-[0.3em] uppercase text-sm block mb-4"
            >
              Excellence in Nagpur
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-serif text-slate-900 leading-tight"
            >
              Featured <span className="italic font-light text-slate-400">Landmarks</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/projects" 
              className="group flex items-center gap-3 text-slate-900 font-bold uppercase tracking-widest text-sm border-b-2 border-slate-900 pb-2 hover:text-yellow-600 hover:border-yellow-600 transition-all duration-300"
            >
              View All Works
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Asymmetrical Premium Grid */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <Link to={`/projects/${project.id}`} className="block">
                  <div className="relative overflow-hidden rounded-xl bg-slate-100 aspect-[4/3] md:aspect-[16/9]">
                    {/* Background Image with Ken Burns Effect */}
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      src={project.displayImage} 
                      alt={project.name} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Elegant Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Status Badge - Ultra Minimal */}
                    <div className="absolute top-4 left-4 max-md:top-2 max-md:left-2">
                      <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-bold max-md:text-[9px] max-md:px-2 max-md:py-1">
                        {project.status}
                      </span>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-yellow-500 font-medium text-sm mb-2 flex items-center gap-2 max-md:text-xs">
                        <span className="w-6 h-[1px] bg-yellow-500 max-md:w-4"></span>
                        {project.location}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-serif text-white mb-3 max-md:text-xl">
                        {project.name}
                      </h3>
                      <div className="h-[2px] w-0 group-hover:w-full bg-white/30 transition-all duration-700" />
                      <p className="text-slate-300 mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2 max-w-md max-md:text-xs">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View All Button - Luxury Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center"
        >
          <Link 
            to="/projects" 
            className="inline-block px-12 py-5 bg-slate-900 text-white rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-yellow-600 hover:shadow-[0_20px_40px_rgba(202,138,4,0.3)] transition-all duration-500 transform hover:-translate-y-1"
          >
            Explore All Creations
          </Link>
        </motion.div>
      </div>
    </section>
  )
}