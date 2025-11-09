import { useQuery } from "@tanstack/react-query"
import { getUserResponses, getUserSurveys } from "./api"

export const useUserSurveys = () =>{
    return useQuery({
        queryKey: ['usersurveys'],
        queryFn: getUserSurveys,
    })
}

export const useUserResponses = () =>{
    return useQuery({
        queryKey: ['userresponses'],
        queryFn: getUserResponses,
    })
}