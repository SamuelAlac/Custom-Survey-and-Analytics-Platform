import { useQuery } from "@tanstack/react-query"
import { getMyAccount } from "./api"

export const useUser = () =>{
    return useQuery({
        queryKey: ['myaccount'],
        queryFn: getMyAccount,
        retry: 1,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    })
}