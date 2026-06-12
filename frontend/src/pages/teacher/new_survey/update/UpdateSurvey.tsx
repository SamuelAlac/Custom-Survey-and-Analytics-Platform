import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSurveyAssignmentWithSurvey } from "../../../../features/survey_assignment/hooks"
import { useSections } from "../../../../features/section/hooks"
import toast from "react-hot-toast"

const UpdateSurvey = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) return <p>Survey ID is missing</p>
  
  const { data } = useSurveyAssignmentWithSurvey({ id })
  const { data: sectionsData } = useSections()
  const sections = sectionsData?.results
  const survey = data?.survey_details
  const assignment = data

  // Form state
  const [surveyTitle, setSurveyTitle] = useState('')
  const [surveyDescription, setSurveyDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [assignedSection, setAssignedSection] = useState<string[]>([])
  const [surveyStatus, setSurveyStatus] = useState<'active' | 'inactive'>('active')
  const [responseEditing, setResponseEditing] = useState<boolean>(true)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load existing data when survey data is available
  useEffect(() => {
    if (survey && assignment) {
      setSurveyTitle(survey.title || '')
      setSurveyDescription(survey.description || '')
      
      if (assignment.due_date) {
        // Convert datetime to date input format
        const date = new Date(assignment.due_date)
        setDueDate(date.toISOString().split('T')[0])
      }
      
      // Set assigned sections with proper null checks
      if (assignment.sections && Array.isArray(assignment.sections)) {
        const validSections = assignment.sections
          .filter((section: any) => section && section.id !== undefined && section.id !== null)
          .map((section: any) => section.id.toString())
        setAssignedSection(validSections)
      }
      
      // Set survey settings
      setSurveyStatus(assignment.status || 'active')
      setResponseEditing(assignment.editable !== undefined ? assignment.editable : false)
    }
  }, [survey, assignment])

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required'
    } else {
      const selectedDate = new Date(dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past'
      }
    }

    if (!assignedSection || assignedSection.length === 0) {
      newErrors.section = 'Section assignment is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleUpdate = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      // Update survey assignment with new data
      const token = localStorage.getItem('access')
      if (!token) throw new Error('No access token found')

      const updateData = {
        due_date: new Date(dueDate).toISOString(),
        sections: assignedSection.map(id => parseInt(id)),
        status: surveyStatus,
        editable: responseEditing
      }

      const response = await fetch(`http://localhost:8000/api/core/survey-assignment-surveys/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })

      // const response = await updateSurveyAssignment(id, updateData)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to update survey')
      }

      const result = await response.json()
      console.log('Survey updated successfully:', result)
      
      toast.success(`Survey "${surveyTitle}" updated successfully!`)
      
      // Optionally refresh the data
      window.location.reload()
      
    } catch (error: any) {
      console.error('Error updating survey:', error)
      toast.error(error.message || 'Error updating survey. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!data || !survey || !assignment) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  // Debug log to check data structure
  console.log('Survey data:', survey)
  console.log('Assignment data:', assignment)

  return (
    <section className="space-y-8">
      <div className='h-10 md:h-15 flex items-center justify-between'>
        <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-semibold">Update Survey</h1>
        <div>
          <button
            onClick={handleUpdate}
            disabled={isSubmitting || !dueDate || assignedSection.length === 0}
            className={`flex-1 shadow-lg shadow-black/30 px-4 py-2 bg-[#F37611] text-white rounded-lg hover:bg-[#F37611] transition-colors ${
              isSubmitting || !dueDate || assignedSection.length === 0
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Survey'}
          </button>
        </div>
      </div>

      

      <div className="flex justify-center">
        <div className="flex flex-col lg:flex-row items-start gap-4 max-w-6xl w-full">
          {/* Survey Form */}
          <div className="bg-white p-4 rounded-2xl shadow-md shadow-black/20 w-full lg:flex-1 h-auto">
            <h2 className="text-black font-bold text-lg mb-4">Survey Title</h2>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3">
              <p className="w-full text-gray-800 font-medium">{surveyTitle}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">Title cannot be modified</p>

            {/* Survey Description */}
            <h2 className="text-black font-bold text-lg mb-4 mt-6">Survey Description</h2>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3">
              <p className="w-full text-gray-800">{surveyDescription || 'No description provided'}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">Description cannot be modified</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <h2 className="text-black font-bold text-lg mb-2">Due Date</h2>
              <div className={`bg-transparent border-2 rounded-lg p-3 ${errors.dueDate ? 'border-red-500' : 'border-gray-300'}`}>
                <input 
                  type="date" 
                  className="w-full bg-transparent outline-none text-gray-800" 
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value)
                    if (errors.dueDate) {
                      setErrors(prev => ({ ...prev, dueDate: '' }))
                    }
                  }}
                />
              </div>
              {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
            </div>

            <div>
              <h2 className="text-black font-bold text-lg mb-2">Assign to Section</h2>
              <div className="dropdown w-full">
                <label tabIndex={0} className="btn h-13 w-full justify-between border border-[#ACA6A7] bg-white text-black">
                  {assignedSection.length > 0
                    ? `Selected (${assignedSection.length})`
                    : "Select Year/Section/Group"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </label>
                <ul tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-auto border border-gray-300">
                    {sections?.map((section: any) => (
                      <li key={section.id}>
                        <label className="label cursor-pointer justify-start gap-2">
                          <input
                            type="checkbox"
                            checked={assignedSection.includes(section.id.toString())}
                            onChange={(e) => {
                              const value = section.id.toString()
                              if (e.target.checked) {
                                setAssignedSection((prev) => [...prev, value])
                              } else {
                                setAssignedSection((prev) => prev.filter((id) => id !== value))
                              }
                              if (errors.section) setErrors((prev) => ({ ...prev, section: '' }))
                            }}
                            className="checkbox checkbox-sm"
                          />
                          <span className="label-text">{section.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              {errors.section && <p className="text-red-500 text-sm mt-1">{errors.section}</p>}
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          {/* Questions Display (Read-only for now) */}
          <div className="mt-6">
            <h2 className="text-black font-bold text-lg mb-4">Survey Questions</h2>
            {survey.survey_questions && survey.survey_questions.length > 0 ? (
              <div className="space-y-4">
                {survey.survey_questions.map((question: any, index: number) => (
                  <div key={question.id} className="border-2 border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-md font-semibold text-gray-800">
                        Question {index + 1}: {question.question_type.toUpperCase()}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-3">{question.text}</p>
                    
                    {/* Show choices if they exist */}
                    {question.question_choices && question.question_choices.length > 0 && (
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">Choices:</p>
                        <ul className="space-y-1">
                          {question.question_choices.map((choice: any) => (
                            <li key={choice.id} className="text-sm text-gray-600">
                              • {choice.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No questions found for this survey</p>
              </div>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        <div className="bg-white p-2 sm:p-3 md:p-4 rounded-3xl overflow-hidden shadow-md shadow-black/20 w-full sm:max-w-[16rem] md:max-w-xs ml-0 sm:ml-0 h-auto">
          <div className="text-black font-bold text-sm sm:text-base md:text-lg mb-2">
            <h1>Settings</h1>
          </div>
          <div className="flex flex-col gap-4">
            {/* Survey Status Selection */}
            <div className="text-black font-normal text-sm">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-sm font-medium">Survey Status</h2>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSurveyStatus('active')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      surveyStatus === 'active'
                        ? 'bg-[#F37611] text-white font-medium'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setSurveyStatus('inactive')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      surveyStatus === 'inactive'
                        ? 'bg-[#F37611] text-white font-medium'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Inactive
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {surveyStatus === 'active' ? 'Survey is visible and accepting responses' : 'Survey is hidden and not accepting responses'}
              </p>
            </div>

            {/* Response Editing Toggle */}
            <div className="text-black font-normal text-sm">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-sm font-medium">Response Editing</h2>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={responseEditing}
                    onChange={(e) => setResponseEditing(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F37611]"></div>
                </label>
              </div>
              <p className="text-xs text-gray-500">
                {responseEditing ? 'Students can edit their responses after submission' : 'Responses are final after submission'}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default UpdateSurvey