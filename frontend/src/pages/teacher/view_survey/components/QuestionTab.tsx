import { useState } from 'react'

export const QuestionTab = ({ questions, data }: { questions: any, data: any }) => {

  const [filter, setFilter] = useState<'mcq' | 'likert' | 'text'>("mcq");

  return (
    <div className="min-h-fit h-screen tab-content mt-5 space-y-10">
      <div className="bg-white p-5 min-h-fit flex flex-col justify-center 
      h-30 rounded-xl shadow-lg shadow-black/30">
        <select className="select"
        value={filter} onChange={(e: any) => setFilter(e.target.value)}>
          <option value='mcq'>Multiple Choice Questions</option>
          <option value='likert'>Likert Scale Questions</option>
          <option value='text'>Short Text Questions</option>
        </select>
      </div>

      {questions?.slice().sort((a: any, b: any ) => a?.order - b?.order)
      ?.filter((question: any) => question?.question_type === filter)?.map((question: any) =>(
        <div key={question?.id}>
          {question?.question_type === 'mcq' && (
            <div className="bg-white p-5 min-h-fit flex flex-col justify-center 
            h-30 rounded-xl shadow-lg shadow-black/30">
            <h1 className="text-2xl">{question?.text}</h1>
              <div className="flex justify-between mt-5">
                {question?.question_choices?.map((choice: any, index: number) =>(
                  <div key={index} className="flex items-center gap-2 text-[#595959]">
                    <input disabled value={choice?.text} type="radio" 
                    className="disabled:bg-current disabled:border-current cursor-not-allowed radio"/>
                    <label htmlFor={choice?.text}>{choice?.text}</label>
                  </div>
                ))}
              </div>
              <hr className="bg-[#595959] opacity-40 h-0.5 my-5"/>
              <p className="text-[#F37611] font-semibold">{data?.respondent_count || 0} Responses</p>
            </div>
          )}

          {question?.question_type === 'likert' && (
            <div className="bg-white p-5 min-h-fit flex flex-col justify-center 
            h-30 rounded-xl shadow-lg shadow-black/30">
            <h1 className="text-2xl">{question?.text}</h1>
              <div className="flex justify-between mt-5">
                {question?.question_choices?.map((choice: any, index: number) =>(
                  <div key={index} className="flex items-center gap-2 text-[#595959]">
                    <input disabled value={choice?.text} type="radio" 
                    className="disabled:bg-current disabled:border-current cursor-not-allowed radio"/>
                    <label htmlFor={choice?.text}>{choice?.text}</label>
                  </div>
                ))}
              </div>
              <hr className="bg-[#595959] opacity-40 h-0.5 my-5"/>
              <p className="text-[#F37611] font-semibold">{data?.respondent_count || 0} Responses</p>
            </div>
          )}

          {question?.question_type === 'text' && (
            <div className="bg-white p-5 min-h-fit flex flex-col justify-center 
            h-30 rounded-xl shadow-lg shadow-black/30">
            <h1 className="text-2xl">{question?.text}</h1>
              <div className="flex justify-between mt-5">
                <textarea disabled className="w-full h-15 p-3 
                outline-none rounded-xl border-2 border-[#9E9C9C]" placeholder="Type your answer here..."></textarea>
              </div>
              <hr className="bg-[#595959] opacity-40 h-0.5 my-5"/>
              <p className="text-[#F37611] font-semibold">{data?.respondent_count || 0} Responses</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
