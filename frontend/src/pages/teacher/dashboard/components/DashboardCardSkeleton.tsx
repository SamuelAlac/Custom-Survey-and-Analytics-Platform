import React from 'react'

export const DashboardCardSkeleton = () => {
  return (
    <>
    <div className="card w-50 md:w-110 bg-white card-md shadow-lg shadow-black/30
    transition duration-200 ease-in-out hover:scale-105">
        <div className="card-body">
            <h2 className="card-title text-2xl text-[#595959] skeleton h-10 w-30"></h2>

            <div className='flex items-center text-black'>
                <p className='text-5xl font-bold skeleton h-10 w-10'></p>
                <div className='p-1 rounded-lg'>
                </div>
            </div>
        </div>
    </div>

    <div className="card w-50 md:w-110 bg-white card-md shadow-lg shadow-black/30
    transition duration-200 ease-in-out hover:scale-105">
        <div className="card-body">
            <h2 className="card-title text-2xl text-[#595959] skeleton h-10 w-30"></h2>

            <div className='flex items-center text-black'>
                <p className='text-5xl font-bold skeleton h-10 w-10'></p>
                <div className='p-1 rounded-lg'>
                </div>
            </div>
        </div>
    </div>

    <div className="card w-50 md:w-110 bg-white card-md shadow-lg shadow-black/30
    transition duration-200 ease-in-out hover:scale-105">
        <div className="card-body">
            <h2 className="card-title text-2xl text-[#595959] skeleton h-10 w-30"></h2>

            <div className='flex items-center text-black'>
                <p className='text-5xl font-bold skeleton h-10 w-10'></p>
                <div className='p-1 rounded-lg'>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
