import { useForm } from "react-hook-form";
import { McqField } from "./McqField";
import { LikertField } from "./LikertField";
import { ShortTextField } from "./ShortTextField";
import { createResponse } from "../../../../features/user/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

interface ResponseFormProps {
  survey_questions: any;
  id: string;
}

interface FormValues {
  [key: string]: string;
}

export const ResponseForm = ({ survey_questions, id }: ResponseFormProps) => {
  const QUESTIONS_PER_PAGE = 5;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(survey_questions.length / QUESTIONS_PER_PAGE);
  const startIndex = (page - 1) * QUESTIONS_PER_PAGE;
  const sortedQuestions = survey_questions.slice().sort((a: any, b: any) => a.order - b.order);
  const currentQuestions = sortedQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);


  const { register, handleSubmit, setValue, reset } = useForm<FormValues>({
    defaultValues: {}
  })
  const navigate = useNavigate()
  const onSubmit = async (formData: FormValues) =>{
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      return;
    }

    try {
      const response_answer = survey_questions
      ?.slice()?.sort((a: any, b: any) => a?.order - b?.order)?.map((q: any) => ({
        question: q?.id,
        answer: formData[`q${q?.order}`] || "",
      }));

      const response = { survey_assignment: Number(id), response_answer }
      console.log(response)
      const res = await createResponse(response)
      if (!res){
        toast.error('Failed to submit response')
      }
      toast.success('Your response has been submitted successfully!')
      reset()
      setTimeout(() => navigate('/Student/Dashboard'), 1500);
    } catch (error) {
      toast.error('Something went wrong. Please try again')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-10'>
      <div className="space-y-15">
        {currentQuestions?.slice().sort((a: any, b: any ) => a?.order - b?.order)?.map((question: any) =>(
            <div key={question?.id}>
            {question?.question_type === 'mcq' && (
              <McqField question={question} register={register} setValue={setValue}/>
            )}

            {question?.question_type === 'likert' && (
              <LikertField question={question} register={register} setValue={setValue}/>
            )}

            {question?.question_type === 'text' && (
              <ShortTextField question={question} register={register}/>
            )}
            </div>
        ))}
        </div>
        <div className="w-full flex justify-between">
          <div className="flex justify-end mt-5 space-y-2">
          <div>
            <p className="font-semibold">Page {page} of {totalPages}</p>
            <progress className="progress progress-warning w-56" value={page} max={totalPages}></progress>
          </div>
          </div>

          <div className="flex justify-end gap-x-5">
            {page > 1 &&(
            <button type="button" onClick={() => setPage((prev) => prev - 1)}
            className="bg-[#F37611] py-2 px-5 rounded-xl text-white font-semibold mt-5">Previous</button>
          )}
          {page < totalPages ? (
            <button type="submit" className="bg-[#F37611] py-2 px-7 rounded-xl text-white font-semibold mt-5">Next</button>
          ) : (
            <button type="submit" className="bg-[#F37611] py-2 px-4 rounded-xl text-white font-semibold mt-5">Submit Survey</button>
          )}
          </div>
        </div>
        <button type="button" onClick={() => {reset(); setPage(1)}} className="w-full text-red-800 mt-5 text-end">Clear Form</button>
    </form>
  )
}
