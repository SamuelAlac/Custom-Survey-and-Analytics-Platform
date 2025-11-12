import { useForm } from "react-hook-form";
import { McqField } from "./McqField";
import { LikertField } from "./LikertField";
import { ShortTextField } from "./ShortTextField";
import { createResponse } from "../../../../features/user/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface ResponseFormProps {
  survey_questions: any;
  id: string;
}

interface FormValues {
  [key: string]: string;
}

export const ResponseForm = ({ survey_questions, id }: ResponseFormProps) => {

  const { register, handleSubmit, setValue, setError, reset } = useForm<FormValues>({
    defaultValues: {}
  })
  const navigate = useNavigate()
  const onSubmit = async (formData: FormValues) =>{
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
        {survey_questions?.slice().sort((a: any, b: any ) => a?.order - b?.order)?.map((question: any) =>(
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
        <button className="bg-[#F37611] p-5 w-full rounded-xl text-white font-semibold mt-5">Submit Survey</button>
        <button onClick={() => reset()}>Clear Form</button>
    </form>
  )
}
