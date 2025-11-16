import { LikertFieldSkeleton, McqFieldSkeleton, ShortTextFieldSkeleton } from './FieldSkeleton'

export const ResponseFormSkeleton = () => {
  return (
    <div className='p-10'>
        <div className="space-y-15">
        <McqFieldSkeleton/>
        <LikertFieldSkeleton/>
        <ShortTextFieldSkeleton/>
        </div>
        <button className="skeleton p-5 w-full rounded-xl text-white font-semibold mt-5"></button>
        <button className="skeleton w-full text-red-800 mt-5 text-end"></button>
    </div>
  )
}
