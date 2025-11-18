export const ResponseViewSkeleton = () => {
  return (
     <section>
        <div className='min-h-fit h-100 bg-white mt-7 rounded-xl space-y-8 shadow-lg shadow-black/30'>
            <div className='space-y-5'>
                <div className='flex gap-x-3 ps-5 pt-5 items-center'>
                <input type="text" className="input input-bordered" placeholder="Search..."/>
                </div>
                
                <div className="w-full">
                <div className="w-full grid grid-cols-5 text-center items-center font-semibold bg-[#FBC38A] h-10">
                    <p>Student No.</p>
                    <p>Student Email</p>
                    <p>Section</p>
                    <p>Date Submitted</p>
                    <p>Action</p>
                </div>

                <div className="flex flex-col w-full h-100">
                  <div className="w-full p-2 grid grid-cols-5 text-center font-semibold h-10 border-b border-b-[#D9D9D9] hover:bg-black/10">
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                  </div>

                  <div className="w-full p-2 grid grid-cols-5 text-center font-semibold h-10 border-b border-b-[#D9D9D9] hover:bg-black/10">
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                  </div>

                  <div className="w-full p-2 grid grid-cols-5 text-center font-semibold h-10 border-b border-b-[#D9D9D9] hover:bg-black/10">
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                  </div>

                  <div className="w-full p-2 grid grid-cols-5 text-center font-semibold h-10 border-b border-b-[#D9D9D9] hover:bg-black/10">
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                      <p className='skeleton h-5 w-30'></p>
                  </div>
                </div>
                </div>
            </div>
            </div>
    </section>
  )
}
