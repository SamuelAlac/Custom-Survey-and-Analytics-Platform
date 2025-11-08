import { useQuery } from "@tanstack/react-query"
import { getSurveyAssignments } from "./api"

export const useSurveyAssignments = () =>{
    return useQuery({
        queryKey: ['surveyassignments'],
        queryFn: getSurveyAssignments,
    })
}