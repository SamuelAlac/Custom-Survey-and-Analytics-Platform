import { useParams } from "react-router-dom"
import { useSurveyAssignmentWithSurvey } from "../../../../features/survey_assignment/hooks"

const ViewSurvey = () => {

  const { id } = useParams<{ id: string }>()
  if (!id) return <p>Survey ID is missing</p>
  const { data } = useSurveyAssignmentWithSurvey({ id })
  console.log(data)

  return (
    <div>ViewSurvey</div>
  )
}

export default ViewSurvey