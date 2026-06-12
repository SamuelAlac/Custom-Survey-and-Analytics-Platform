import { useState } from 'react';
import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface McqFieldProps {
  question: any;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
}

export const McqField = ({ question, register, setValue }: McqFieldProps) => {
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
      <div className="flex flex-col gap-y-5 text-[#595959]">
          {question?.question_choices?.map((choice: any, index: number) =>(
          <div key={index} className="space-x-2">
            <input id={`${fieldName}-${index}`} required { ...register(fieldName) } type="radio" className="radio" value={choice?.text}
            checked={selected === choice?.text} onChange={() => handleSelect(choice?.text)} />
            <label htmlFor={`${fieldName}-${index}`}>{choice?.text}</label>
          </div>
          ))}
      </div>
    </fieldset>
  )
}
