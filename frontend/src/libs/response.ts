export const getResponsesForRespondent = (surveyAssignment: any, respondentEmail: string) =>{
  const questions = surveyAssignment?.survey?.questions || [];
  console.log('asdqwd',questions)

  return questions?.map((question: any) => {
    const answerObj = question?.answers?.find((a: any) => a?.respondent === respondentEmail);
    return {
      question: question?.text,
      question_type: question?.question_type,
      question_choices: question?.question_choices,
      response: answerObj ? answerObj.response : null,
      responseId: answerObj ? answerObj?.id : null,
      order: question?.order,
      answer: answerObj ? answerObj?.answer : null,
    };
  });
}