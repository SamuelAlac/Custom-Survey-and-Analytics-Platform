export const SurveyListSkeleton = () => {
  return (
    <div className='h-30 bg-white shadow-lg shadow-black/30 rounded-2xl'>
        <div className='md:px-7 md:py-8 text-center md:text-start'>
            <h3 className='text-black text-lg font-bold skeleton h-5 w-75'></h3>
            <div className='relative'>
                <div className='md:mt-2 mb-3 md:mb-0 flex flex-col md:flex-row items-center md:space-x-3'>
                    <div className='flex items-center gap-2'>
                        <p className='skeleton h-5 w-10'></p>
                        <p className='text-[#595959] text-sm skeleton h-5 w-30'></p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <p className='skeleton h-5 w-5'></p>
                        <p className='text-[#F37611] text-sm skeleton h-5 w-20'></p>
                    </div>
                </div>

                <div className='md:absolute text-center font-bold p-1 lg:px-3 lg:py-3 rounded-lg md:right-1 md:bottom-1 skeleton h-11 w-50'></div>
            </div>
        </div>
    </div>
  )
}
