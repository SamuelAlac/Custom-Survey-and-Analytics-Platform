import CountUp from "react-countup"
import { useSurveyAssignmentWithResponses } from "../../../../features/survey_assignment/hooks";
import { formatDate } from "../../../../libs/formatDate";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";
import { useDeleteSurveyMutation } from "../../../../features/survey/hooks";

export const SurveyRow = ({ result, totalStudents }: { result: any; totalStudents?: number }) => {
    const { data: responses } = useSurveyAssignmentWithResponses({ id: result?.id })
    const deleteMutation = useDeleteSurveyMutation();
    const responsesCount = responses?.survey_assignment_response?.length ?? 0
    const isCompleted = typeof totalStudents === "number" && totalStudents > 0 && responsesCount === totalStudents
    console.log('qwsdq',responses)
    const [isModalOpen, setModalOpen] = useState(false);

    const handleDelete = async () => {
      deleteMutation.mutate(result?.id)
      setModalOpen(false);
      
    };

    return (
      <div className="w-full p-2 grid grid-cols-5 text-center font-semibold h-10 border-b border-b-[#D9D9D9] hover:bg-black/10">
        <Link to={`${result?.id}`}>{result?.survey_name}</Link>
        <p>{formatDate(result?.created_at)}</p>
        <p>
          <CountUp start={0} end={responsesCount || 0} duration={1} separator="," />
          /
          <CountUp start={0} end={totalStudents || 0} duration={1} separator="," />
        </p>
        <div className="flex justify-center items-center gap-x-2">
            <div className={`w-2 h-2 rounded-full
            ${result?.status === 'active' ? 'bg-green-400' : result?.status === 'past due' ? 'bg-red-500' : 'bg-orange-400'}`}></div>  
            <p>{result?.status}{isCompleted ? " (Completed)" : ""}</p>
        </div>
        <div className="flex justify-center gap-x-5 items-center">
          <Link to={`/Teacher/NewSurvey/Update-Survey/${result?.id}`} className='bg-[#BFD3FF] inline-flex px-3 py-0.5 gap-2 rounded-lg'>
              <img src='/edit_icon.svg' alt="" className='w-4'/>
              <p className='text-[#0A57FF] font-semibold'>Edit</p>
          </Link>
          <RiDeleteBin6Line role="button" className='text-xl text-[#DC0202]' onClick={() => setModalOpen(true)}/>
          <DeleteModal
          isOpen={isModalOpen}
          surveyName={result?.survey_name}
          onClose={() => setModalOpen(false)}
          onDelete={handleDelete}
        />
        </div>
      </div>
    )
}
