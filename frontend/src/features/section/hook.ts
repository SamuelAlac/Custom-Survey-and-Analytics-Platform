import { useQuery } from "@tanstack/react-query"
import { getSectionDetail, getSections } from "./api"

export const useSections = () =>{
    return useQuery({
        queryKey: ['sections'],
        queryFn: getSections,
        staleTime: 10000,
    })
}

export const useSectionDetail = ({ id }: { id: number }) =>{
    return useQuery({
        queryKey: ['sections', id],
        queryFn: () => getSectionDetail({ id }),
    })
}