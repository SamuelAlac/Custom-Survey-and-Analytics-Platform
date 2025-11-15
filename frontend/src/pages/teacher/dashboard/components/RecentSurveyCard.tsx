import { Link } from 'react-router-dom'
import { formatDate } from '../../../../libs/formatDate'

export const RecentSurveyCard = ({ survey }: { survey:any }) => {
    console.log(survey)
  return (
    <div className='border-2 border-[#D9D9D9] rounded-xl h-25 p-3 flex justify-between'>
        <div>
            <h2 className='text-black text-lg font-bold'>{survey?.survey_name}</h2>
            <div className='flex items-center gap-2 mt-2'>
                <img src='/due_survey_icon.svg' alt=""/>
                <p className='text-[#595959] text-sm me-5'>Due: {formatDate(survey?.due_date)}</p>
                <p 
                className={`${survey?.status === 'active' ? 'bg-[#DDF8D5] text-[#2C8C09]' : 'bg-[#FBE4C9] text-[#F37611]' } px-4 rounded-lg`}>
                    {survey?.status}
                </p>
            </div>
        </div>

        <div className='flex items-center gap-4'>
            <div className='text-end'>
                <p className='text-[#595959]'>Response Rate</p>
                <p className='text-[#F37611]'>24/30</p>
            </div>
            <div className='bg-[#FBE4C9] flex px-3 py-2 gap-2 rounded-lg'>
                <img src='/view_icon.svg' alt="" className='w-5'/>
                <Link to="/" className='text-[#F37611] font-semibold'>View</Link>
            </div>
        </div>
    </div>
  )
}
