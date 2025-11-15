import { McqFieldSkeleton } from './FieldSkeleton'

export const ResponseFormSkeleton = () => {
  return (
    <div className='p-10'>
        <div className="space-y-15">
        {/* {survey_questions?.slice().sort((a: any, b: any ) => a?.order - b?.order)?.map((question: any) =>(
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
        ))} */}
        <McqFieldSkeleton/>

        </div>
        <button className="bg-[#F37611] p-5 w-full rounded-xl text-white font-semibold mt-5">Submit Survey</button>
        <button >Clear Form</button>
    </div>
  )
}
