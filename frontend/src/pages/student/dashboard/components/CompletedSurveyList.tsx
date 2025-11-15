import { Link } from "react-router-dom"
import { formatDate } from "../../../../libs/formatDate"

export const CompletedSurveyList = ({ survey }: { survey: any }) => {
  return (
    <div key={survey.id} className='h-30 bg-white shadow-lg shadow-black/30 rounded-2xl'>
        <div className='md:px-7 md:py-8 text-center md:text-start'>
            <h3 className='text-black text-lg font-bold'>{survey.survey_name}</h3>
            <div className='relative'>
                <div className='md:mt-2 mb-3 md:mb-0 flex flex-col md:flex-row items-center md:space-x-7'>
                    <div className='flex items-center gap-2'>
                        <img src="/due_survey_icon.svg" alt="Due Survey Icon" />
                        <p className='text-[#595959] text-sm'>Due: {formatDate(survey.due_date)}</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <img src="/completed_survey_icon.svg" alt="Completed Survey" />
                        <p className='text-[#2C8C09] text-sm'>Completed</p>
                    </div>
                </div>

                <Link to="/Student/Dashboard" className='md:absolute text-center font-bold p-1 w-50 lg:px-3 lg:py-3 rounded-lg md:right-1 md:bottom-1
                text-[#85898E] bg-[#D5D5D5] shadow-lg shadow-neutral-950/30 cursor-not-allowed'>Completed</Link>
            </div>
        </div>
    </div>
  )
}
