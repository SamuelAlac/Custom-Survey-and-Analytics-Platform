import React from 'react'

export const McqFieldSkeleton = () => {
  return (
    <div className="space-y-5">
      <legend className="text-2xl font-semibold skeleton h-5 w-100"></legend>
      <div className="flex flex-col gap-y-5 text-[#595959]">
          <div className="space-x-2">
            <input id={`${fieldName}-${index}`} required { ...register(fieldName) } type="radio" className="radio" value={choice?.text}
            checked={selected === choice?.text} onChange={() => handleSelect(choice?.text)} />
            <label htmlFor={`${fieldName}-${index}`}>{choice?.text}</label>
          </div>
      </div>
    </div>
  )
}
