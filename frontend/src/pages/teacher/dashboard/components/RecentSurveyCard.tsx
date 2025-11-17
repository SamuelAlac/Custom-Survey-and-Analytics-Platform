import { Link } from 'react-router-dom'
import { formatDate } from '../../../../libs/formatDate'
import { useSurveyAssignmentWithResponses } from '../../../../features/survey_assignment/hooks'
import { useSectionStudents } from '../../../../features/section/hooks'
import CountUp from 'react-countup'

export const RecentSurveyCard = ({ survey }: { survey:any }) => {

    const { data: responses } = useSurveyAssignmentWithResponses({ id: survey?.id })
    const {data: sectionData} = useSectionStudents()
    const sections = sectionData?.map((section: any) => section?.user)
    const totalStudents = sections?.flat()?.length
    console.log(totalStudents)

    const isCompleted = responses?.survey_assignment_response?.length === totalStudents
    console.log(isCompleted)

  return (
    <div className='border-2 border-[#D9D9D9] rounded-xl h-25 p-3 flex justify-between hover:bg-black/5'>
        <div>
            <h2 className='text-black text-lg font-bold'>{survey?.survey_name}</h2>
            <div className='flex items-center gap-2 mt-2'>
                <img src='/due_survey_icon.svg' alt=""/>
                <p className='text-[#595959] text-sm me-5'>Due: {formatDate(survey?.due_date)}</p>
                <p 
                className={`${survey?.status === 'active' ? 'bg-[#DDF8D5] text-[#2C8C09]' 
                    : isCompleted ? 'bg-[#D5D5D5] text-[#595959]' 
                    : survey?.status === 'inactive' ? 'bg-[#FBE4C9] text-[#F37611]' : 'bg-[#E11518] text-white'}
                px-4 rounded-lg`}>
                    {/* {survey?.status} */}
                    {survey?.status === 'active' || survey?.status === 'inactive' 
                    || survey?.status === 'past_due' ? survey?.status : 'Completed'}
                </p>
            </div>
        </div>

        <div className='flex items-center gap-4'>
            <div className='text-end'>
                <p className='text-[#595959]'>Response Rate</p>
                <p className='text-[#F37611]'>
                    <CountUp start={0} end={responses?.survey_assignment_response?.length || 0} duration={1} separator="," />
                    /
                    <CountUp start={0} end={totalStudents || 0} duration={1} separator="," />
                </p>
            </div>
            <Link to={`/Teacher/NewSurvey/Update-Survey/${survey?.id}`} className='bg-[#BFD3FF] flex px-3 py-2 gap-2 rounded-lg'>
                <img src='/edit_icon.svg' alt="" className='w-4'/>
                <p className='text-[#0A57FF] font-semibold'>Edit</p>
            </Link>
            <Link to={`/Teacher/NewSurvey/${survey?.id}`} className='bg-[#FBE4C9] flex px-3 py-2 gap-2 rounded-lg'>
                <img src='/view_icon.svg' alt="" className='w-5'/>
                <p className='text-[#F37611] font-semibold'>View</p>
            </Link>
        </div>
    </div>
  )
}
