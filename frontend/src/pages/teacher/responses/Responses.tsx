import { Link } from "react-router-dom"
import { DashboardCards } from "./components/DashboardCards"
import { useSurveyAssignments } from "../../../features/survey_assignment/hooks"
import { useSectionStudents } from "../../../features/section/hooks"
import { useState } from "react"
import { PaginationControls } from "../../../components/PaginationControls"
import { SurveyRows } from "./components/SurveyRows"

const Responses = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading: surveyAssignmentLoading } = useSurveyAssignments(page, search)
  console.log('res',data)
  
  const {data: sectionData, isLoading: sectionLoading} = useSectionStudents()
  const sections = sectionData?.map((section: any) => section?.user)
  console.log('asd',sectionData)
  const totalStudents = sections?.flat()?.length
  console.log(totalStudents)

  const isLoading = surveyAssignmentLoading || sectionLoading

  return (
    <section className='space-y-3.5 max-h-full'>
      <div className='h-10 md:h-15 flex items-center justify-between'>
        <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-bold">Survey Results</h1>
        <Link to='Dashboard' className='text-[#F37611]'>Back to Dashboard</Link>
      </div>

      <div className='flex flex-col md:flex-row justify-between'>
        <DashboardCards/>
      </div>

      <div className='min-h-fit h-100 bg-white mt-7 rounded-xl space-y-8 shadow-lg shadow-black/30'>
        <div className='space-y-5'>
          <div className='flex gap-x-3 ps-5 pt-5 items-center'>
            <input type="text" className="input input-bordered" placeholder="Search..." value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}/>
          </div>
          
          <div className="w-full">
            <div className="w-full grid grid-cols-5 text-center items-center font-semibold bg-[#FBC38A] h-10">
              <p>Survey Title</p>
              <p>Date Created</p>
              <p>No. of Responses</p>
              <p>Status</p>
              <p>Action</p>
            </div>

            <div className="flex flex-col w-full h-100">
                <SurveyRows data={data?.results} sectionData={sectionData} isLoading={isLoading} />
            </div>
          </div>
        </div>

        <div className="pb-5">
            <PaginationControls page={page} setPage={setPage} totalPages={data?.total_pages}/>
        </div>
      </div>
    </section>
  )
}

export default Responses