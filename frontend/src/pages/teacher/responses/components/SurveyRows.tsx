import { SurveyRow } from './SurveyRow'
import { SurveyRowSkeleton } from './SurveyRowSkeleton';

export const SurveyRows = ({ data, sectionData, isLoading }: { data: any; sectionData: any; isLoading: boolean; }) => {

  const getTotalStudents = (allowedSections: any) => {
    if (!sectionData) return 0;

    const allowedSectionStudents = sectionData
      ?.filter((section: any) => allowedSections.includes(section?.id))
      ?.map((section: any) => section?.user)
      ?.flat();

    return allowedSectionStudents?.length || 0;
  };

  if (isLoading) return Array.from({ length: 10 }).map((_, index: number) =>(
    <SurveyRowSkeleton key={index}/>
  ))

  return (
    <>
    {data?.map((survey: any, index: number) =>{
      const totalStudents = getTotalStudents(survey?.sections)

      return (
        <SurveyRow key={index} result={survey} totalStudents={totalStudents} />
      )
    })}
    </>
  );
};
