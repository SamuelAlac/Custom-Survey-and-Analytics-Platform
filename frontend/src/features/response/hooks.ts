import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteResponse, getResponses } from "./api"
import { deleteSurvey } from "../survey/api"

export const useResponses = () =>{
    return useQuery({
        queryKey: ['responses'],
        queryFn: getResponses,
    })
}

export const useDeleteResponseMutation = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['deleteresponse'],
        mutationFn: (id: string | null) => deleteResponse(id),

        onMutate: async (id: string | null) => {
        await queryClient.cancelQueries({ queryKey: ['surveyassignmentwithquestionandanswer'] });
        const previousResponses = queryClient.getQueryData(['surveyassignmentwithquestionandanswer']);

        queryClient.setQueryData(['surveyassignmentwithquestionandanswer'], (old: any) =>
            old?.filter((survey: any) => survey.id !== id)
        );

        return { previousResponses }
        },

        onError: (err, id, context: any) => {
        console.error('Error deleting response', err);
        if (context?.previousSurveys) {
            queryClient.setQueryData(['surveyassignmentwithquestionandanswer'], context.previousSurveys);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['userresponse'] });
            queryClient.invalidateQueries({ queryKey: ['surveyassignmentwithquestionandanswer'] });
        },
    })
}