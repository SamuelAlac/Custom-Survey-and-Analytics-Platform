import { Link } from "react-router-dom"
import { useUserResponses, useUserSurveys } from "../../../features/user/hooks"
import { CompletedSurveyList } from "./components/CompletedSurveyList"
import { PendingSurveyList } from "./components/PendingSurveyList"

const StudentDashboard = () => {

    const { data:survey_data } = useUserSurveys()
    const surveys = survey_data?.section.section_assignments
    console.log('all survey',surveys)

    const { data:response_data } = useUserResponses()
    const responses = response_data?.survey_respondent
    console.log('survey with user responses',responses)

    // List of completed survey assignments in response
    const completedSurveyIDs = responses?.map((response: any) => response.survey_assignment.id)
    console.log(completedSurveyIDs)
    
    const completedSurveys = surveys?.filter((survey: any) => completedSurveyIDs.includes(survey.id))

    const pendingSurveys = surveys?.filter((survey: any) => !completedSurveyIDs.includes(survey.id))

    console.log("Completed Surveys:", completedSurveys);
    console.log("Pending Surveys:", pendingSurveys);

  return (
    <section>
      <div className='border-b-2 border-b-[#D5D5D5] h-10 md:h-15 flex items-center'>
          <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-bold">Assigned Surveys</h1>
      </div>

          <div className='min-h-20 flex justify-center md:justify-end items-center'>
              <div className='flex gap-3'>
                  <div className='text-white text-[12px] md:text-lg bg-[#FBA02C] p-2 lg:px-3 lg:py-2 indicator
                  rounded-2xl font-bold shadow-lg shadow-orange-950/50'>
                      <a href='{% url "students:dashboard" %}?browse=Pending'>Pending 3</a>
                  </div>

                  <a href='{% url "students:dashboard" %}?browse=Completed' className='text-[#2C8C09] text-[12px] md:text-lg bg-[#B6FF9F] p-2 lg:px-3 lg:py-2 rounded-2xl 
                  font-bold shadow-lg shadow-green-950/50'>Completed 2</a>
              </div>
          </div>

          <div className='md:mt-5 space-y-5 w-full'>
            <div className='h-30 bg-white shadow-lg shadow-black/30 rounded-2xl'>
                <div className='md:px-7 md:py-8 text-center md:text-start'>
                    <h3 className='text-black text-lg font-bold'>Survey Title 1</h3>
                    <div className='relative'>
                        <div className='md:mt-2 mb-3 md:mb-0 flex flex-col md:flex-row items-center md:space-x-7'>
                            <div className='flex items-center gap-2'>
                                <img src="/due_survey_icon.svg" alt="Due Survey Icon" />
                                <p className='text-[#595959] text-sm'>Due: 2025-30-10</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <img src="/completed_survey_icon.svg" alt="Completed Survey" />
                                <p className='text-[#2C8C09] text-sm'>Completed</p>
                            </div>
                        </div>

                        <Link to="/" className='md:absolute text-center font-bold p-1 w-50 lg:px-3 lg:py-3 rounded-lg md:right-1 md:bottom-1
                        text-[#85898E] bg-[#D5D5D5] shadow-lg shadow-neutral-950/50'>Completed</Link>
                    </div>
                </div>
            </div>
            {completedSurveys?.map((survey: any) =>(
                <CompletedSurveyList key={survey?.id} survey={survey}/>
            ))}
            {pendingSurveys?.map((survey: any) =>(
                <PendingSurveyList key={survey?.id} survey={survey}/>
            ))}
          </div>
        </section>
  )
}

export default StudentDashboard