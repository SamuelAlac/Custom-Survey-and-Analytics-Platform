// import { useDroppable } from '@dnd-kit/core';
// import React, { type FC } from 'react'
// interface ISurveyDroppable {
//     items: string[];
// }

import { useDraggable, useDroppable } from "@dnd-kit/core"
import { Children } from "react"

// export const SurveyDroppable: FC<ISurveyDroppable> = (props) => {
//     const { setNodeRef } = useDroppable({
//         id: 'survey-droppable'
//     })
//   return (
//     <button className='bg-[#FFD9B3] w-full p-3 flex gap-3 items-center rounded-lg cursor-grab'>
//         <img src='/mcq_icon.svg' alt="Heading Icon" className='w-5'/>
//         <p className='text-[#F37611] font-semibold'>Multiple Choice</p>
//     </button>
//   )
// }

export const DraggableItem = ({ id, label, icon }: any) =>{
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  const style = {
    transform: transform
    ? `translate3d(${transform.x}px ${transform.y}px,0)`
    : undefined,
  }

  return (
    <button ref={setNodeRef} style={style} { ...attributes } { ...listeners }
    className="bg-[#FFD9B3] w-full p-3 flex gap-3 items-center rounded-lg cursor-grab">
      <img src={icon} alt={label} className="w-5" />
      <p className="text-[#F37611] font-semibold">{label}</p>
    </button>
  )
}

export const DroppableArea = ({ id, Children }: any) =>{
  const { isOver, setNodeRef } = useDroppable({ id })

  return(
    <div className={`w-full h-40 rounded-xl outline-dashed outline-[#ACA6A7] bg-[#E0E0E0] 
    mt-5 flex justify-center items-center transition-colors 
    ${isOver ? 'bg-orange-100 outline-[#F37611]' : 'bg-[#E0E0E0] outline-[#ACA6A7]'}`}>
      { Children }
    </div>
  )
}
