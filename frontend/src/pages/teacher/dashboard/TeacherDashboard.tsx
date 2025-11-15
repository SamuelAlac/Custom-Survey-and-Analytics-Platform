import { Link } from "react-router-dom"
import { DashboardCards } from "./components/DashboardCards"
import { RecentSurveyCards } from "./components/RecentSurveyCards"

const TeacherDashboard = () => {

  return (
    <section className='space-y-7.5'>
        <div className='h-10 md:h-15 flex flex-col md:flex-row justify-between items-center'>
            <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-bold">Survey Management</h1>
            
            <div className='bg-[#F37611] text-xl p-2 rounded-md flex items-center shadow-lg shadow-black/30 text-white'>
                <img src='/add_icon.svg' alt="" className='w-5 mx-2'/>
                <Link to="/Teacher/NewSurvey/Create-Survey" className='font-bold'>Create New Surveys</Link>
            </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between'>
            <DashboardCards/>
        </div>
        
        <div className='min-h-155 bg-white mt-15 rounded-xl p-5 space-y-8 shadow-lg shadow-black/30'>
            <h1 className='md:text-4xl text-black font-bold'>Recent Surveys</h1>
            <div className='space-y-5'>
                <RecentSurveyCards/>
            </div>
        </div>
    </section>
  )
}

export default TeacherDashboard