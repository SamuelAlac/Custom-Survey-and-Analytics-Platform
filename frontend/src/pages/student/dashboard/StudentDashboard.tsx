import { Link } from "react-router-dom"
import { useUserResponses, useUserSurveys } from "../../../features/user/hooks"
import { CompletedSurveyList } from "./components/CompletedSurveyList"
import { PendingSurveyList } from "./components/PendingSurveyList"
import { useState } from "react"
import { SurveyListSkeleton } from "./components/SurveyListSkeleton"

const StudentDashboard = () => {
    const [view, setView] = useState<'all' | 'pending' | 'completed'>('all')
    const { data:survey_data, isLoading: isSurveyLoading } = useUserSurveys()
    const surveys = survey_data?.section.section_assignments
    const { data:response_data, isLoading:isResponseLoading } = useUserResponses()
    const responses = response_data?.survey_respondent

    const isLoading = isSurveyLoading || isResponseLoading

    // List of completed survey assignments in response
    const completedSurveyIDs = responses?.map((response: any) => response.survey_assignment.id)
    
    const completedSurveys = surveys?.filter((survey: any) => completedSurveyIDs?.includes(survey.id))
    const pendingSurveys = surveys?.filter((survey: any) => !completedSurveyIDs?.includes(survey.id))
    console.log("Completed Surveys:", completedSurveys);
    console.log("Pending Surveys:", pendingSurveys);

    const getSurveyLists = () =>{
        if (isLoading) {
        return (<>{Array.from({ length: 3 }).map((_, index) =>(
        <SurveyListSkeleton key={index}/>
        ))}</>)}

        switch(view){
            case 'pending':
                if (pendingSurveys?.length === 0) return (<p className="text-4xl text-center text-gray-500 font-semibold py-10">You have no pending surveys yet.</p>)
                return pendingSurveys?.map((survey: any) =>(<PendingSurveyList key={survey?.id} survey={survey}/>))
            case 'completed':
                if (completedSurveys?.length === 0) return (<p className="text-4xl text-center text-gray-500 font-semibold py-10">You have no completed surveys yet.</p>)
                return completedSurveys?.map((survey: any) =>(<CompletedSurveyList key={survey?.id} survey={survey}/>))
            default:
                return (
                    <>
                    {completedSurveys?.map((survey: any) =>(<CompletedSurveyList key={survey?.id} survey={survey}/>))}
                    {pendingSurveys?.map((survey: any) =>(<PendingSurveyList key={survey?.id} survey={survey}/>))}
                    </>
                )
        }
    }

  return (
    <section>
        <div className='border-b-2 border-b-[#D5D5D5] h-10 md:h-15 flex items-center'>
            <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-bold">Assigned Surveys</h1>
        </div>

        <div className='min-h-20 flex justify-center md:justify-end items-center'>
            <div className='flex gap-3'>
                <div className='text-white text-[12px] md:text-lg bg-[#FBA02C] p-2 lg:px-3 lg:py-2 indicator
                rounded-2xl font-bold shadow-lg shadow-orange-950/50'>
                    {view === 'pending' && 
                    (<button onClick={() => setView('all')} className="indicator-item badge badge-neutral">x</button>)}
                    <button onClick={() => setView(view === 'pending' ? 'all' : 'pending')}>Pending {pendingSurveys?.length}</button>
                </div>

                <div className='text-[#2C8C09] text-[12px] md:text-lg bg-[#B6FF9F] p-2 lg:px-3 lg:py-2 rounded-2xl 
                font-bold shadow-lg shadow-green-950/50 indicator'>
                    {view === 'completed' && 
                    (<button onClick={() => setView('all')} className="indicator-item badge badge-neutral">x</button>)}
                    <button onClick={() => setView(view === 'completed' ? 'all' : 'completed')}>Completed {completedSurveys?.length}</button>
                </div>
            </div>
        </div>

        <div className='md:mt-5 space-y-5 w-full'>
            {getSurveyLists()}
        </div>
    </section>
  )
}

export default StudentDashboard