import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useSurveyAssignmentWithQuestionAndAnswer } from "../../../../features/survey_assignment/hooks"
import { formatDate } from "../../../../libs/formatDate"
import { PaginationControls } from "../../../../components/PaginationControls"
import { RiDeleteBin6Line } from "react-icons/ri";
import { DeleteResponseModal } from "../components/DeleteResponseModal"
import { useDeleteResponseMutation } from "../../../../features/response/hooks"
import { SurveyRowSkeleton } from "../components/SurveyRowSkeleton"
import { ResponseViewSkeleton } from "../components/ResponseViewSkeleton"

const ResponseView = () => {

  const { id } = useParams<{ id: string }>()
  if (!id) return <p>Survey ID is missing</p>
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const { data, isLoading } = useSurveyAssignmentWithQuestionAndAnswer({ id })
  console.log('sss',data)

  let respondents = data?.respondents || [];

  if (sort) {
        respondents = respondents.filter((respondent: any) => respondent.section?.name === sort);
    }

  const totalPages = Math.ceil(respondents?.length / itemsPerPage);
  const startIdx = (page - 1) * itemsPerPage;
  const currentRespondents = respondents?.slice(startIdx, startIdx + itemsPerPage);
  const deletemMutation = useDeleteResponseMutation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseIdToDelete, setResponseIdToDelete] = useState<string | null>(null);
  const [respondentEmail, setRespondentEmail] = useState<string>("");
  
  const handleDelete = () => {
  if (!responseIdToDelete) return;
  deletemMutation.mutate(responseIdToDelete)
  setIsModalOpen(false);
  setResponseIdToDelete(null);
  setRespondentEmail("");
  };


  if (isLoading) return (
    <ResponseViewSkeleton/>
  )

  return (
    <section>
        <div className='min-h-fit h-100 bg-white mt-7 rounded-xl space-y-8 shadow-lg shadow-black/30'>
            <div className='space-y-5'>
                <div className='flex gap-x-3 ps-5 pt-5 items-center'>
                <input type="text" className="input input-bordered" placeholder="Search..."/>
                <select
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value)
                        setPage(1)
                    }}
                    className="select w-30"
                    >
                    <option value="">All Sections</option>
                    {data?.sections?.map((section: string, idx: number) => (
                        <option key={idx} value={section}>
                        {section}
                        </option>
                    ))}
                </select>
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
                    {currentRespondents?.map((result: any, index: number) =>(
                        <div key={index} className="w-full p-2 grid grid-cols-5 text-center font-semibold h-10 border-b border-b-[#D9D9D9] hover:bg-black/10">
                        <Link to={`${result?.responses?.[0]?.id}`}>{result?.id}</Link>
                        <p>{result?.email}</p>
                        <p>{result?.section?.name}</p>
                        <p>{formatDate(result?.responses?.[0]?.created_at)}</p>
                        <div className="flex justify-center gap-x-5 items-center">
                        <RiDeleteBin6Line
                        role="button"
                        className="text-xl text-[#DC0202]"
                        onClick={() => {
                            setResponseIdToDelete(result?.responses?.[0]?.id);
                            setRespondentEmail(result.email);
                            setIsModalOpen(true);
                        }}
                        />                          
                        <DeleteResponseModal
                            isOpen={isModalOpen}
                            respondent={respondentEmail}
                            onClose={() => setIsModalOpen(false)}
                            onDelete={handleDelete}
                        />
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            <div className="pb-5">
                <PaginationControls page={page} setPage={setPage} totalPages={totalPages}/>
            </div>
            </div>
    </section>
  )
}

export default ResponseView