import React from 'react'

export const McqFieldSkeleton = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold skeleton h-5 w-100"></h1>
      <div className="flex flex-col gap-y-5 text-[#595959]">
          <div className="flex space-x-2">
            <div className="w-5 h-5 skeleton rounded-full"></div>
            <p className="text-[#595959] skeleton h-5 w-50"></p>
          </div>

          <div className="flex space-x-2">
            <div className="w-5 h-5 skeleton rounded-full"></div>
            <p className="text-[#595959] skeleton h-5 w-50"></p>
          </div>

          <div className="flex space-x-2">
            <div className="w-5 h-5 skeleton rounded-full"></div>
            <p className="text-[#595959] skeleton h-5 w-50"></p>
          </div>

          <div className="flex space-x-2">
            <div className="w-5 h-5 skeleton rounded-full"></div>
            <p className="text-[#595959] skeleton h-5 w-50"></p>
          </div>
      </div>
    </div>
  )
}

export const LikertFieldSkeleton = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold skeleton h-5 w-100"></h1>
      <div className="flex justify-between">
        <div className="flex flex-col items-center gap-y-2 text-[#595959]">
            <div className="w-7.5 h-7.5 skeleton rounded-full"></div>
            <p className="text-[#595959] skeleton h-5 w-5"></p>
        </div>

        <div className="flex flex-col items-center gap-y-2 text-[#595959]">
            <div className="w-7.5 h-7.5 skeleton rounded-full"></div>
            <p className="text-[#595959] skeleton h-5 w-5"></p>
        </div>

        <div className="flex flex-col items-center gap-y-2 text-[#595959]">
            <div className="w-7.5 h-7.5 skeleton rounded-full"></div>
            <p className="text-[#595959] skeleton h-5 w-5"></p>
        </div>

        <div className="flex flex-col items-center gap-y-2 text-[#595959]">
            <div className="w-7.5 h-7.5 skeleton rounded-full"></div>
            <p className="text-[#595959] skeleton h-5 w-5"></p>
        </div>
      </div>

      <div className="flex justify-between mt-5 text-sm">
        <span className='skeleton h-5 w-50'></span>
        <span className='skeleton h-5 w-50'></span>
      </div>
    </div>
  )
}

export const ShortTextFieldSkeleton = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold skeleton h-5 w-100"></h1>
      <div className="flex flex-col gap-y-5 text-[#595959]">
          <div className="flex space-x-2 skeleton h-30 w-full">
          </div>
      </div>
    </div>
  )
}