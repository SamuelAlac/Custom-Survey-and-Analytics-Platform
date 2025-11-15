import { useQuery } from "@tanstack/react-query"
import { getResponses } from "./api"

export const useResponses = () =>{
    return useQuery({
        queryKey: ['responses'],
        queryFn: getResponses,
    })
}