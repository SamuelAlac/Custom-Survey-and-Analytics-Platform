import { Link } from "react-router-dom"

const CreateSurvey = () => {
  return (
    <section className='space-y-8 max-h-full'>
        <div className='h-10 md:h-15 flex items-center justify-between'>
              <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-bold">Create New Survey</h1>
              <Link to='Dashboard' className='text-[#F37611]'>Back to Dashboard</Link>
        </div>
        

        <div className='bg-[#FBA02C] p-4 rounded-2xl'>
            <div className='w-full flex items-center justify-between text-white'>
                <div className='font-semibold text-sm sm:text-base md:text-lg'>Questions</div>
                <div className='font-semibold text-sm sm:text-base md:text-lg'>Responses</div>
                <div className='font-semibold text-sm sm:text-base md:text-lg'>Settings</div>
            </div>
        </div>

        
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-3xl overflow-hidden shadow-md shadow-black/20 w-full sm:max-w-[16rem] md:max-w-xs ml-0 sm:ml-0 h-auto">
           
            <div className="text-black font-bold text-sm sm:text-base md:text-lg mb-2">
              <h1>Elements</h1>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-black font-normal text-sm sm:text-base md:text-lg mt-2">
                <h2 className="mb-1">Basic</h2>
                <div className="bg-[#FFD9B3] p-3 sm:p-4 rounded-lg flex items-center gap-3">
                  <img src="/Header.svg" alt="Header icon" className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-[#F37611] text-sm sm:text-base md:text-lg font-semibold">Heading</span>
                </div>
              </div>

              <div className="text-black font-normal text-sm sm:text-base md:text-lg mt-2">
                <h2 className="mb-1">Questions</h2>

                <div className="bg-[#FFD9B3] p-3 sm:p-4 rounded-lg flex items-center gap-3 mb-2">
                  <img src="/mChoice.svg" alt="Multiple choice icon" className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-[#F37611] text-sm sm:text-base md:text-lg font-semibold">Multiple Choice</span>
                </div>

                <div className="bg-[#FFD9B3] p-3 sm:p-4 rounded-lg flex items-center gap-3 mb-2">
                  <img src="/likertScale.svg" alt="Likert icon" className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-[#F37611] text-sm sm:text-base md:text-lg font-semibold">Likert Scale</span>
                </div>

                <div className="bg-[#FFD9B3] p-3 sm:p-4 rounded-lg flex items-center gap-3">
                  <img src="/shortText.svg" alt="Short text icon" className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-[#F37611] text-sm sm:text-base md:text-lg font-semibold">Short Text</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-md shadow-black/20 w-full md:w-1/2 lg:w-2/5 h-auto">
            <h2 className="text-black font-bold text-lg mb-4">Survey Title</h2>
            <div className="bg-transparent border-2 border-gray-300 rounded-lg p-3 text-gray-500">
                 <input type="text" placeholder="Enter survey title..." className="w-full bg-transparent outline-none" />
            </div>

            {/* two fields: stacked on mobile, inline (2 columns) on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h2 className="text-black font-bold text-lg mb-2">Due Date</h2>
                <div className="bg-transparent border-2 border-gray-300 rounded-lg p-3 text-gray-500">
                  <input type="text" placeholder="yyyy/mm/dd" className="w-full bg-transparent outline-none" />
                </div>
              </div>

              <div>
                <h2 className="text-black font-bold text-lg mb-2">Assign to Section</h2>
                <div className="bg-transparent border-2 border-gray-300 rounded-lg p-3 text-gray-500">
                  <input type="text" placeholder="Yr/Section/Group" className="w-full bg-transparent outline-none" />
                </div>
              </div>
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="bg-[#E0E0E0] border-2 border-dashed border-[#ACA6A7] rounded-lg p-6 text-center text-gray-500">
               
                <img src="/drag_n_drop_icon.svg" alt="Drag and drop icon" className="mx-auto mb-4 w-12 h-12" />
              <p className="text-sm">Drag and drop your questions here</p>

            </div>

            


          </div>

          
        </div>

      </section>
  )
}

export default CreateSurvey