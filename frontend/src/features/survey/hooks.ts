import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteSurvey } from "./api"

export const useDeleteSurveyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deletesurvey'],
    mutationFn: (id: string) => deleteSurvey(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['surveyassignments'] });
      const previousSurveys = queryClient.getQueryData(['surveyassignments']);

      queryClient.setQueryData(['surveyassignments'], (old: any) =>
        old?.filter((survey: any) => survey.id !== id)
      );

      return { previousSurveys };
    },

    onError: (err, context: any) => {
      console.error('Error deleting survey', err);
      if (context?.previousSurveys) {
        queryClient.setQueryData(['surveyassignments'], context.previousSurveys);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['surveyassignments'] });
      queryClient.invalidateQueries({ queryKey: ['surveyassignmentwithquestionandanswer'] });
    },
  });
};