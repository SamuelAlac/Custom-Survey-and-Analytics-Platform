import { useQueryClient } from '@tanstack/react-query'
import { deleteSurvey } from '../../../../features/survey/api'
import { useSurveyAssignments } from '../../../../features/survey_assignment/hooks'
import { SurveyCard } from './SurveyCard'
import { SurveyCardSkeleton } from './SurveyCardSkeleton'

export const SurveyCards = ({ page, onTotalPages, search }: { page:number, onTotalPages: (total:number) => void, search: string }) => {
  const { data, isLoading } = useSurveyAssignments(page, search)
  const queryClient = useQueryClient()
  const surveys = data?.results
  const PAGE_SIZE = 10;
  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;
  if (totalPages) onTotalPages(totalPages);

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
