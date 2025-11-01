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
                <tr className='hover:bg-black/5'>
                    <th className='text-[#050505] font-semibold text-sm sm:text-base md:text-lg'>Survey Title 1</th>
                    <td className='text-[#595959] font-semibold text-sm sm:text-base md:text-lg'>October 23, 2025</td>
                    <td>
                        <div className='bg-[#DDF8D5] px-3 py-2 rounded-lg inline-flex items-center justify-center gap-2'>
                            <img src='/completed_survey_icon.svg' alt="Completed Survey Icon"/>
                            <span className='text-[#2C8C09] font-semibold text-sm md:text-md'>Completed</span>
                        </div>
                    </td>
                    <td>
                        <div className='bg-[#FBE4C9] px-3 py-2 rounded-lg cursor-pointer hover:bg-[#f9b56f] transition inline-flex justify-center items-center'>
                            <img src='/view_icon.svg' alt="View icon"/>
                            <span className='text-[#F37611] font-semibold text-sm sm:text-base md:text-lg'>View</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
  )
}

export default StudentResponses