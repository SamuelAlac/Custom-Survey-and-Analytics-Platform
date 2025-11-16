export const TemplateCardSkeleton = () => {
  return (
    <div className="flex flex-col">
    <div className="card w-80 h-50 bg-base-100 card-md shadow-lg shadow-black/20 flex justify-center items-center">
    <div>
        <p className='skeleton w-20 h-20'></p>
    </div>
    </div>
    <h1 className='text-lg mt-2 mb-11 font-semibold skeleton h-5 w-30'></h1>
    </div>
  )
}
