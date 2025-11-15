import { LikertResponseSkeleton, McqResponseSkeleton, TextResponseSkeleton } from './ResponseFields'

export const ResponseNoteSkeleton = () => {
  return (
    <div className="p-10">
        <h1 className="text-3xl font-semibold skeleton h-5 w-130"></h1>
        <div className="flex items-center mt-3 gap-3 mb-5">
            <h1 className="text-[#595959] skeleton h-5 w-50"></h1>

            <div className='flex justify-center rounded-md items-center gap-x-1 py-0.5 px-2'>
            <p className='text-sm skeleton h-5 w-30'></p>
            </div>
        </div>
        <hr className="border border-[#D9D9D9] mb-10"/>
        <div className="space-y-10">
            <McqResponseSkeleton/>
            <LikertResponseSkeleton/>
            <TextResponseSkeleton/>
        </div>
    </div>
  )
}
