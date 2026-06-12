import { useState } from 'react';
import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface LikertFieldProps {
  question: any;
  register: UseFormRegister<any>; 
  setValue: UseFormSetValue<any>;
}

export const LikertField = ({ question, register, setValue }: LikertFieldProps) => {
  const fieldName = `q${question.order}`;
  const [selected, setSelected] = useState('')

  const handleSelect = (value: string) =>{
    if (selected === value){
      setValue(fieldName, '')
      setSelected('')
    }else{
      setValue(fieldName, value)
      setSelected(value)
    }
  }

  const handleClear = () =>{
    setValue(fieldName, '')
    setSelected('')
  }

  return (
    <fieldset className="space-y-5">
      <legend className="text-2xl font-semibold">{question?.order}. {question?.text}</legend>
      {selected && (
        <button type="button" onClick={handleClear} className='text-red-500 mb-3'>
          Remove Answer
        </button>
      )}
      <div className="flex justify-between">
        {question?.question_choices?.map((choice: any, index: number) =>(
          <div key={index} className="flex flex-col items-center gap-y-2 text-[#595959]">
            <input id={`${fieldName}-${index}`} required { ...register(fieldName) } value={choice?.text}
            type="radio" className="radio" checked={selected === choice?.text}
            onChange={() => handleSelect(choice?.text)} />
            <label htmlFor={`${fieldName}-${index}`}>{index + 1}</label>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5 text-sm">
        <span>{question?.question_choices?.[0]?.text}</span>
        <span>{question?.question_choices?.[question?.question_choices?.length - 1]?.text}</span>
      </div>
    </fieldset>
  )
}
