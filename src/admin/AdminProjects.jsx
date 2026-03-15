import { useState, useEffect } from 'react'

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    status: 'ongoing',
    shortDescription: '',
    fullDescription: '',
    image: null,
    primaryImage: null,
    secondaryImages: []
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  // Normalize projects to ensure safe access to new fields
  const normalizedProjects = projects.map(p => ({
    ...p,
    secondaryImages: p.secondaryImages || []
  }))

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`)
      
      const text = await response.text()
      
      let data
      try {
        data = JSON.parse(text)
      } catch {
        console.error("Invalid JSON response:", text)
        throw new Error("Server returned invalid response")
      }
      
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
      alert('Failed to fetch projects: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }))
  }

  const handlePrimaryImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      primaryImage: e.target.files[0]
    }))
  }

  const handleSecondaryImagesChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      secondaryImages: [...(prev.secondaryImages || []), ...files]
    }))
  }

  const removeSecondaryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      secondaryImages: prev.secondaryImages.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.location || !formData.status || !formData.shortDescription || !formData.fullDescription) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('status', formData.status)
      formDataToSend.append('shortDescription', formData.shortDescription)
      formDataToSend.append('fullDescription', formData.fullDescription)
      
      if (formData.image) {
        formDataToSend.append('image', formData.image)
      }
      
      if (formData.primaryImage) {
        formDataToSend.append('primaryImage', formData.primaryImage)
      }
      
      // Send safe array of secondary images
      const safeSecondaryImages = formData.secondaryImages || []
      safeSecondaryImages.forEach((file, index) => {
        formDataToSend.append('secondaryImages', file)
      })

      console.log("Submitting project:", {
        title: formData.title,
        location: formData.location,
        status: formData.status,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription
      })

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`, {
        method: 'POST',
        body: formDataToSend
      })

      const text = await response.text()
      
      console.log("Server response:", text)

      if (response.ok) {
        const data = JSON.parse(text)
        alert('Project added successfully')
        resetForm()
        fetchProjects()
      } else {
        let errorData
        try {
          errorData = JSON.parse(text)
        } catch {
          errorData = { message: 'Server returned invalid response' }
        }
        throw new Error(errorData.message || 'Failed to add project')
      }
    } catch (error) {
      console.error('Error adding project:', error)
      alert('Failed to add project: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project) => {
    setIsEditing(true)
    setEditingProject(project)
    setFormData({
      title: project.name,
      location: project.location,
      status: project.status.toLowerCase(),
      shortDescription: project.description,
      fullDescription: project.fullDescription || '',
      image: null
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.location || !formData.status || !formData.shortDescription || !formData.fullDescription) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('status', formData.status)
      formDataToSend.append('shortDescription', formData.shortDescription)
      formDataToSend.append('fullDescription', formData.fullDescription)
      
      if (formData.image) {
        formDataToSend.append('image', formData.image)
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects/${editingProject.id}`, {
        method: 'PUT',
        body: formDataToSend
      })

      if (response.ok) {
        alert('Project updated successfully')
        resetForm()
        fetchProjects()
      } else {
        throw new Error('Failed to update project')
      }
    } catch (error) {
      console.error('Error updating project:', error)
      alert('Failed to update project')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects/${projectId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Project deleted successfully')
        fetchProjects()
      } else {
        throw new Error('Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setIsEditing(false)
    setEditingProject(null)
    setFormData({
      title: '',
      location: '',
      status: 'ongoing',
      shortDescription: '',
      fullDescription: '',
      image: null
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-pro">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Projects</h1>
          <button
            onClick={resetForm}
            disabled={loading}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
          >
            {isEditing ? 'Cancel Edit' : 'Reset Form'}
          </button>
        </div>

        {/* Add/Edit Project Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>
          
          <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 max-md:text-sm">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-md:text-sm"
                  placeholder="Enter project title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 max-md:text-sm">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-md:text-sm"
                  placeholder="Enter project location"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 max-md:text-sm">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-md:text-sm"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 max-md:text-sm">
                  Image Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-md:text-sm"
                />
                {formData.image && (
                  <p className="mt-2 text-sm text-gray-600 max-md:text-xs">
                    Selected: {formData.image.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 max-md:text-sm">
                Short Description *
              </label>
              <textarea
                value={formData.shortDescription}
                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-md:text-sm"
                placeholder="Enter short description (1-2 lines)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 max-md:text-sm">
                Full Description
              </label>
              <textarea
                value={formData.fullDescription}
                onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-md:text-sm"
                placeholder="Enter full project description"
              />
            </div>

            {/* Primary Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 max-md:text-sm">
                Primary Project Image (Building / Apartment)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePrimaryImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-md:text-sm"
              />
              {formData.primaryImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2 max-md:text-xs">Selected: {formData.primaryImage.name}</p>
                  <img
                    src={URL.createObjectURL(formData.primaryImage)}
                    alt="Primary preview"
                    className="w-32 h-24 object-cover rounded-md border max-md:w-24 max-md:h-16"
                  />
                </div>
              )}
            </div>

            {/* Secondary Gallery Images Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 max-md:text-sm">
                Project Gallery Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleSecondaryImagesChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-md:text-sm"
              />
              {(formData.secondaryImages || []).length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2 max-md:text-xs">Selected images:</p>
                  <div className="flex flex-wrap gap-2">
                    {(formData.secondaryImages || []).map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Gallery ${index + 1}`}
                          className="w-20 h-16 object-cover rounded-md border max-md:w-16 max-md:h-12"
                        />
                        <button
                          type="button"
                          onClick={() => removeSecondaryImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 max-md:w-4 max-md:h-4"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors max-md:px-4 max-md:py-2 max-md:text-sm"
              >
                {loading ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Project' : 'Add Project')}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors max-md:px-4 max-md:py-2 max-md:text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project List</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No projects found. Add your first project above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {project.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {project.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          project.status.toLowerCase() === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}