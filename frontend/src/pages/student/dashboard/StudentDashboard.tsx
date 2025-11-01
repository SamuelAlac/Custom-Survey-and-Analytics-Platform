import { SurveyList } from "./components/SurveyList"

const StudentDashboard = () => {
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
            <SurveyList/>
          </div>
        </section>
  )
}

export default StudentDashboard