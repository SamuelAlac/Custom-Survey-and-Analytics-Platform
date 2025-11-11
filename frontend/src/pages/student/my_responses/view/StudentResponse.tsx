import { Link, useParams } from "react-router-dom"
import { useUserResponse } from "../../../../features/user/hooks"
import { formatWordDate } from "../../../../libs/formatDate"

const StudentResponse = () => {
  
    const { id } = useParams<{ id: string }>()
    if (!id) return <p>Survey ID is missing</p>

    const { data, isLoading } = useUserResponse({ id })
    const response = data
    console.log(response)
    const answers = response?.response_answer
    console.log(answers)
  
  return (
    <section>
      <div className='h-10 md:h-15 flex items-center justify-between'>
        <h1 className="text-[#050505] text-sm md:text-2xl text-center lg:text-start lg:text-4xl font-semibold">My Responses</h1>
        <Link to='/Student/Dashboard' className='text-sm md:text-xl text-[#F37611]'>Back to Dashboard</Link>
      </div>

      <div className="bg-white rounded-xl min-h-fit h-screen shadow-lg shadow-black/30 mt-10">
          {/* <ResponseForm survey_questions={survey_questions} id={id}/> */}
          <div className="p-10">
            <h1 className="text-3xl font-semibold">{response?.survey_name}</h1>
            <div className="flex items-center mt-3 gap-5 mb-5">
              <h1 className="text-[#595959]">Submitted on: {formatWordDate(response?.created_at)}</h1>

              <div className='flex justify-center rounded-md items-center gap-x-1 bg-[#DDF8D5] py-0.5 px-2.5'>
                <img src="/completed_survey_icon.svg" alt="Completed Survey" />
                <p className='text-[#2C8C09] text-sm'>Completed</p>
              </div>
            </div>
            <hr className="border border-[#D9D9D9]"/>

            {/* RESPONSE ANSWERS */}
            {/* <div>
              {answers?.map((answer: any, index: number) =>(
                
              ))}
            </div> */}
          </div>
      </div>
    </section>
  )
}

export default StudentResponse