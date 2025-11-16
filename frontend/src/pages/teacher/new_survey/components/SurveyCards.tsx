import { useQueryClient } from '@tanstack/react-query'
import { deleteSurvey } from '../../../../features/survey/api'
import { useSurveyAssignments } from '../../../../features/survey_assignment/hooks'
import { SurveyCard } from './SurveyCard'
import { SurveyCardSkeleton } from './SurveyCardSkeleton'

export const SurveyCards = () => {

    const { data, isLoading } = useSurveyAssignments()
    const queryClient = useQueryClient()
    const surveys = data?.results
    console.log(surveys)

    const handleDelete = async (id: string) => {
    await deleteSurvey(id);
      queryClient.invalidateQueries({queryKey: ['surveyassignments']});
    };

    if (isLoading) return Array.from({ length: 10 }).map((_, index) =>
        <SurveyCardSkeleton key={index}/>
      )

  return surveys?.map((survey: any, index: number) =>(
    <SurveyCard key={index} survey={survey} onDelete={() => handleDelete(survey?.id)}/>
  ))
}
