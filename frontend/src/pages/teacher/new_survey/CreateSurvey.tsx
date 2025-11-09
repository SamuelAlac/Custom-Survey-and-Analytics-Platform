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
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// Define question types
interface QuestionItem {
  id: string
  type: 'header' | 'multiple-choice' | 'likert-scale' | 'short-text'
  title: string
  icon: string
  content?: any
}

// Draggable item component
const DraggableItem = ({ item, isOverlay = false }: { item: QuestionItem; isOverlay?: boolean }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
  })

  if (isOverlay) {
    return (
      <div className="bg-[#FFD9B3] p-3 sm:p-4 rounded-lg flex items-center gap-3 cursor-grabbing opacity-80 shadow-lg">
        <img src={item.icon} alt={`${item.title} icon`} className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-[#F37611] text-sm sm:text-base md:text-lg font-semibold">{item.title}</span>
      </div>
    )
  }

  return (
    <div 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-[#FFD9B3] p-3 sm:p-4 rounded-lg flex items-center gap-3 cursor-grab touch-none ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <img src={item.icon} alt={`${item.title} icon`} className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-[#F37611] text-sm sm:text-base md:text-lg font-semibold">{item.title}</span>
    </div>
  )
}

// Sortable item component for dropped items  
const SortableItem = ({ 
  item, 
  onDelete, 
  updateContent, 
  addOption, 
  removeOption, 
  addLikertLabel,
  removeLikertLabel,
  isEditing 
}: { 
  item: QuestionItem; 
  onDelete: (id: string) => void;
  updateContent: (id: string, field: string, value: any) => void;
  addOption: (id: string) => void;
  removeOption: (id: string, optionIndex: number) => void;
  addLikertLabel: (id: string) => void;
  removeLikertLabel: (id: string, labelIndex: number) => void;
  isEditing: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border-2 rounded-lg p-4 mb-3 transition-all ${
        isDragging ? 'opacity-50' : ''
      } ${
        isEditing ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div 
          {...attributes}
          {...listeners}
          className="flex items-center gap-3 cursor-grab flex-1"
        >
          <img src={item.icon} alt={`${item.title} icon`} className="w-6 h-6" />
          <span className="font-semibold text-gray-800">{item.title}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDelete(item.id)
            }}
            className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
      
      {/* Content based on question type */}
      {item.type === 'header' && (
        <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            placeholder="Enter heading text..."
            className="w-full p-2 border border-gray-300 rounded"
            value={item.content?.text || ''}
            onChange={(e) => updateContent(item.id, 'text', e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
          />
        </div>
      )}
      
      {item.type === 'multiple-choice' && (
        <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            placeholder="Question text..."
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={item.content?.question || ''}
            onChange={(e) => updateContent(item.id, 'question', e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
          />
          {(item.content?.options || ['Option 1', 'Option 2']).map((option: string, index: number) => (
            <div key={index} className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <input type="radio" disabled />
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                className="flex-1 p-1 border border-gray-300 rounded"
                value={option}
                onChange={(e) => {
                  const newOptions = [...(item.content?.options || [])]
                  newOptions[index] = e.target.value
                  updateContent(item.id, 'options', newOptions)
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
              />
              {(item.content?.options || []).length > 2 && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    removeOption(item.id, index)
                  }}
                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                  title="Remove option"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addOption(item.id)
            }}
            className="text-blue-600 hover:text-blue-800 text-sm mt-2 px-2 py-1 rounded hover:bg-blue-50"
          >
            + Add Option
          </button>
        </div>
      )}
      
      {item.type === 'likert-scale' && (
        <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            placeholder="Statement text..."
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={item.content?.statement || ''}
            onChange={(e) => updateContent(item.id, 'statement', e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
          />
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Scale Labels:</p>
            {(item.content?.scaleLabels || ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']).map((label: string, index: number) => (
              <div key={index} className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                <input
                  type="text"
                  placeholder={`Scale label ${index + 1}`}
                  className="flex-1 p-1 border border-gray-300 rounded text-sm"
                  value={label}
                  onChange={(e) => {
                    const newLabels = [...(item.content?.scaleLabels || [])]
                    newLabels[index] = e.target.value
                    updateContent(item.id, 'scaleLabels', newLabels)
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                />
                {(item.content?.scaleLabels || []).length > 2 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      removeLikertLabel(item.id, index)
                    }}
                    className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                    title="Remove scale label"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addLikertLabel(item.id)
              }}
              className="text-blue-600 hover:text-blue-800 text-sm mt-2 px-2 py-1 rounded hover:bg-blue-50"
            >
              + Add Scale Label
            </button>
          </div>
          
          <div className="mt-3 p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600 mb-2">Preview:</p>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              {(item.content?.scaleLabels || ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']).map((label: string, index: number) => (
                <span key={index} className="text-center flex-1">{label}</span>
              ))}
            </div>
            <div className="flex justify-between">
              {(item.content?.scaleLabels || ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']).map((_: any, index: number) => (
                <input key={index} type="radio" disabled className="mx-auto" />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {item.type === 'short-text' && (
        <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            placeholder="Question text..."
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={item.content?.question || ''}
            onChange={(e) => updateContent(item.id, 'question', e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
          />
          <input
            type="text"
            placeholder="Answer will appear here..."
            className="w-full p-2 border border-gray-300 rounded bg-gray-50"
            disabled
          />
        </div>
      )}
    </div>
  )
}

// Drop zone component
const DropZone = ({ children }: { children: React.ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'survey-drop-zone',
  })

  return (
    <div 
      ref={setNodeRef}
      className={`min-h-[200px] border-2 border-dashed rounded-lg p-4 transition-colors ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-[#ACA6A7] bg-[#E0E0E0]'
      }`}
    >
      {children}
    </div>
  )
}

const CreateSurvey = () => {
  const [droppedItems, setDroppedItems] = useState<QuestionItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  
  // Form state
  const [surveyTitle, setSurveyTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [assignedSection, setAssignedSection] = useState('')

  
  // Validation state
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available elements to drag
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

    // Check if we're dropping a template item (creating new question)
    const draggedElement = availableElements.find(el => el.id === active.id)
    
    if (draggedElement && (over.id === 'survey-drop-zone' || droppedItems.find(item => item.id === over.id))) {
      // Create a new item with unique ID
      const newItem: QuestionItem = {
        ...draggedElement,
        id: `${draggedElement.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: getDefaultContent(draggedElement.type)
      }
      
      // If dropping over an existing item, insert at that position
      if (over.id !== 'survey-drop-zone') {
        const overIndex = droppedItems.findIndex(item => item.id === over.id)
        setDroppedItems(prev => {
          const newItems = [...prev]
          newItems.splice(overIndex + 1, 0, newItem)
          return newItems
        })
      } else {
        // Add to end
        setDroppedItems(prev => [...prev, newItem])
      }
      return
    }

    // Handle reordering of existing items
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

  // Validation function
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

    // Validate question content
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

  // Save as draft
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
      
      // Here you would typically make an API call to save the draft
      console.log('Saving draft:', surveyData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Survey saved as draft!')
    } catch (error) {
      console.error('Error saving draft:', error)
      alert('Error saving draft. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Publish survey
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
      
      // Here you would typically make an API call to publish the survey
      console.log('Publishing survey:', surveyData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Survey published successfully!')
      
      // Redirect or clear form
      // navigate('/teacher/surveys')
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
          <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-bold">Create New Survey</h1>
          <Link to='Dashboard' className='text-[#F37611]'>Back to Dashboard</Link>
        </div>

        <div className='bg-[#FBA02C] p-4 rounded-2xl'>
          <div className='w-full flex items-center justify-between text-white'>
            <div className='font-semibold text-sm sm:text-base md:text-lg'>Questions</div>
            <div className='font-semibold text-sm sm:text-base md:text-lg'>Responses</div>
            <div className='font-semibold text-sm sm:text-base md:text-lg'>Settings</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4">
          {/* Elements Panel */}
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

          {/* Survey Builder Panel - Adjusted Right */}
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

            {/* Two fields: stacked on mobile, inline (2 columns) on md+ */}
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
                    {/* Empty space at bottom for additional drops */}
                    <div className="min-h-[50px] flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-transparent hover:border-gray-300 rounded-lg transition-colors">
                      Drop here to add more questions
                    </div>
                  </div>
                )}
              </SortableContext>
            </DropZone>

            {/* Validation Errors */}
            {errors.questions && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.questions}
              </div>
            )}

            {/* Action Buttons */}
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