import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { DraggableItem, DropZone, SortableItem } from "./components/DragNDrop"
import { useSections } from "../../../features/section/hooks"
import { publishSurvey } from "../../../features/survey/api"
import toast from "react-hot-toast"

interface QuestionItem {
  id: string
  type: 'header' | 'multiple-choice' | 'likert-scale' | 'short-text'
  title: string
  icon: string
  content?: any
}

const CreateSurvey = () => {
  
  const [droppedItems, setDroppedItems] = useState<QuestionItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  

  const [surveyTitle, setSurveyTitle] = useState('')
  const [surveyDescription, setSurveyDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [assignedSection, setAssignedSection] = useState<string[]>([])
  
  // Survey settings
  const [surveyStatus, setSurveyStatus] = useState<'active' | 'inactive'>('active')
  const [responseEditing, setResponseEditing] = useState<boolean>(true)

  const { data } = useSections()
  const sections = data?.results
  
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  
  const availableElements: QuestionItem[] = [
    {
      id: 'header-template',
      type: 'header',
      title: 'Heading',
      icon: '/Header.svg'
    },
    {
      id: 'multiple-choice-template',
      type: 'multiple-choice',
      title: 'Multiple Choice',
      icon: '/mChoice.svg'
    },
    {
      id: 'likert-scale-template',
      type: 'likert-scale',
      title: 'Likert Scale',
      icon: '/likertScale.svg'
    },
    {
      id: 'short-text-template',
      type: 'short-text',
      title: 'Short Text',
      icon: '/shortText.svg'
    }
  ]

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    
    const draggedElement = availableElements.find(el => el.id === active.id)
    
    if (draggedElement && (over.id === 'survey-drop-zone' || droppedItems.find(item => item.id === over.id))) {
      
      const newItem: QuestionItem = {
        ...draggedElement,
        id: `${draggedElement.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: getDefaultContent(draggedElement.type)
      }
      
      
      if (over.id !== 'survey-drop-zone') {
        const overIndex = droppedItems.findIndex(item => item.id === over.id)
        setDroppedItems(prev => {
          const newItems = [...prev]
          newItems.splice(overIndex + 1, 0, newItem)
          return newItems
        })
      } else {
        
        setDroppedItems(prev => [...prev, newItem])
      }
      return
    }

    
    if (active.id !== over.id && droppedItems.find(item => item.id === active.id)) {
      setDroppedItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)

        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(items, oldIndex, newIndex)
        }
        return items
      })
    }
  }

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'header':
        return { text: '' }
      case 'multiple-choice':
        return { question: '', options: ['Option 1', 'Option 2'] }
      case 'likert-scale':
        return { 
          statement: '', 
          scaleLabels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] 
        }
      case 'short-text':
        return { question: '' }
      default:
        return {}
    }
  }

  const updateItemContent = (id: string, field: string, value: any) => {
    setDroppedItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          content: {
            ...item.content,
            [field]: value
          }
        }
      }
      return item
    }))
  }

  const addOption = (id: string) => {
    setDroppedItems(prev => prev.map(item => {
      if (item.id === id && item.type === 'multiple-choice') {
        const currentOptions = item.content?.options || []
        return {
          ...item,
          content: {
            ...item.content,
            options: [...currentOptions, `Option ${currentOptions.length + 1}`]
          }
        }
      }
      return item
    }))
  }

  const removeOption = (id: string, optionIndex: number) => {
    setDroppedItems(prev => prev.map(item => {
      if (item.id === id && item.type === 'multiple-choice') {
        const currentOptions = item.content?.options || []
        if (currentOptions.length > 2) { // Keep at least 2 options
          const filteredOptions = currentOptions.filter((_: any, index: number) => index !== optionIndex)
          
          // Renumber options that are still using default numbering
          const renumberedOptions = filteredOptions.map((option: string, newIndex: number) => {
            // Check if the option is using default numbering pattern (empty or "Option X")
            const isEmpty = !option.trim()
            const isDefaultOption = /^Option \d+$/.test(option.trim())
            
            if (isEmpty || isDefaultOption) {
              return `Option ${newIndex + 1}`
            }
            return option
          })
          
          return {
            ...item,
            content: {
              ...item.content,
              options: renumberedOptions
            }
          }
        }
      }
      return item
    }))
  }

  const addLikertLabel = (id: string) => {
    setDroppedItems(prev => prev.map(item => {
      if (item.id === id && item.type === 'likert-scale') {
        const currentLabels = item.content?.scaleLabels || []
        return {
          ...item,
          content: {
            ...item.content,
            scaleLabels: [...currentLabels, `Scale ${currentLabels.length + 1}`]
          }
        }
      }
      return item
    }))
  }

  const removeLikertLabel = (id: string, labelIndex: number) => {
    setDroppedItems(prev => prev.map(item => {
      if (item.id === id && item.type === 'likert-scale') {
        const currentLabels = item.content?.scaleLabels || []
        if (currentLabels.length > 2) { // Keep at least 2 labels
          return {
            ...item,
            content: {
              ...item.content,
              scaleLabels: currentLabels.filter((_: any, index: number) => index !== labelIndex)
            }
          }
        }
      }
      return item
    }))
  }

  const handleDelete = (id: string) => {
    setDroppedItems(prev => prev.filter(item => item.id !== id))
  }

  const activeItem = availableElements.find(item => item.id === activeId)

  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!surveyTitle.trim()) {
      newErrors.title = 'Survey title is required'
    }

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

    if (droppedItems.length === 0) {
      newErrors.questions = 'At least one question is required'
    }

    
    for (const item of droppedItems) {
      if (item.type === 'header' && !item.content?.text?.trim()) {
        newErrors.questions = 'All heading elements must have text'
        break
      }
      if (item.type === 'multiple-choice' && !item.content?.question?.trim()) {
        newErrors.questions = 'All multiple choice questions must have question text'
        break
      }
      if (item.type === 'likert-scale' && !item.content?.statement?.trim()) {
        newErrors.questions = 'All Likert scale questions must have statement text'
        break
      }
      if (item.type === 'short-text' && !item.content?.question?.trim()) {
        newErrors.questions = 'All short text questions must have question text'
        break
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  
  const handleSaveDraft = async () => {
    setIsSubmitting(true)
    try {
      const surveyData = {
        title: surveyTitle,
        dueDate,
        assignedSection,
        questions: droppedItems,
        status: 'draft',
        createdAt: new Date().toISOString()
      }
      
      
      console.log('Saving draft:', surveyData)
      
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Survey saved as draft!')
    } catch (error) {
      console.error('Error saving draft:', error)
      alert('Error saving draft. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  
  const handlePublish = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      // Include all questions (headers will be converted to text questions)
      const questionsToPublish = droppedItems.map(item => {
        // Ensure all questions have some text content
        if (!item.content) {
          item.content = getDefaultContent(item.type)
        }
        return item
      })
      
      const result = await publishSurvey({
        title: surveyTitle,
        description: surveyDescription.trim() || `Survey created on ${new Date().toLocaleDateString()}`,
        questions: questionsToPublish,
        sections: assignedSection.map(id => parseInt(id)),
        dueDate
      })
      
      console.log('Survey published successfully:', result)
      toast.success(`Survey "${surveyTitle}" pulished successfully!`)
      
      // Reset form after successful submission
      setSurveyTitle('')
      setSurveyDescription('')
      setDueDate('')
      setAssignedSection([])
      setDroppedItems([])
      setSurveyStatus('active')
      setResponseEditing(true)
      setErrors({})
      
    } catch (error: any) {
      console.error('Error publishing survey:', error)
      let errorMessage = 'Error publishing survey. Please try again.'
      
      if (error?.response?.data) {
        const errorData = error.response.data
        if (typeof errorData === 'string') {
          errorMessage = errorData
        } else if (errorData.detail) {
          errorMessage = errorData.detail
        } else if (errorData.message) {
          errorMessage = errorData.message
        } else {
          // Handle field-specific errors
          const fieldErrors = Object.values(errorData).flat().join(', ')
          if (fieldErrors) {
            errorMessage = `Validation errors: ${fieldErrors}`
          }
        }
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <section className='space-y-8 max-h-full'>
        <div className='h-10 md:h-15 flex items-center justify-between'>
          <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-semibold">Create New Survey</h1>
          <div>
            <button
                onClick={handlePublish}
                disabled={isSubmitting || !surveyTitle.trim() || !dueDate || !assignedSection || droppedItems.length === 0}
                className={`flex-1 shadow-lg shadow-black/30 px-4 py-2 bg-[#F37611] text-white rounded-lg hover:bg-[#F37611] transition-colors ${
                  isSubmitting || !surveyTitle.trim() || !dueDate || !assignedSection || droppedItems.length === 0
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
                {isSubmitting ? 'Publishing...' : 'Publish'}
              </button>
          </div>
        </div>

        <div className='bg-[#FBA02C] p-4 rounded-2xl'>
          <div className='w-full flex items-center justify-center text-white gap-x-40'>
            <div className='font-semibold text-sm sm:text-base md:text-lg'>Questions</div>
            <div className='font-semibold text-sm sm:text-base md:text-lg'>Responses</div>
            <div className='font-semibold text-sm sm:text-base md:text-lg'>Settings</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-4">
          {/* Left Panel - Elements */}
          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-3xl overflow-hidden shadow-md shadow-black/20 w-full sm:max-w-[16rem] md:max-w-xs ml-0 sm:ml-0 h-auto">
            <div className="text-black font-bold text-sm sm:text-base md:text-lg mb-2">
              <h1>Elements</h1>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-black font-normal text-sm sm:text-base md:text-lg mt-2">
                <h2 className="mb-1">Basic</h2>
                <DraggableItem item={availableElements[0]} />
              </div>

              <div className="text-black font-normal text-sm sm:text-base md:text-lg mt-2">
                <h2 className="mb-1">Questions</h2>
                <div className="space-y-2">
                  <DraggableItem item={availableElements[1]} />
                  <DraggableItem item={availableElements[2]} />
                  <DraggableItem item={availableElements[3]} />
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Survey Form */}
          <div className="bg-white p-4 rounded-2xl shadow-md shadow-black/20 w-full lg:flex-1 h-auto max-w-2xl">
            <h2 className="text-black font-bold text-lg mb-4">Survey Title</h2>
            <div className={`bg-transparent border-2 rounded-lg p-3 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}>
              <input 
                type="text" 
                placeholder="Enter survey title..." 
                className="w-full bg-transparent outline-none text-gray-800" 
                value={surveyTitle}
                onChange={(e) => {
                  setSurveyTitle(e.target.value)
                  if (errors.title) {
                    setErrors(prev => ({ ...prev, title: '' }))
                  }
                }}
              />
            </div>
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

             {/* For Description */}
            <h2 className="text-black font-bold text-lg mb-4">Survey Description</h2>
            <div className={`bg-transparent border-2 rounded-lg p-3 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}>
              <textarea 
                placeholder="Enter survey description..." 
                className="w-full bg-transparent outline-none text-gray-800 resize-none" 
                value={surveyDescription}
                rows={4}
                onChange={(e) => {
                  setSurveyDescription(e.target.value)
                  if (errors.description) {
                    setErrors(prev => ({ ...prev, description: '' }))
                  }
                }}
              />
            </div>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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

            <hr className="my-4 border-gray-300" />

            {/* Drop Zone */}
            <DropZone>
              <SortableContext items={droppedItems} strategy={verticalListSortingStrategy}>
                {droppedItems.length === 0 ? (
                  <div className="text-center text-gray-500 min-h-[150px] flex flex-col items-center justify-center">
                    <img src="/drag_n_drop_icon.svg" alt="Drag and drop icon" className="mx-auto mb-4 w-12 h-12" />
                    <p className="text-sm">Drag and drop your questions here</p>
                  </div>
                ) : (
                  <div className="space-y-3 min-h-[100px]">
                    {droppedItems.map((item) => (
                      <SortableItem
                        key={item.id}
                        item={item}
                        onDelete={handleDelete}
                        updateContent={updateItemContent}
                        addOption={addOption}
                        removeOption={removeOption}
                        addLikertLabel={addLikertLabel}
                        removeLikertLabel={removeLikertLabel}
                        isEditing={false}
                      />
                    ))}
                    
                    <div className="min-h-[50px] flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-transparent hover:border-gray-300 rounded-lg transition-colors">
                      Drop here to add more questions
                    </div>
                  </div>
                )}
              </SortableContext>
            </DropZone>

           
            {errors.questions && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.questions}
              </div>
            )}


            

            
            {/* <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handleSaveDraft}
                disabled={isSubmitting}
                className={`flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Saving...' : 'Save as Draft'}
              </button>
              
              <button
                onClick={handlePublish}
                disabled={isSubmitting || !surveyTitle.trim() || !dueDate || !assignedSection || droppedItems.length === 0}
                className={`flex-1 px-4 py-2 bg-[#F37611] text-white rounded-lg hover:bg-[#E68900] transition-colors ${
                  isSubmitting || !surveyTitle.trim() || !dueDate || !assignedSection || droppedItems.length === 0
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Survey'}
              </button>
            </div> */}

          </div>

          {/* Settings*/}
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
      </section>

      <DragOverlay>
        {activeItem ? <DraggableItem item={activeItem} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default CreateSurvey