import {
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
interface QuestionItem {
  id: string
  type: 'header' | 'multiple-choice' | 'likert-scale' | 'short-text'
  title: string
  icon: string
  content?: any
}

export const DraggableItem = ({ item, isOverlay = false }: { item: QuestionItem; isOverlay?: boolean }) => {
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

export const SortableItem = ({ 
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

export const DropZone = ({ children }: { children: React.ReactNode }) => {
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