import { useQuery } from "@tanstack/react-query"
import { getRecentSurveyAssignments, getSurveyAssignments, getSurveyAssignmentWithResponses, getSurveyAssignmentWithSurvey } from "./api"

export const useRecentSurveyAssignments = () =>{
    return useQuery({
        queryKey: ['recentsurveyassignments'],
        queryFn: getRecentSurveyAssignments,
    })
}

export const useSurveyAssignments = (page: number, search: string) =>{
    return useQuery({
        queryKey: ['surveyassignments', page, search],
        queryFn: () => getSurveyAssignments(page, search),
    })
}

export const useSurveyAssignmentWithSurvey = ({ id }: { id: string }) =>{
    return useQuery({
        queryKey: ['surveyassignmentwithsurvey', id],
        queryFn: () => getSurveyAssignmentWithSurvey({ id })
    })
}

export const useSurveyAssignmentWithResponses = ({ id }: { id: string }) =>{
    return useQuery({
        queryKey: ['surveyassignmentwithresponses', id],
        queryFn: () => getSurveyAssignmentWithResponses({ id })
    })
}