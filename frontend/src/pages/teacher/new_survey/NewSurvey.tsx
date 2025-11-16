import { Link } from 'react-router-dom'
import { SurveyCards } from './components/SurveyCards'
import { TemplateCards } from './components/TemplateCards'
import { RecentSurveyCards } from './components/RecentSurveyCards';

const NewSurvey = () => {

  return (
    <section className='space-y-5 max-h-full'>
        <div className='h-10 md:h-15 flex items-center justify-between'>
            <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-bold">Survey Forms</h1>
            <Link to='Dashboard' className='text-[#F37611]'>Back to Dashboard</Link>
        </div>

        <div>
            <div className='grid grid-cols-4 mt-5 space-y-10'>
                <TemplateCards/>
            </div>
            <div className='bg-white w-full min-h-100 py-5 px-8 shadow-lg shadow-black/20 rounded-xl space-y-5'>
              <h1 className='text-3xl font-semibold'>Recent Surveys</h1>
              
              <div className='grid grid-cols-5 gap-7 mt-5'>
                <RecentSurveyCards/>
              </div>

              <h1 className='text-3xl font-semibold'>Surveys</h1>

              <div className='grid grid-cols-5 gap-7 mt-5'>
                <SurveyCards/>
              </div>
            </div>
        </div>
    </section>
  )
}

export default NewSurvey