export const RecentSurveyCardSkeleton = () => {
  return (
    <div className='border-2 border-[#D9D9D9] rounded-xl h-25 p-3 flex justify-between'>
        <div>
            <h2 className='text-black text-lg font-bold skeleton h-5 w-100'></h2>
            <div className='flex items-center gap-2 mt-2'>
                <p className="skeleton h-5 w-5"></p>
                <p className='text-[#595959] text-sm me-5 skeleton h-5 w-100'></p>
                <p className="skeleton h-5 100"></p>
            </div>
        </div>

        <div className='flex items-center gap-4'>
            <div className='flex flex-col items-end gap-y-2'>
                <p className='text-[#595959] skeleton h-5 w-30'></p>
                <p className='text-[#F37611] skeleton h-5 w-10'></p>
            </div>
            <div className='flex gap-2 rounded-lg'>
                <p className='text-[#0A57FF] font-semibold skeleton h-10 w-20'></p>
            </div>

            <div className='flex gap-2 rounded-lg'>
                <p className='text-[#F37611] font-semibold skeleton h-10 w-20'></p>
            </div>
        </div>
    </div>
  )
}
