import { Link, useParams } from "react-router-dom"
import { useSurveyAssignmentWithSurvey } from "../../../features/survey_assignment/hooks"
import { ResponseForm } from "./components/ResponseForm"

const TakeSurvey = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) {
    return <p>Survey ID is missing</p>
  }

  const { data, isLoading } = useSurveyAssignmentWithSurvey({ id })
  const survey = data?.survey_details
  console.log(survey)
  const survey_questions = survey?.survey_questions
  console.log(survey_questions)
  
  

  return (
    <section>
      <div className='h-10 md:h-15 flex items-center justify-between'>
        <h1 className="text-[#050505] text-sm md:text-2xl text-center lg:text-start lg:text-4xl font-semibold">{survey?.title}</h1>
        <Link to='/Student/Dashboard' className='text-sm md:text-xl text-[#F37611]'>Back to Dashboard</Link>
      </div>

      <div className="bg-white rounded-xl min-h-fit h-screen shadow-lg shadow-black/30 mt-10">
        {/* <ResponseForm/> */}
        <form className='p-10'>
          <div className="space-y-15">
          {survey_questions?.map((question: any, index: number) =>(
              <div key={question?.order}>
              {question?.question_type === 'mcq' && (
                <fieldset className="space-y-5">
                  <legend className="text-2xl font-semibold">{question?.order}. {question?.text}</legend>
                  <div className="flex flex-col gap-y-5 text-[#595959]">
                    {question?.question_choices?.map((choice: any, index: number) =>(
                      <div key={index} className="space-x-2">
                      <input type="radio" name="mcqchoice" className="radio" />
                      <label htmlFor="Choice A">{choice?.text}</label>
                    </div>
                    ))}
                  </div>
                </fieldset>
              )}

              {question?.question_type === 'likert' && (
                <fieldset className="space-y-5">
                  <legend className="text-2xl font-semibold">{question?.order}. {question?.text}</legend>
                  <div className="flex justify-between">
                    {question?.question_choices?.map((choice: any, index: number) =>(
                      <div key={index} className="flex flex-col items-center gap-y-2 text-[#595959]">
                        <input type="radio" name="likertchoice" className="radio" />
                        <label htmlFor="Choice A">{index + 1}</label>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-5 text-sm">
                    <span>{question?.question_choices?.[0]?.text}</span>
                    <span>{question?.question_choices?.[question?.question_choices?.length - 1]?.text}</span>
                  </div>
                </fieldset>
              )}

              {question?.question_type === 'text' && (
                <fieldset className="space-y-5">
                  <legend className="text-2xl font-semibold">{question?.order}. {question?.text}</legend>
                  <textarea name="shorttext" className="w-full h-50 p-4 
                  outline-none rounded-xl border-2 border-[#9E9C9C]" placeholder="Type your answer here..."></textarea>
                </fieldset>
              )}
              </div>
          ))}
          </div>

          <button className="bg-[#F37611] p-5 w-full rounded-xl text-white font-semibold mt-5">Submit Survey</button>
      </form>
      </div>
    </section>
  )
}

export default TakeSurvey

{/* <div className="space-y-15">
  <fieldset className="space-y-5">
    <legend className="text-2xl font-semibold">1. Question na pang multiple choice</legend>
    <div className="flex flex-col gap-y-5 text-[#595959]">
      <div className="space-x-2">
        <input type="radio" name="mcqchoice" className="radio" defaultChecked />
        <label htmlFor="Choice A">Choice A</label>
      </div>

      <div className="space-x-2">
        <input type="radio" name="mcqchoice" className="radio" />
        <label htmlFor="Choice A">Choice B</label>
      </div>

      <div className="space-x-2">
        <input type="radio" name="mcqchoice" className="radio" />
        <label htmlFor="Choice A">Choice C</label>
      </div>

      <div className="space-x-2">
        <input type="radio" name="mcqchoice" className="radio" />
        <label htmlFor="Choice A">Choice D</label>
      </div>
    </div>
  </fieldset>

  <fieldset className="space-y-5">
    <legend className="text-2xl font-semibold">2. Question na pang likert scale</legend>
    <div className="flex justify-between">
      <div className="flex flex-col items-center gap-y-2 text-[#595959]">
        <input type="radio" name="likertchoice" className="radio" defaultChecked />
        <label htmlFor="Choice A">1</label>
      </div>

      <div className="flex flex-col items-center gap-y-2">
        <input type="radio" name="likertchoice" className="radio" />
        <label htmlFor="Choice A">2</label>
      </div>

      <div className="flex flex-col items-center gap-y-2">
        <input type="radio" name="likertchoice" className="radio" />
        <label htmlFor="Choice A">3</label>
      </div>

      <div className="flex flex-col items-center gap-y-2">
        <input type="radio" name="likertchoice" className="radio" />
        <label htmlFor="Choice A">4</label>
      </div>

      <div className="flex flex-col items-center gap-y-2">
        <input type="radio" name="likertchoice" className="radio" />
        <label htmlFor="Choice A">5</label>
      </div>
    </div>

    <div className="flex justify-between mt-5 text-sm">
      <span>Strongly Disagree</span> <span>Strongly Agree</span>
    </div>
  </fieldset>

  <fieldset className="space-y-5">
    <legend className="text-2xl font-semibold">3. Question na pang Short text</legend>
    <textarea name="shorttext" className="w-full h-50 p-4 
    outline-none rounded-xl border-2 border-[#9E9C9C]" placeholder="Type your answer here..."></textarea>
  </fieldset>
</div> */}