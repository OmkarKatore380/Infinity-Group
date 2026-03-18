import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Building, Users, Calendar, Hammer, Award, Star } from 'lucide-react'
import { motion, useInView, animate } from 'framer-motion'
import services from '../data/services.json'
import TestimonialsSlider from '../components/TestimonialsSlider.jsx'
import ServiceCarousel from '../components/ServiceCarousel.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ProcessSection from '../components/ProcessSection.jsx'
import FounderVisionDock from '../components/FounderVisionDock.jsx'
import FounderVisionDockMobile from '../components/FounderVisionDockMobile.jsx'
import CursorSpotlight from '../components/CursorSpotlight.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'

// ===== OPTIMIZED ANIMATION VARIANTS =====
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

// ===== COUNT UP COMPONENT =====
function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return

    const numeric = parseInt(value?.toString().replace(/\D/g, '')) || 0

    const controls = animate(0, numeric, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(v) {
        setDisplay(Math.floor(v))
      }
    })

    return () => controls.stop()
  }, [inView, value])

  const suffix = value?.toString().replace(/[0-9]/g, '')

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  )
}

// ===== MARQUEE COMPONENT =====
const ProjectMarquee = () => {
  const projects = [
    "Infinity Dreams",
    "Infinity Park View",
    "Infinity Glory",
    "Infinity Prathamesh",
    "Infinity Punyashlok"
  ];

  const marqueeItems = [...projects, ...projects, ...projects, ...projects, ...projects];

  return (
    <div className="w-full overflow-hidden bg-white border-y border-slate-100 pt-4 pb-4">
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-32 md:gap-48">
          {marqueeItems.map((name, idx) => (
            <span
              key={idx}
              className="text-slate-500 text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-wide inline-block"
              style={{ fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [stats, setStats] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats([]))
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((r) => r.json())
      .then(allProjects => {
        const completedProjects = allProjects
          .filter(p => p.status === "Completed")
          .sort((a,b) => new Date(b.date || b.possession || 0) - new Date(a.date || a.possession || 0))
        
        const ongoingProjects = allProjects
          .filter(p => p.status === "Ongoing")
          .sort((a,b) => new Date(b.date || b.possession || 0) - new Date(a.date || a.possession || 0))

        let selectedProjects = []

        if (completedProjects.length >= 2 && ongoingProjects.length >= 2) {
          selectedProjects = [...completedProjects.slice(0, 2), ...ongoingProjects.slice(0, 2)]
        } 
        else if (ongoingProjects.length === 1 && completedProjects.length >= 3) {
          selectedProjects = [...completedProjects.slice(0, 3), ...ongoingProjects.slice(0, 1)]
        } 
        else if (ongoingProjects.length === 0) {
          selectedProjects = completedProjects.slice(0, 4)
        } 
        else if (completedProjects.length === 1 && ongoingProjects.length >= 3) {
          selectedProjects = [...completedProjects.slice(0, 1), ...ongoingProjects.slice(0, 3)]
        } 
        else if (completedProjects.length === 0) {
          selectedProjects = ongoingProjects.slice(0, 4)
        } 
        else {
          selectedProjects = [...completedProjects, ...ongoingProjects].slice(0, 4)
        }

        setProjects(selectedProjects)
      })
      .catch(() => setProjects([]))
  }, [])

  // Video error fallback function
  const handleVideoError = (e) => {
    const video = e.target;
    // If video fails, replace with a fallback image
    if (video && video.parentNode) {
      const fallbackImg = document.createElement('img');
      fallbackImg.src = '/poster.jpg'; // Make sure this exists in public folder
      fallbackImg.alt = 'Construction preview';
      fallbackImg.className = video.className;
      fallbackImg.style.objectFit = 'cover';
      fallbackImg.style.filter = video.style.filter;
      fallbackImg.style.mixBlendMode = video.style.mixBlendMode;
      video.parentNode.replaceChild(fallbackImg, video);
    }
  };

  return (
    <>
      <div className="bg-white">

        <svg style={{ height: 0, width: 0, position: 'absolute' }}>
          <filter id="blueprint-sketch">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
          </filter>
        </svg>

        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-[90vh] w-full overflow-hidden bg-white flex items-center pt-20">
          {/* Background grid stays outside the blocks, applies to both */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
              `,
              backgroundSize: '45px 45px',
              maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            }}
          />

          {/* Desktop version */}
          <div className="hidden md:block w-full">
            <div className="absolute right-12 lg:right-20 top-16 lg:top-24 -translate-y-4 w-full lg:w-2/5 max-w-xl z-0 overflow-hidden aspect-video border-4 border-white">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                preload="auto"
                poster="/poster.jpg" // Add a poster image
                className="w-full h-full object-cover scale-105"
                style={{ filter: 'brightness(1.1) contrast(1.05) saturate(0.9)', mixBlendMode: 'overlay' }}
                onError={handleVideoError}
              >
                <source src="/video3.mp4" type="video/mp4" />
                <source src="/video3.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="container-pro relative z-10 px-6 md:px-12 lg:px-20 w-full">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="flex-1 text-left relative">
                  <div className="flex items-center gap-2 -mt-9 mb-8 relative z-10">
                    <span className="w-1 h-12 bg-yellow-500"></span>
                    <span className="text-base uppercase tracking-[0.5em] text-slate-500 font-bold max-md:text-sm">Trusted Developer – Nagpur</span>
                  </div>

                  <img src="/image.png" alt="Reliable Construction" className="w-[95%] mx-0 mb-8 mix-blend-multiply scale-110" style={{ objectFit: 'contain' }} />

                  <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed mb-10 bg-white/80 backdrop-blur-sm lg:bg-transparent rounded-lg p-2 relative z-10 max-md:text-base">
                    Delivering 2 & 3 BHK premium residences engineered with safety, structural precision, and long-term durability.
                  </p>

                  <div className="flex flex-wrap gap-5 relative z-10">
                    <Link to="/projects" className="px-8 py-3 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition-all shadow-xl font-bold uppercase tracking-wider text-sm max-md:px-6 max-md:py-2">Explore Projects</Link>
                    <Link to="/contact" className="px-8 py-3 border-2 border-slate-900 text-slate-900 rounded-md hover:bg-slate-900 hover:text-white transition-all font-bold uppercase tracking-wider text-sm max-md:px-6 max-md:py-2">Request a Quote</Link>
                  </div>
                </div>
                <div className="flex-1"></div>
              </div>
            </div>
          </div>

          {/* Mobile version */}
          <div className="block md:hidden w-full">
            <div className="container-pro relative z-10 px-4 w-full">
              {/* Video at top, full width with reduced height */}
              <div className="w-full max-w-md mx-auto mb-6">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  preload="auto"
                  poster="/poster.jpg"
                  className="w-full aspect-video max-h-64 object-cover rounded-lg border-2 border-white"
                  style={{ filter: 'brightness(1.1) contrast(1.05) saturate(0.9)', mixBlendMode: 'overlay' }}
                  onError={handleVideoError}
                >
                  <source src="/video3.mp4" type="video/mp4" />
                  <source src="/video3.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Trusted Developer line with smaller text and shorter dash */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1 h-8 bg-yellow-500"></span>
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Trusted Developer – Nagpur</span>
              </div>

              {/* Heading Image with responsive scaling */}
              <div className="w-full max-w-[90%] mx-auto mb-6">
                <img src="/image.png" alt="Reliable Construction" className="w-full mix-blend-multiply scale-110" style={{ objectFit: 'contain' }} />
              </div>

              {/* Description centered with reduced font size */}
              <div className="text-center mb-8">
                <p className="text-base text-slate-600 leading-relaxed bg-white/80 backdrop-blur-sm rounded-lg p-4 mx-4">
                  Delivering 2 & 3 BHK premium residences engineered with safety, structural precision, and long-term durability.
                </p>
              </div>

              {/* Buttons stacked vertically with full width */}
              <div className="flex flex-col gap-4 w-full max-w-md mx-auto px-4">
                <Link to="/projects" className="w-full px-6 py-3 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition-all shadow-xl font-bold uppercase tracking-wider text-sm text-center">Explore Projects</Link>
                <Link to="/contact" className="w-full px-6 py-3 border-2 border-slate-900 text-slate-900 rounded-md hover:bg-slate-900 hover:text-white transition-all font-bold uppercase tracking-wider text-sm text-center">Request a Quote</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTENT WRAPPER ================= */}
        <div className="relative w-full">
          
        {/* ================= STATS SECTION ================= */}
<ScrollReveal>
<section className="bg-transparent py-12 relative z-20 overflow-hidden px-4">

  {/* subtle construction glow background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute w-[600px] h-[600px] bg-[#FF4433]/10 blur-[140px] -top-40 -left-40"></div>
    <div className="absolute w-[500px] h-[500px] bg-[#FF4433]/10 blur-[140px] -bottom-40 -right-40"></div>
  </div>

  <motion.div 
    className="container-pro relative"
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.1 }}
  >

    {/* HERO CARD - Full Width */}
    <div className="grid grid-cols-1 gap-8 mb-8">
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -8, scale: 1.01 }}
        className="group bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-[0_20px_50px_rgba(255,68,51,0.1)] border-l-4 border-l-[#FF4433] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(255,68,51,0.25)]"
      >
        <div className="flex items-center gap-6 mb-6">
          <Award size={56} strokeWidth={1.5}
          className="text-[#FF4433] drop-shadow-[0_0_10px_rgba(255,68,51,0.6)] flex-shrink-0"/>

          <div>
            <div className="text-5xl font-bold bg-gradient-to-r from-[#FF4433] to-[#FF8833] bg-clip-text text-transparent drop-shadow-[0_5px_12px_rgba(255,68,51,0.4)] max-md:text-4xl">
              20+ Years
            </div>
            <p className="text-white font-medium uppercase tracking-widest text-sm mt-1 leading-tight">
              of experience
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Star size={28} strokeWidth={1.5}
          className="text-[#FF4433] fill-[#FF4433] drop-shadow-[0_0_8px_rgba(255,68,51,0.6)]"/>
          <span className="text-3xl font-bold text-white">4.5/5</span>
          <span className="text-slate-300">Average Rating</span>
        </div>

        <p className="text-lg font-medium bg-white/10 p-4 rounded-lg text-slate-200 leading-relaxed max-md:text-base">
          Infinity Group in Nagpur is an established real estate developer with multiple under-construction residential projects in prime areas like Narendra Nagar and Pratap Nagar.
        </p>
      </motion.div>
    </div>

   {/* NUMERIC GRID - 2x2 on Mobile, 4x1 on Desktop */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
  
  {/* Project Count */}
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -8, scale: 1.01 }}
    className="group bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(255,68,51,0.1)] border-l-4 border-l-[#FF4433] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(255,68,51,0.25)] h-full flex flex-col justify-between"
  >
    <div className="text-[#FF4433] mb-3 drop-shadow-[0_0_10px_rgba(255,68,51,0.5)]">
      <Building size={32} md:size={48} strokeWidth={1.5}/>
    </div>
    <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#FF4433] to-[#FF8833] bg-clip-text text-transparent drop-shadow-[0_5px_14px_rgba(255,68,51,0.5)]">
      <CountUp value="15+"/>
    </div>
    <p className="text-slate-300 font-medium uppercase tracking-widest text-xs mb-2">Projects Done</p>
    <div className="hidden md:block">
      <p className="text-sm font-medium bg-white/10 p-3 rounded-md text-slate-200 leading-relaxed">
        Two decades of construction expertise driven by engineering discipline and quality control.
      </p>
    </div>
    <div className="block md:hidden">
      <p className="text-[10px] font-medium bg-white/10 p-2 rounded-md text-slate-200 leading-relaxed">
        Premium developments in prime locations.
      </p>
    </div>
  </motion.div>

  {/* Families Count */}
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -8, scale: 1.01 }}
    className="group bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(255,68,51,0.1)] border-l-4 border-l-[#FF4433] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(255,68,51,0.25)] h-full flex flex-col justify-between"
  >
    <div className="text-[#FF4433] mb-3 drop-shadow-[0_0_10px_rgba(255,68,51,0.5)]">
      <Users size={32} md:size={48} strokeWidth={1.5}/>
    </div>
    <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#FF4433] to-[#FF8833] bg-clip-text text-transparent drop-shadow-[0_5px_14px_rgba(255,68,51,0.5)]">
      <CountUp value="500+"/>
    </div>
    <p className="text-slate-300 font-medium uppercase tracking-widest text-xs mb-2">Happy Families</p>
    <div className="hidden md:block">
      <p className="text-sm font-medium bg-white/10 p-3 rounded-md text-slate-200 leading-relaxed">
        Crafted with structural precision, our residences redefine modern living in Nagpur.
      </p>
    </div>
    <div className="block md:hidden">
      <p className="text-[10px] font-medium bg-white/10 p-2 rounded-md text-slate-200 leading-relaxed">
        Trusted by homeowners for quality living.
      </p>
    </div>
  </motion.div>

  {/* Timeline Count */}
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -8, scale: 1.01 }}
    className="group bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(255,68,51,0.1)] border-l-4 border-l-[#FF4433] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(255,68,51,0.25)] h-full flex flex-col justify-between"
  >
    <div className="text-[#FF4433] mb-3 drop-shadow-[0_0_10px_rgba(255,68,51,0.5)]">
      <Calendar size={32} md:size={48} strokeWidth={1.5}/>
    </div>
    <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#FF4433] to-[#FF8833] bg-clip-text text-transparent drop-shadow-[0_5px_14px_rgba(255,68,51,0.5)]">
      <CountUp value="20+"/>
    </div>
    <p className="text-slate-300 font-medium uppercase tracking-widest text-xs mb-2">Years of Trust</p>
    <div className="hidden md:block">
      <p className="text-sm font-medium bg-white/10 p-3 rounded-md text-slate-200 leading-relaxed">
        Families have trusted Infinity Group for reliability and long-term value.
      </p>
    </div>
    <div className="block md:hidden">
      <p className="text-[10px] font-medium bg-white/10 p-2 rounded-md text-slate-200 leading-relaxed">
        Reliability and transparency since day one.
      </p>
    </div>
  </motion.div>

  {/* Construction Count */}
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -8, scale: 1.01 }}
    className="group bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(255,68,51,0.1)] border-l-4 border-l-[#FF4433] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(255,68,51,0.25)] h-full flex flex-col justify-between"
  >
    <div className="text-[#FF4433] mb-3 drop-shadow-[0_0_10px_rgba(255,68,51,0.5)]">
      <Hammer size={32} md:size={48} strokeWidth={1.5}/>
    </div>
    <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#FF4433] to-[#FF8833] bg-clip-text text-transparent drop-shadow-[0_5px_14px_rgba(255,68,51,0.5)]">
      <CountUp value="5+"/>
    </div>
    <p className="text-slate-300 font-medium uppercase tracking-widest text-xs mb-2">Ongoing</p>
    <div className="hidden md:block">
      <p className="text-sm font-medium bg-white/10 p-3 rounded-md text-slate-200 leading-relaxed">
        Our active developments are shaping vibrant residential communities.
      </p>
    </div>
    <div className="block md:hidden">
      <p className="text-[10px] font-medium bg-white/10 p-2 rounded-md text-slate-200 leading-relaxed">
        Building vibrant, connected communities.
      </p>
    </div>
  </motion.div>
</div>
    

  </motion.div>
</section>
</ScrollReveal>

          <ProjectMarquee />
          <ServiceCarousel />
          
          {/* ================= WHY CHOOSE US ================= */}
          <WhyChooseUs />

          {/* ================= FEATURED PROJECTS – PREMIUM REDESIGN ================= */}
          <ScrollReveal>
            <section className="relative py-32 overflow-hidden">

              <div className="container-pro">

                <div className="text-center max-w-3xl mx-auto mb-24">
                  <p className="uppercase tracking-[0.4em] text-sm text-[#FF4433] font-semibold mb-4">
                    Infinity Group Portfolio
                  </p>
                  <h2 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 leading-tight tracking-tight">
                    Featured Projects
                  </h2>
                  <div className="w-28 h-[2px] bg-[#FF4433] rounded-full mt-6 mb-6"></div>
                  <p className="font-playfair text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                    Crafting timeless spaces that inspire modern living.<br/>
                    Every structure reflects precision, vision, and excellence.<br/>
                    Built not just for today — but for generations to come.
                  </p>
                </div>

                <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-1 gap-x-10 gap-y-28">

                  {/* Project 1 */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="lg:col-span-7 md:col-span-6 col-span-1 group relative pb-24"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
                      <img
                        src="/Dreams.jpg"
                        alt="Infinity Dreams"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/images/projects/fallback.jpg";
                        }}
                        className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute bottom-[-40px] left-10 bg-white rounded-xl p-6 shadow-xl border border-white/20 max-w-[420px]">
                      <h3
                        className="text-xl font-semibold text-slate-900"
                        style={{ fontFamily: "'Bebas Neue','Impact','Arial Black',sans-serif" }}
                      >
                        INFINITY DREAMS
                      </h3>

                      <p className="text-sm text-slate-500 mt-2">
                        Bajaj Nagar, Nagpur
                      </p>

                      <p className="text-sm text-slate-700 leading-relaxed mt-3"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        A sanctuary of modern living crafted with architectural precision.
                      </p>

                      <div className="flex items-center justify-between mt-5">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Completed
                        </span>

                        <Link 
                          to="/projects/1"
                          className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                          View Project
                        </Link>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project 2 */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="lg:col-span-5 md:col-span-6 col-span-1 group relative pb-24"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
                      <img
                        src="/parkview.jpg"
                        alt="Infinity Park View"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/images/projects/fallback.jpg";
                        }}
                        className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute bottom-[-40px] left-10 bg-white rounded-xl p-6 shadow-xl border border-white/20 max-w-[360px]">
                      <h3
                        className="text-xl font-semibold text-slate-900"
                        style={{ fontFamily: "'Bebas Neue','Impact','Arial Black',sans-serif" }}
                      >
                        INFINITY PARK VIEW
                      </h3>

                      <p className="text-sm text-slate-500 mt-2">
                        Bajaj Nagar, Nagpur
                      </p>

                      <p className="text-sm text-slate-700 leading-relaxed mt-3"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Where nature meets contemporary residential design.
                      </p>

                      <div className="flex items-center justify-between mt-5">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Ongoing
                        </span>

                        <Link 
                          to="/projects/2"
                          className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                          View Project
                        </Link>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project 3 */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="lg:col-span-5 md:col-span-6 col-span-1 group relative pb-24"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
                      <img
                        src="/glory.jpg"
                        alt="Infinity Glory"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/images/projects/fallback.jpg";
                        }}
                        className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute bottom-[-40px] left-10 bg-white rounded-xl p-6 shadow-xl border border-white/20 max-w-[360px]">
                      <h3
                        className="text-xl font-semibold text-slate-900"
                        style={{ fontFamily: "'Bebas Neue','Impact','Arial Black',sans-serif" }}
                      >
                        INFINITY GLORY
                      </h3>

                      <p className="text-sm text-slate-500 mt-2">
                        Bajaj Nagar, Nagpur
                      </p>

                      <p className="text-sm text-slate-700 leading-relaxed mt-3"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Timeless elegance engineered for modern families.
                      </p>

                      <div className="flex items-center justify-between mt-5">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Completed
                        </span>

                        <Link 
                          to="/projects/3"
                          className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                          View Project
                        </Link>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project 4 */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="lg:col-span-7 md:col-span-6 col-span-1 group relative pb-24"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
                      <img
                        src="/Prathmesh.jpg"
                        alt="Infinity Prathamesh"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/images/projects/fallback.jpg";
                        }}
                        className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute bottom-[-40px] left-10 bg-white rounded-xl p-6 shadow-xl border border-white/20 max-w-[420px]">
                      <h3
                        className="text-xl font-semibold text-slate-900"
                        style={{ fontFamily: "'Bebas Neue','Impact','Arial Black',sans-serif" }}
                      >
                        INFINITY PRATHAMESH
                      </h3>

                      <p className="text-sm text-slate-500 mt-2">
                        Bajaj Nagar, Nagpur
                      </p>

                      <p className="text-sm text-slate-700 leading-relaxed mt-3"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Architecture that blends heritage with innovation.
                      </p>

                      <div className="flex items-center justify-between mt-5">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Ongoing
                        </span>

                        <Link 
                          to="/projects/4"
                          className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                          View Project
                        </Link>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project 5 */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="lg:col-span-6 md:col-span-6 col-span-1 group relative pb-24"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
                      <img
                        src="/punyashlok.jpg"
                        alt="Infinity Punyashlok"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/images/projects/fallback.jpg";
                        }}
                        className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute bottom-[-40px] left-10 bg-white rounded-xl p-6 shadow-xl border border-white/20 max-w-[360px]">
                      <h3
                        className="text-xl font-semibold text-slate-900"
                        style={{ fontFamily: "'Bebas Neue','Impact','Arial Black',sans-serif" }}
                      >
                        INFINITY PUNYASHLOK
                      </h3>

                      <p className="text-sm text-slate-500 mt-2">
                        Bajaj Nagar, Nagpur
                      </p>

                      <p className="text-sm text-slate-700 leading-relaxed mt-3"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Premium living designed for lasting comfort.
                      </p>

                      <div className="flex items-center justify-between mt-5">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Completed
                        </span>

                        <Link 
                          to="/projects/5"
                          className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                          View Project
                        </Link>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project 6 */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="lg:col-span-6 md:col-span-6 col-span-1 group relative pb-24"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
                      <img
                        src="/Nirman.jpg"
                        alt="Infinity Nirman"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/images/projects/fallback.jpg";
                        }}
                        className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute bottom-[-40px] left-10 bg-white rounded-xl p-6 shadow-xl border border-white/20 max-w-[360px]">
                      <h3
                        className="text-xl font-semibold text-slate-900"
                        style={{ fontFamily: "'Bebas Neue','Impact','Arial Black',sans-serif" }}
                      >
                        INFINITY NIRMAN
                      </h3>

                      <p className="text-sm text-slate-500 mt-2">
                        Bajaj Nagar, Nagpur
                      </p>

                      <p className="text-sm text-slate-700 leading-relaxed mt-3"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        A bold statement of craftsmanship and modern structure.
                      </p>

                      <div className="flex items-center justify-between mt-5">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Ongoing
                        </span>

                        <Link 
                          to="/projects/6"
                          className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                          View Project
                        </Link>
                      </div>
                    </div>
                  </motion.div>

                </div>

                {/* Magnetic "View More Projects" Button */}
                <div className="flex justify-center mt-24">
                  <MagneticButton>
                    <Link 
                      to="/projects"
                      className="bg-[#FF4433] text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View More Projects
                    </Link>
                  </MagneticButton>
                </div>

              </div>

            </section>
          </ScrollReveal>

          <ScrollReveal>
            <ProcessSection />
          </ScrollReveal>

          <ScrollReveal>
            <section className="container-pro py-24 relative z-20">
              <div className="text-center max-w-2xl mx-auto mb-16">
               {/* <h2 className="text-4xl font-bold text-slate-900">What Our Clients Say</h2> */}
               {/* <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4"></div> */}
              </div>
              <TestimonialsSlider />
            </section>
          </ScrollReveal>

          <ScrollReveal>
            {/* Desktop Version - Keep 100% Original */}
            <div className="hidden md:block">
              <FounderVisionDock />
            </div>

            {/* Mobile Version - New Separate File */}
            <div className="block md:hidden">
              <FounderVisionDockMobile />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}