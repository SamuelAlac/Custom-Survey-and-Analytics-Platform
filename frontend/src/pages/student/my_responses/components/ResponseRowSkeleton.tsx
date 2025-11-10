import React from 'react'

export const ResponseRowSkeleton = () => {
  return (
    <tr className='hover:bg-black/5'>
        <th className='text-[#050505] font-semibold text-sm sm:text-base md:text-lg'>
            <span className='skeleton px-25'></span>
        </th>
        <td className='text-[#595959] font-semibold text-sm sm:text-base md:text-lg'>
            <span className='skeleton px-20'></span>
        </td>
        <td>
            <div className='px-3 py-2 rounded-lg inline-flex items-center justify-center gap-2'>
                <span className='skeleton px-12 h-5'></span>
            </div>
        </td>
        <td>
            <div className='px-3 py-2 rounded-lg cursor-pointer hover:bg-[#f9b56f] transition inline-flex justify-center items-center gap-2'>
                <span className='skeleton px-12 h-5'></span>
            </div>
        </td>
    </tr>
  )
}
