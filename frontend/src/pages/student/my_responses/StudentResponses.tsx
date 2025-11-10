import { ResponseList } from "./components/ResponseList"

const StudentResponses = () => {

  return (
    <section>
      <div className="flex items-center justify-between h-10 md:h-15">
          <h1 className="text-[#050505] text-xl md:text-2xl lg:text-4xl font-bold">My Responses</h1>                                                                        
          <p className="text-[#F37611] text-base md:text-lg lg:text-1xl font-semibold cursor-pointer font-size">Back to Dashboard</p>
      </div>

        <table className="table text-black bg-white shadow-lg shadow-black/10 rounded-lg mt-4 text-center">
            <thead className='bg-[#FBC38A] text-black'>
                <tr>
                    <th className='text-[#050505] font-semibold text-sm sm:text-base md:text-lg'>Survey Title</th>
                    <th className='text-[#050505] font-semibold text-sm sm:text-base md:text-lg'>Date Completed</th>
                    <th className='text-[#050505] font-semibold text-sm sm:text-base md:text-lg'>Status</th>
                    <th className='text-[#050505] font-semibold text-sm sm:text-base md:text-lg'>Action</th>
                </tr>
                </thead>
                <tbody>
                <ResponseList/>
            </tbody>
        </table>
    </section>
  )
}

export default StudentResponses