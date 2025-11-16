import { useQueryClient } from "@tanstack/react-query"
import { deleteSurvey } from "../../../../features/survey/api"
import { useSurveyAssignments } from "../../../../features/survey_assignment/hooks"
import { RecentSurveyCard } from "./RecentSurveyCard"
import { RecentSurveyCardSkeleton } from "./RecentSurveyCardSkeleton"

export const RecentSurveyCards = () => {

    const { data: recentSurveyData, isLoading } = useSurveyAssignments()
    const queryClient = useQueryClient()
    const recentSurveys = recentSurveyData?.results?.slice(0,5)

    const handleDelete = async (id: string) => {
    await deleteSurvey(id);
      queryClient.invalidateQueries({queryKey: ['surveyassignments']});
    };

    if (isLoading) return Array.from({ length: 5 }).map((_, index) => <RecentSurveyCardSkeleton key={index}/>)

  return recentSurveys?.map((survey: any, index: number) => <RecentSurveyCard key={index} survey={survey} onDelete={() => handleDelete(survey?.id)}/>)
}
