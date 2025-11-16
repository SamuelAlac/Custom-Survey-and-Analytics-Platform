import { Link, useParams } from "react-router-dom"
import { useSurveyAssignmentWithSurvey } from "../../../features/survey_assignment/hooks"
import { ResponseForm } from "./components/ResponseForm"
import { ResponseFormSkeleton } from "./components/ResponseFormSkeleton"

const TakeSurvey = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) return <p>Survey ID is missing</p>

  const { data, isLoading } = useSurveyAssignmentWithSurvey({ id })
  const survey = data?.survey_details
  console.log(survey)
  const survey_questions = survey?.survey_questions
  console.log(survey_questions)


  if (isLoading) return (
    <section>
      <div className='h-10 md:h-15 flex items-center justify-between'>
        <h1 className="text-[#050505] text-sm md:text-2xl text-center lg:text-start lg:text-4xl font-semibold skeleton h-10 w-70"></h1>
        <Link to='/Student/Dashboard' className='text-sm md:text-xl text-[#F37611] skeleton h-5 w-30'></Link>
      </div>

      <div className="bg-white rounded-xl min-h-fit h-screen shadow-lg shadow-black/30 mt-10">
        <ResponseFormSkeleton/>
      </div>
    </section>
  )

  return (
    <section>
      <div className='h-10 md:h-15 flex items-center justify-between'>
        <h1 className="text-[#050505] text-sm md:text-2xl text-center lg:text-start lg:text-4xl font-semibold">{survey?.title}</h1>
        <Link to='/Student/Dashboard' className='text-sm md:text-xl text-[#F37611]'>Back to Dashboard</Link>
      </div>

      <div className="bg-white rounded-xl min-h-fit h-screen shadow-lg shadow-black/30 mt-10">
        <ResponseForm survey_questions={survey_questions} id={id}/>
      </div>
    </section>
  )
}

export default TakeSurvey