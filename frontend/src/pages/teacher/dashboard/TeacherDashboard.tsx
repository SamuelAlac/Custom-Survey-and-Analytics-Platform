import { Link } from "react-router-dom"

const TeacherDashboard = () => {

  return (
    <section className='space-y-7.5'>
        <div className='h-10 md:h-15 flex flex-col md:flex-row justify-between items-center'>
            <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-bold">Survey Management</h1>
            
            <div className='bg-[#F37611] text-xl p-2 rounded-md flex items-center shadow-lg shadow-black/30 text-white'>
                <img src='/add_icon.svg' alt="" className='w-5 mx-2'/>
                <Link to="/" className='font-bold'>Create New Surveys</Link>
            </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between'>

            <div className="card w-50 md:w-110 bg-white card-md shadow-lg shadow-black/30
            transition duration-200 ease-in-out hover:scale-105">
                <div className="card-body">
                    <h2 className="card-title text-2xl text-[#595959]">Total Surveys</h2>

                    <div className='flex items-center text-black'>
                        <p className='text-5xl font-bold'>3</p>
                        <div className='bg-[#B1CEF4] p-1 rounded-lg'>
                            <img src='/total_surveys_icon.svg' alt="" className='w-15'/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card w-50 md:w-110 bg-white card-md shadow-lg shadow-black/30
            transition duration-200 ease-in-out hover:scale-105">
                <div className="card-body">
                    <h2 className="card-title text-2xl text-[#595959]">Active Surveys</h2>

                    <div className='flex items-center text-black'>
                        <p className='text-5xl font-bold'>3</p>
                        <div className='bg-[#DDF8D5] p-1 rounded-lg'>
                            <img src='/active_surveys_icon.svg' alt="" className='w-15'/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card w-50 md:w-110 bg-white card-md shadow-lg shadow-black/30
            transition duration-200 ease-in-out hover:scale-105">
                <div className="card-body">
                    <h2 className="card-title text-2xl text-[#595959]">Total Responses</h2>

                    <div className='flex items-center text-black'>
                        <p className='text-5xl font-bold'>3</p>
                        <div className='bg-[#FBF6FF] p-1 rounded-lg'>
                            <img src='/total_responses_icon.svg' alt="" className='w-15'/>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div className='min-h-155 bg-white mt-15 rounded-xl p-5 space-y-8'>
            <h1 className='md:text-4xl text-black font-bold'>Recent Surveys</h1>
            <div className='space-y-5'>

                <div className='border-2 border-[#D9D9D9] rounded-xl h-25 p-3 flex justify-between'>
                    <div>
                        <h2 className='text-black text-lg font-bold'>Sample Survey</h2>
                        <div className='flex items-center gap-2 mt-2'>
                            <img src='/due_survey_icon.svg' alt=""/>
                            <p className='text-[#595959] text-sm me-5'>Due: 2025-10-30</p>
                            <p className='bg-[#DDF8D5] px-4 text-[#2C8C09] rounded-lg'>active</p>
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

            </div>
        </div>
    </section>
  )
}

export default TeacherDashboard