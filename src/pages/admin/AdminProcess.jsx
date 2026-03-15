import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'

const AdminProcess = () => {
  const [steps, setSteps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingStep, setEditingStep] = useState(null)
  const [formData, setFormData] = useState({
    stepNumber: '',
    title: '',
    description: '',
    icon: ''
  })

  useEffect(() => {
    fetchSteps()
  }, [])

  const fetchSteps = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/process`)
      if (!response.ok) {
        throw new Error('Failed to fetch process steps')
      }
      const data = await response.json()
      setSteps(data)
    } catch (error) {
      console.error('Error fetching process steps:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (step) => {
    setEditingStep(step.id)
    setFormData({
      stepNumber: step.stepNumber,
      title: step.title,
      description: step.description,
      icon: step.icon
    })
  }

  const handleCancel = () => {
    setEditingStep(null)
    setFormData({ stepNumber: '', title: '', description: '', icon: '' })
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/process/${editingStep}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to update step')
      }

      const updatedStep = await response.json()
      setSteps(steps.map(step => step.id === editingStep ? updatedStep : step))
      setEditingStep(null)
      setFormData({ stepNumber: '', title: '', description: '', icon: '' })
    } catch (error) {
      setError(error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this step?')) return

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/process/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete step')
      }

      setSteps(steps.filter(step => step.id !== id))
    } catch (error) {
      setError(error.message)
    }
  }

  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'consultation':
        return '📋'
      case 'planning':
        return '📐'
      case 'materials':
        return '🏗️'
      case 'construction':
        return '🔨'
      case 'inspection':
        return '🔍'
      case 'delivery':
        return '🏠'
      default:
        return '📋'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-pro">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-48"></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-10 h-10 bg-gray-300 rounded"></div>
                      <div className="w-10 h-10 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-pro">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Process Manager</h1>
              <p className="text-gray-600 mt-2">Manage the 6-step construction workflow</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{steps.length}</div>
              <div className="text-sm text-gray-600">Total Steps</div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg max-md:hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-md:text-xs">Step</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-md:text-xs">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-md:text-xs">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-md:text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {steps.map((step) => (
                  <tr key={step.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap max-md:px-3 max-md:py-2">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 max-md:w-10 max-md:h-10">
                          <span className="text-2xl max-md:text-xl">{getStepIcon(step.icon)}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 max-md:text-sm">
                            Step {step.stepNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-md:px-3 max-md:py-2">
                      {editingStep === step.id ? (
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-md:px-2 max-md:py-1 max-md:text-sm"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900 max-md:text-sm">{step.title}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 max-md:px-3 max-md:py-2">
                      {editingStep === step.id ? (
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-md:px-2 max-md:py-1 max-md:text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-600 max-md:text-sm">{step.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 max-md:px-3 max-md:py-2">
                      {editingStep === step.id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 max-md:px-2 max-md:py-1 max-md:text-xs"
                          >
                            <Save className="w-4 h-4 mr-2 max-md:w-3 max-md:h-3" />
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 max-md:px-2 max-md:py-1 max-md:text-xs"
                          >
                            <X className="w-4 h-4 mr-2 max-md:w-3 max-md:h-3" />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(step)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 max-md:px-2 max-md:py-1 max-md:text-xs"
                          >
                            <Edit className="w-4 h-4 mr-2 max-md:w-3 max-md:h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(step.id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 max-md:px-2 max-md:py-1 max-md:text-xs"
                          >
                            <Trash2 className="w-4 h-4 mr-2 max-md:w-3 max-md:h-3" />
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="space-y-4 md:hidden">
              {steps.map((step) => (
                <div key={step.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-2xl">{getStepIcon(step.icon)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Step {step.stepNumber}</div>
                        <div className="text-sm text-gray-600">{step.title}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {editingStep === step.id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-xs"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(step)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(step.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {editingStep === step.id ? (
                      <>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </>
                    ) : (
                      <div className="text-sm text-gray-600">{step.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProcess