import { useQuery } from "@tanstack/react-query"
import { getSurveyAssignments, getSurveyAssignmentWithSurvey } from "./api"

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