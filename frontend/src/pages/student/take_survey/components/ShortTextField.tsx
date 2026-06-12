import type { UseFormRegister } from 'react-hook-form';

interface ShortTextFieldProps {
  question: any;
  register: UseFormRegister<any>; 
}
export const ShortTextField = ({ question, register }: ShortTextFieldProps) => {
  return (
    <fieldset className="space-y-5">
      <legend className="text-2xl font-semibold">{question?.order}. {question?.text}</legend>
      <textarea { ...register(`q${question?.order}`) } className="w-full h-50 p-4 
      outline-none rounded-xl border-2 border-[#9E9C9C]" placeholder="Type your answer here..."></textarea>
    </fieldset>
  )
}
