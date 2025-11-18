import { useParams } from "react-router-dom"
import CountUp from 'react-countup'
import { useSurveyAssignmentWithQuestionAndAnswer } from "../../../features/survey_assignment/hooks"
import { SummaryTab } from "./components/SummaryTab"
import { QuestionTab } from "./components/QuestionTab"
import { IndividualTab } from "./components/IndividualTab"

const ViewSurvey = () => {

  const { id } = useParams<{ id: string }>()
  if (!id) return <p>Survey ID is missing</p>
  const { data } = useSurveyAssignmentWithQuestionAndAnswer({ id })
  const questions = data?.survey?.questions

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-center p-6 text-2xl font-semibold bg-white">
        <CountUp start={0} end={data?.respondent_count || 0} duration={1} separator="," /> Responses</h1>
        <div className="tabs flex justify-around">

          {/* SUMMARY TAB */}
          <input type="radio" name="survey_tabs" className="tab bg-[#F37611] flex-1" aria-label="Summary" defaultChecked />
          <SummaryTab questions={questions}/>

          {/* QUESTION TAB */}
          <input type="radio" name="survey_tabs" className="tab bg-[#FBA02C] flex-1" aria-label="Question" />
          <QuestionTab questions={questions} data={data}/>

          {/* INDIVIDUAL TAB */}
          <input type="radio" name="survey_tabs" className="tab bg-[#FBA02C] flex-1" aria-label="Invididual" />
          <IndividualTab data={data}/>
        </div>
      </div>
    </section>
  )
}

export default ViewSurvey