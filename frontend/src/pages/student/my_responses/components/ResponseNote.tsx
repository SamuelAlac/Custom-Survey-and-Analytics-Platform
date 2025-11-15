import { useUserResponse } from "../../../../features/user/hooks"
import { formatWordDate } from "../../../../libs/formatDate"
import { LikertResponse, McqResponse, TextResponse } from "./ResponseFields"
import { ResponseNoteSkeleton } from "./ResponseNoteSkeleton"

export const ResponseNote = ({ id }: { id: any}) => {

    const { data, isLoading } = useUserResponse({ id })
    const response = data
    console.log(response)
    const answers = response?.response_answer
    console.log(answers)

    if (isLoading) return <ResponseNoteSkeleton/>

  return (
    <div className="p-10">
        <h1 className="text-3xl font-semibold">{response?.survey_name}</h1>
        <div className="flex items-center mt-3 gap-5 mb-5">
            <h1 className="text-[#595959]">Submitted on: {formatWordDate(response?.created_at)}</h1>

            <div className='flex justify-center rounded-md items-center gap-x-1 bg-[#DDF8D5] py-0.5 px-2.5'>
            <img src="/completed_survey_icon.svg" alt="Completed Survey" />
            <p className='text-[#2C8C09] text-sm'>Completed</p>
            </div>
        </div>
        <hr className="border border-[#D9D9D9] mb-10"/>
        <div className="space-y-10">
            {answers?.map((ans: any, index: number) =>(
            <div key={ans?.id}>
                {ans?.question_type === 'mcq' && (
                <McqResponse ans={ans} index={index}/>
                )}

                {ans?.question_type === 'likert' && (
                <LikertResponse ans={ans} index={index}/>
                )}

                {ans?.question_type === 'text' && (
                <TextResponse ans={ans} index={index}/>
                )}
            </div>
            ))}
        </div>
    </div>
  )
}
