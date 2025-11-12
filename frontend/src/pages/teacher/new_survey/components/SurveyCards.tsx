import React from 'react'
import { useSurveyAssignments } from '../../../../features/survey_assignment/hooks'
import { SurveyCard } from './SurveyCard'
import { SurveyCardSkeleton } from './SurveyCardSkeleton'

export const SurveyCards = () => {

    const { data, isLoading } = useSurveyAssignments()
    const surveys = data?.results
    console.log('test',surveys)
    console.log(surveys?.sections)

    if (isLoading) return (<>{Array.from({ length: 7 }).map((_, index) =>
        <SurveyCardSkeleton key={index}/>
      )}</>)

  return (
    <>
    {surveys?.map((survey: any, index: number) =>(
        <SurveyCard key={index} survey={survey} index={index}/>
    ))} 
    </>
  )
}
