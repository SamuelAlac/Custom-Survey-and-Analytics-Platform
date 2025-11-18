import { PieChart } from '../../../../components/PieChart'
import { BarChart } from '../../../../components/BarChart'
import { WordCloudComponent } from '../../../../components/WordCloudComponent'
import { stopWords } from '../../../../libs/constants'
import CountUp from 'react-countup'

export const SummaryTab = ({ questions }: { questions: any }) => {

  const getTokens = (text: string): string[] => {
  return (text?.toLowerCase().match(/\w+/g) || [])
    .filter(token => token.length > 1 && !stopWords.has(token));
  };

  const wordCloudMap: Record<string, { text: string; value: number }[]> = {};
  const shortTextQuestions = questions?.filter((q: any) => q?.question_type === "text" || []);

  shortTextQuestions?.forEach((question: any) => {
    const words = question?.answers?.flatMap((a: any) => getTokens(a.answer)) || [];
    const wordCounts: Record<string, number> = words?.reduce((acc: any, word: any) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    wordCloudMap[question?.id] = Object?.entries(wordCounts)?.map(([text, value]) => ({ text, value }));
  });


  return (
    <div className="min-h-fit h-screen tab-content mt-5 space-y-10">
        {questions?.slice().sort((a: any, b: any ) => a?.order - b?.order)?.map((question: any) =>(
            <div key={question?.id}>
            {question?.question_type === 'mcq' && (
                <div className="bg-white p-5 min-h-fit h-100 rounded-xl shadow-lg shadow-black/30">
                <h1 className="text-2xl">{question?.text}</h1>
                <p><CountUp start={0} end={question?.answers?.length || 0} duration={1} separator="," />  Responses</p>
                <div className="flex justify-center items-center">
                    <div className="w-90 h-70">
                    <PieChart mcq={question}/>
                    </div>
                </div>
                </div>
            )}

            {question?.question_type === 'likert' && (
                <div className="bg-white p-5 min-h-fit h-100 rounded-xl shadow-lg shadow-black/30">
                <h1 className="text-2xl">{question?.text}</h1>
                <p><CountUp start={0} end={question?.answers?.length || 0} duration={1} separator="," />  Responses</p>
                <div className="flex justify-center items-center">
                    <div className="w-150 h-70">
                    <BarChart likert={question}/>
                    </div>
                </div>
                </div>
            )}

            {question?.question_type === 'text' && (
                <div className="bg-white p-5 min-h-fit h-100 rounded-xl shadow-lg shadow-black/30">
                <h1 className="text-2xl">{question?.text}</h1>
                <p><CountUp start={0} end={question?.answers?.length || 0} duration={1} separator="," />  Responses</p>
                <div className="flex justify-center items-center">
                    <WordCloudComponent words={wordCloudMap[question?.id] || []}/>
                </div>
                </div>
            )}
            </div>
        ))}
    </div>
  )
}
