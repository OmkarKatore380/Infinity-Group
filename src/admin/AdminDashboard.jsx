import { Link } from 'react-router-dom'
import AdminProjects from './AdminProjects.jsx'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="container-pro">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-slate-600">
            Website Management Panel
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            
            {/* Website Stats Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-md:p-6">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4 max-md:gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg max-md:w-10 max-md:h-10">
                      <svg className="w-6 h-6 text-white max-md:w-5 max-md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 max-md:text-xl">Website Stats</h2>
                      <p className="text-slate-600 mt-1 max-md:text-sm">
                        Update homepage statistics such as experience, projects and satisfaction rate.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-4 max-md:mt-4">
                    <Link 
                      to="/admin-stats"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 max-md:px-4 max-md:py-2 max-md:text-sm"
                    >
                      <svg className="w-5 h-5 mr-2 max-md:w-4 max-md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Stats
                    </Link>
                    
                    <Link 
                      to="/admin-stats"
                      className="inline-flex items-center px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-slate-400 hover:text-slate-900 transition-all duration-300 max-md:px-4 max-md:py-2 max-md:text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                
                {/* Stats Preview */}
                <div className="hidden lg:flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">25+</div>
                    <div className="text-sm text-slate-600">Years</div>
                  </div>
                  <div className="w-px h-12 bg-slate-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">700+</div>
                    <div className="text-sm text-slate-600">Families</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Manager Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-md:p-6">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4 max-md:gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg max-md:w-10 max-md:h-10">
                      <svg className="w-6 h-6 text-white max-md:w-5 max-md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 max-md:text-xl">Projects Manager</h2>
                      <p className="text-slate-600 mt-1 max-md:text-sm">
                        Add, edit, and manage project listings that appear on the homepage and projects page.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-4 max-md:mt-4">
                    <Link 
                      to="/admin/projects"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 max-md:px-4 max-md:py-2 max-md:text-sm"
                    >
                      <svg className="w-5 h-5 mr-2 max-md:w-4 max-md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Manage Projects
                    </Link>
                    
                    <Link 
                      to="/admin/projects"
                      className="inline-flex items-center px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-slate-400 hover:text-slate-900 transition-all duration-300 max-md:px-4 max-md:py-2 max-md:text-sm"
                    >
                      View Projects
                    </Link>
                  </div>
                </div>
                
                {/* Projects Preview */}
                <div className="hidden lg:flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">3+</div>
                    <div className="text-sm text-slate-600">Projects</div>
                  </div>
                  <div className="w-px h-12 bg-slate-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">2</div>
                    <div className="text-sm text-slate-600">Active</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Manager Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-md:p-6">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4 max-md:gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg max-md:w-10 max-md:h-10">
                      <svg className="w-6 h-6 text-white max-md:w-5 max-md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 max-md:text-xl">Process Manager</h2>
                      <p className="text-slate-600 mt-1 max-md:text-sm">
                        Manage the 6-step construction workflow that appears on the homepage.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-4 max-md:mt-4">
                    <Link 
                      to="/admin/process"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 max-md:px-4 max-md:py-2 max-md:text-sm"
                    >
                      <svg className="w-5 h-5 mr-2 max-md:w-4 max-md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Manage Process
                    </Link>
                    
                    <Link 
                      to="/admin/process"
                      className="inline-flex items-center px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-slate-400 hover:text-slate-900 transition-all duration-300 max-md:px-4 max-md:py-2 max-md:text-sm"
                    >
                      View Process
                    </Link>
                  </div>
                </div>
                
                {/* Process Preview */}
                <div className="hidden lg:flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">6</div>
                    <div className="text-sm text-slate-600">Steps</div>
                  </div>
                  <div className="w-px h-12 bg-slate-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">Active</div>
                    <div className="text-sm text-slate-600">Workflow</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Admin Tools (Future Expansion) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-50">
              
              {/* Services Management */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Services</h3>
                    <p className="text-sm text-slate-600">Manage service offerings</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-slate-500">
                  Coming soon
                </div>
              </div>

              {/* Team Management */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Team</h3>
                    <p className="text-sm text-slate-600">Manage team members</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-slate-500">
                  Coming soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
