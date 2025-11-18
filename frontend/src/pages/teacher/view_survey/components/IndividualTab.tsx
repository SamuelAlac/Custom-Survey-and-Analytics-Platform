import { useEffect, useState } from "react";
import { getResponsesForRespondent } from "../../../../libs/response";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DeleteModal } from "./DeleteModal";
import { useDeleteResponseMutation } from "../../../../features/response/hooks";

export const IndividualTab = ({ data }: { data: any }) => {
  console.log(data)
  const initialValue = data?.respondents[0]?.email
  const [respondent, setRespondent] = useState(initialValue)
  const [isModalOpen, setModalOpen] = useState(false)
  const [responseID, setResponseID] = useState<string | null>(null)
  const deleteMutation = useDeleteResponseMutation()
  const respondents = data?.respondents

  const individualResponses = getResponsesForRespondent(data, respondent);
  console.log('PLEASE',individualResponses);

  useEffect(() => {
  if (data?.respondents?.length > 0) {
    setRespondent(data.respondents[0].email);
  }
}, [data]);

  const handleDelete = () => {
      console.log(responseID)
      deleteMutation.mutate(responseID)
      setModalOpen(false);
  };

  return (
    <div className="min-h-fit h-screen tab-content mt-5 space-y-10">
      <div className="bg-white p-5 min-h-fit flex items-center justify-between 
      h-30 rounded-xl shadow-lg shadow-black/30">
        <select className="select"
        value={respondent} onChange={(e: any) => setRespondent(e.target.value)}>
          {respondents?.map((respondent: any) =>(
            <option key={respondent?.id} id={respondent?.id} value={respondent?.email}>{respondent?.email}</option>
          ))}
        </select>
        <RiDeleteBin6Line
          role="button"
          className="text-xl cursor-pointer"
          onClick={() => {
            const selectedRespondent = respondents.find((r: any) => r.email === respondent);
            if (!selectedRespondent?.responses?.length) return;
              setResponseID(selectedRespondent.responses[0].id);
              setModalOpen(true);}}/>
        <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={handleDelete}
        />
      </div>

      <div className="bg-white p-5 min-h-fit flex flex-col h-30 rounded-xl shadow-lg shadow-black/30">
        <p className="text-[#ACA6A7] text-[10px]">{data?.editable === true ? 'Response can be edited' : 'Response cannot be edited'}</p>
        <h1 className="text-3xl">{data?.survey?.title}</h1>
        <p className="text-sm">{data?.survey?.description}</p>
        <hr className="h-0.5 mt-5 bg-[#595959] opacity-20"/>
      </div>

      {individualResponses?.slice().sort((a: any, b: any ) => a?.order - b?.order)?.map((question: any) =>(
        <div key={question?.id}>
        {question?.question_type === 'mcq' && (
          <div className="bg-white p-5 min-h-fit flex flex-col justify-center 
          h-30 rounded-xl shadow-lg shadow-black/30">
          <h1 className="text-2xl">{question?.question}</h1>
            <div className="flex flex-col gap-y-5 justify-between mt-5">
              {question?.question_choices?.map((choice: any, index: number) =>(
                <div key={index} className="flex items-center gap-2 text-[#595959]">
                  <input checked={String(question?.answer) === String(choice?.text ?? choice?.id)} type="radio" 
                  className="disabled:bg-current disabled:border-current cursor-not-allowed radio"/>
                  <label htmlFor={choice?.text}>{choice?.text}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {question?.question_type === 'likert' && (
          <div className="bg-white p-5 min-h-fit flex flex-col justify-center 
          h-30 rounded-xl shadow-lg shadow-black/30">
          <h1 className="text-2xl">{question?.question}</h1>
            <div className="flex justify-between mt-5">
              {question?.question_choices?.map((choice: any, index: number) =>(
                <div key={index} className="flex items-center gap-2 text-[#595959]">
                  <input checked={String(question?.answer) === String(choice?.text ?? choice?.id)} type="radio" 
                  className="disabled:bg-current disabled:border-current cursor-not-allowed radio"/>
                  <label htmlFor={choice?.text}>{choice?.text}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {question?.question_type === 'text' && (
          <div className="bg-white p-5 min-h-fit flex flex-col justify-center 
          h-30 rounded-xl shadow-lg shadow-black/30">
          <h1 className="text-2xl">{question?.question}</h1>
            <div className="flex justify-between mt-5">
              <textarea disabled className="w-full min-h-fit h-30 p-4 outline-none rounded-xl border-2 border-[#9E9C9C]"
              value={question?.answer}></textarea>
            </div>
          </div>
        )}
        </div>
        ))}
    </div>
  )
}
