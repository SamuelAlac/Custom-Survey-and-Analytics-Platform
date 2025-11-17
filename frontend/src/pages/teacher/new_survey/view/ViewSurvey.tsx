import { useParams } from "react-router-dom"
import { useSurveyAssignmentWithSurvey } from "../../../../features/survey_assignment/hooks"

const ViewSurvey = () => {

  const { id } = useParams<{ id: string }>()
  if (!id) return <p>Survey ID is missing</p>
  const { data } = useSurveyAssignmentWithSurvey({ id })
  const survey = data?.survey_details
  console.log(survey)

  return (
    <section className="space-y-8">
      
    </section>
  )
}

export default ViewSurvey