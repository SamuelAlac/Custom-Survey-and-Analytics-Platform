import { Link } from 'react-router-dom'
import { SurveyCards } from './components/SurveyCards'

const NewSurvey = () => {

  return (
    <section className='space-y-8 max-h-full'>
        <div className='h-10 md:h-15 flex items-center justify-between'>
            <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-bold">Survey Forms</h1>
            <Link to='Dashboard' className='text-[#F37611]'>Back to Dashboard</Link>
        </div>

        <div>
            <h2 className='text-lg'>Start a new form</h2>
            <div className='grid grid-cols-4 mt-5 space-y-10'>
                <div className="card w-80 h-50 bg-base-100 card-md shadow-lg shadow-black/20 flex justify-center items-center">
                    <Link to='Create-Survey'>
                        <img src="/add_survey.svg" alt="Add Survey" className='w-20' />
                    </Link>
                </div>
                <SurveyCards/>               
            </div>
        </div>
    </section>
  )
}

export default NewSurvey