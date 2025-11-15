import { useSurveyAssignments } from '../../../../features/survey_assignment/hooks'
import { RecentSurveyCard } from './RecentSurveyCard'

export const RecentSurveyCards = () => {

  const { data: recentsurveyData } = useSurveyAssignments()

  return recentsurveyData?.results?.map((survey: any, index: number) =>(
    <RecentSurveyCard key={index} survey={survey}/>
  ))
}
