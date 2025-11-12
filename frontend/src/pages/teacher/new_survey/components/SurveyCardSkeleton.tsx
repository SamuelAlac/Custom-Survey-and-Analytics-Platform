export const SurveyCardSkeleton = () => {
  return (
    <div className="flex flex-col w-80 h-50 bg-base-100 card-md shadow-lg shadow-black/20">
        <div className="card-body">
            <h2 className="card-title skeleton h-5 w-40"></h2>
            <p className='skeleton h-5 w-70'></p>
            <div className="justify-end card-actions">
            <button className="btn skeleton h-5 w-20"></button>
            </div>
        </div>
    </div>
  )
}
