import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { DeleteModal } from "./DeleteModal";
import { formatDate } from "../../../../libs/formatDate";

export const SurveyCard = ({ survey, onDelete}: { survey: any, onDelete: () => void }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border border-[#ACA6A7] rounded-xl card w-60 h-55 card-md flex
    transition duration-200 ease-in-out hover:scale-105 hover:bg-black/10'>
          <div className='flex items-center justify-center flex-1'>
          <Link to={`${survey?.id}`} className="font-semibold">{survey?.survey_name}</Link>
          </div>
          <div className='border rounded-b-xl border-[#ACA6A7] h-18 flex justify-between items-center py-1 px-3'>
          <div>
              <p className="text-[12px]">{survey?.survey_description}</p>
              <p className="text-[10px]">{formatDate(survey?.created_at)}</p>
          </div>
  
          <div className='flex flex-col items-center gap-1.5'>
            <div className="tooltip" data-tip={survey?.status}>
              <p className={`w-3 h-3 rounded-full ${survey?.status === 'active' ? 'bg-green-400' :
              survey?.status === 'inactive' ? 'bg-orange-400' : 'bg-red-600'}`}></p>
            </div>
            <RiDeleteBin6Line role="button" className='text-xl text-[#DC0202]'
            onClick={() => setIsOpen(true)}/>
            <DeleteModal isOpen={isOpen} survey_name={survey?.survey_name} 
            onClose={() => setIsOpen(false)} onDelete={() =>{ onDelete()
            setIsOpen(false)
              }}/>
          </div>
          </div>
      </div>
  )
}
