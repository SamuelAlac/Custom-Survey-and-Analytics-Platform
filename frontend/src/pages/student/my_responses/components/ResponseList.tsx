import { useUserResponses } from "../../../../features/user/hooks"
import { ResponseRow } from "./ResponseRow"
import { ResponseRowSkeleton } from "./ResponseRowSkeleton"

export const ResponseList = () => {

  const { data, isLoading } = useUserResponses()
  const responses = data?.survey_respondent

  if (isLoading) return (<>{Array.from({ length: 8 }).map((_, index) =>
    <ResponseRowSkeleton key={index}/>
  )}</>)

  if (responses.length === 0) return <p className="absolute left-85 mt-5 text-gray-500 font-semibold text-4xl">You haven't submitted any responses yet.</p>

  return (
    <>{responses?.map((response: any, index: number) =>
      <ResponseRow key={index} response={response}/>
    )}</>)
}
