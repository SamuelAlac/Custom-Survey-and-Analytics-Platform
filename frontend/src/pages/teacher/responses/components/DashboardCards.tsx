import CountUp from "react-countup"
import { useResponses } from "../../../../features/response/hooks"
import { useRecentSurveyAssignments } from "../../../../features/survey_assignment/hooks"
import { useSections } from "../../../../features/section/hooks"

export const DashboardCards = () => {

    const { data: responseData } = useResponses()
    const { data: surveyData } = useRecentSurveyAssignments()
    const { data: sectionData } = useSections()
    console.log(surveyData)
    console.log(responseData)
    console.log(sectionData)

  return (
    <>
        <div className="card w-50 md:w-110 bg-white card-md shadow-lg shadow-black/30
        transition duration-200 ease-in-out hover:scale-105">
            <div className="card-body">
                <h2 className="card-title text-2xl text-[#595959]">Total Responses</h2>

                <div className='flex items-center text-black'>
                    <p className='text-5xl font-bold'>
                        <CountUp start={0} end={responseData?.length || 0} duration={1} separator="," />
                    </p>
                    <div className='bg-[#DDF8D5] p-1 rounded-lg'>
                        <img src='/active_surveys_icon.svg' alt="" className='w-15'/>
                    </div>
                </div>
            </div>
        </div>

        <div className="card w-50 md:w-110 bg-white card-md shadow-lg shadow-black/30
        transition duration-200 ease-in-out hover:scale-105">
            <div className="card-body">
                <h2 className="card-title text-2xl text-[#595959]">Total Surveys</h2>

                <div className='flex items-center text-black'>
                    <p className='text-5xl font-bold'>
                        <CountUp start={0} end={surveyData?.count || 0} duration={1} separator=","/>
                    </p>
                    <div className='bg-[#B1CEF4] p-1 rounded-lg'>
                        <img src='/total_surveys_icon.svg' alt="" className='w-15'/>
                    </div>
                </div>
            </div>
        </div>

        <div className="card w-50 md:w-110 bg-white card-md shadow-lg shadow-black/30
        transition duration-200 ease-in-out hover:scale-105">
            <div className="card-body">
                <h2 className="card-title text-2xl text-[#595959]">Total Sections</h2>

                <div className='flex items-center text-black'>
                    <p className='text-5xl font-bold'>
                        <CountUp start={0} end={sectionData?.count || 0} duration={1} separator=","/>
                    </p>
                    <div className='bg-[#FBF6FF] p-1 rounded-lg'>
                        <img src='/total_responses_icon.svg' alt="" className='w-15'/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
