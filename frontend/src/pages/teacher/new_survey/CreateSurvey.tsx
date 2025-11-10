import { Link } from "react-router-dom"
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
  const [dueDate, setDueDate] = useState('')
  const [assignedSection, setAssignedSection] = useState('')

  
  
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
          return {
            ...item,
            content: {
              ...item.content,
              options: currentOptions.filter((_: any, index: number) => index !== optionIndex)
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

    if (!assignedSection.trim()) {
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
      const surveyData = {
        title: surveyTitle,
        dueDate,
        assignedSection,
        questions: droppedItems,
        status: 'published',
        createdAt: new Date().toISOString()
      }
      
      
      console.log('Publishing survey:', surveyData)
      
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Survey published successfully!')
      
      
    } catch (error) {
      console.error('Error publishing survey:', error)
      alert('Error publishing survey. Please try again.')
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
          <Link to='Dashboard' className='text-[#F37611]'>Back to Dashboard</Link>
        </div>

        <div className='bg-[#FBA02C] p-4 rounded-2xl'>
          <div className='w-full flex items-center justify-center text-white gap-x-40'>
            <div className='font-semibold text-sm sm:text-base md:text-lg'>Questions</div>
            <div className='font-semibold text-sm sm:text-base md:text-lg'>Responses</div>
            <div className='font-semibold text-sm sm:text-base md:text-lg'>Settings</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4">
          
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

          
          <div className="bg-white p-4 rounded-2xl shadow-md shadow-black/20 w-full md:w-1/2 lg:w-2/5 h-auto md:ml-15 max-w-2xl">
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
                <div className={`bg-transparent border-2 rounded-lg p-3 ${errors.section ? 'border-red-500' : 'border-gray-300'}`}>
                  <input 
                    type="text" 
                    placeholder="Yr/Section/Group" 
                    className="w-full bg-transparent outline-none text-gray-800" 
                    value={assignedSection}
                    onChange={(e) => {
                      setAssignedSection(e.target.value)
                      if (errors.section) {
                        setErrors(prev => ({ ...prev, section: '' }))
                      }
                    }}
                  />
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

            
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-200">
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
                disabled={isSubmitting || !surveyTitle.trim() || !dueDate || !assignedSection.trim() || droppedItems.length === 0}
                className={`flex-1 px-4 py-2 bg-[#F37611] text-white rounded-lg hover:bg-[#E66600] transition-colors ${
                  isSubmitting || !surveyTitle.trim() || !dueDate || !assignedSection.trim() || droppedItems.length === 0
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Survey'}
              </button>
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