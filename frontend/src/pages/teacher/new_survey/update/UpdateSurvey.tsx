import { useParams } from "react-router-dom"
import { useSurveyAssignmentWithSurvey } from "../../../../features/survey_assignment/hooks"

const UpdateSurvey = () => {

  const { id } = useParams<{ id: string }>()
  if (!id) return <p>Survey ID is missing</p>
  const { data } = useSurveyAssignmentWithSurvey({ id })
  const survey = data?.survey_details
  console.log(survey)

  return (
    <section className="space-y-8">
      <div className='h-10 md:h-15 flex items-center justify-between'>
        <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-semibold">{survey?.title}</h1>
        <div>
          <button className={`flex-1 shadow-lg shadow-black/30 px-4 py-2 bg-[#F37611] 
          text-white rounded-lg hover:bg-[#F37611] transition-colors`}>
            Publish
          </button>
        </div>
      </div>

      <div>
        
      </div>
    </section>
  )
}

export default UpdateSurvey