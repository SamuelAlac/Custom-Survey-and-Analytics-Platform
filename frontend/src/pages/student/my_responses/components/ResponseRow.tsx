import { formatDate } from "../../../../libs/formatDate"

export const ResponseRow = ({ response }: { response: any }) => {
  return (
    <tr className='hover:bg-black/5'>
        <th className='text-[#050505] font-semibold text-sm sm:text-base md:text-lg'>{response?.survey_assignment.survey_name}</th>
        <td className='text-[#595959] font-semibold text-sm sm:text-base md:text-lg'>{formatDate(response?.created_at)}</td>
        <td>
            <div className='bg-[#DDF8D5] px-3 py-2 rounded-lg inline-flex items-center justify-center gap-2'>
                <img src='/completed_survey_icon.svg' alt="Completed Survey Icon"/>
                <span className='text-[#2C8C09] font-semibold text-sm md:text-md'>Completed</span>
            </div>
        </td>
        <td>
            <div className='bg-[#FBE4C9] px-3 py-2 rounded-lg cursor-pointer hover:bg-[#f9b56f] transition inline-flex justify-center items-center gap-2'>
                <img src='/view_icon.svg' alt="View icon"/>
                <span className='text-[#F37611] font-semibold text-sm md:text-md'>View</span>
            </div>
        </td>
    </tr>
  )
}
