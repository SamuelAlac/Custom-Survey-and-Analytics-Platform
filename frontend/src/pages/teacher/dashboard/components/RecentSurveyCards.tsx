import { useRecentSurveyAssignments } from '../../../../features/survey_assignment/hooks'
import { RecentSurveyCard } from './RecentSurveyCard'
import { RecentSurveyCardSkeleton } from './RecentSurveyCardSkeleton'

export const RecentSurveyCards = () => {

  const { data: recentsurveyData, isLoading } = useRecentSurveyAssignments()
  console.log('aaa',recentsurveyData)

  if (isLoading) return Array.from({ length: 5 }).map((_, index) => <RecentSurveyCardSkeleton key={index}/>)

  return recentsurveyData?.results?.slice(0,4)?.map((survey: any, index: number) =>(
    <RecentSurveyCard key={index} survey={survey}/>
  ))
}
