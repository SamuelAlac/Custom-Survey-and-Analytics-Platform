export const RecentSurveyCardSkeleton = () => {
  return (
    <div className='border border-[#ACA6A7] rounded-xl card w-60 h-55 card-md flex'>
        <div className='flex items-center justify-center flex-1'>
        <h1 className="skeleton h-5 w-40"></h1>
        </div>
        <div className='border rounded-b-xl border-[#ACA6A7] h-18 flex justify-between items-center py-1 px-3'>
        <div className='flex flex-col gap-1.5'>
            <p className="skeleton h-5 w-40"></p>
            <p className="skeleton h-5 w-30"></p>
        </div>

        <div className='flex flex-col items-center gap-1.5'>
            <p className='rounded-full skeleton h-5 w-5'></p>
            <p className='text-xl text-[#DC0202] skeleton h-5 w-5'></p>
        </div>
        </div>
    </div>
  )
}
