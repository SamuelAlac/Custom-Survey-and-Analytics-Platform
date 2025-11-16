import { useQuery } from "@tanstack/react-query"
import { getSurveyAssignments, getSurveyAssignmentWithResponses, getSurveyAssignmentWithSurvey } from "./api"

export const useSurveyAssignments = () =>{
    return useQuery({
        queryKey: ['surveyassignments'],
        queryFn: getSurveyAssignments,
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