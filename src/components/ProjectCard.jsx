import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  // Ensuring it uses your local assets if available
  const projectAssets = {
    "Infinity Dreams": "/Dreams.jpg",
    "Infinity Glory": "/glory.jpg",
    "Infinity Nirman": "/Nirman.jpg",
    "Infinity Park View": "/parkview.jpg",
    "Infinity Prathamesh": "/Prathmesh.jpg",
    "Infinity Punyashlok": "/punyashlok.jpg"
  }

  const imgPath = projectAssets[project.name] || (project.primaryImage || project.coverImage)

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all"
    >
      <div className="relative aspect-[16/11] overflow-hidden max-md:aspect-[4/3]">
        <img 
          src={imgPath} 
          alt={`${project.name}`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-4 left-4 max-md:top-2 max-md:left-2">
          <span className="text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white uppercase max-md:text-[9px] max-md:px-2 max-md:py-1">
            {project.status}
          </span>
        </div>
      </div>
      
      <div className="p-6 max-md:p-4">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-yellow-600 transition-colors max-md:text-lg">
          {project.name}
        </h3>
        <p className="text-slate-500 text-sm mt-1 flex items-center gap-2 max-md:text-xs">
          <span className="w-4 h-[1px] bg-slate-300 max-md:w-3"></span>
          {project.location}
        </p>
        
        <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4 max-md:mt-4 max-md:pt-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter max-md:text-[10px]">
            Possession: {project.possession}
          </span>
          <Link 
            to={`/projects/${project.id}`} 
            className="text-slate-900 text-xs font-bold uppercase border-b border-slate-900 pb-1 hover:text-yellow-600 hover:border-yellow-600 transition-all max-md:text-[10px]"
          >
            View Space
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
