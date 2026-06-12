export const SurveyRowSkeleton = () => {
  return (
    <div className="w-full p-2 grid grid-cols-5 text-center font-semibold h-10 border-b border-b-[#D9D9D9] hover:bg-black/10">
        <p className='skeleton h-5 w-30'></p>
        <p className='skeleton h-5 w-30'></p>
        <p className='skeleton h-5 w-30'></p>
        <p className='skeleton h-5 w-30'></p>
        <p className='skeleton h-5 w-30'></p>
    </div>
  )
}
