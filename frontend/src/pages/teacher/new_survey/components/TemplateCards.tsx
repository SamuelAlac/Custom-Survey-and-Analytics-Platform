import { useEffect, useState } from 'react'
import { surveyTemplates } from '../../../../libs/constants'
import { TemplateCard } from './TemplateCard'
import { TemplateCardSkeleton } from './TemplateCardSkeleton'

export const TemplateCards = () => {
  const [loading, setLoading] = useState(true)
  const [templates, setTemplates] = useState([{}])

  useEffect(() =>{
    setTimeout(() => {
      setTemplates(surveyTemplates)
      setLoading(false)
    }, 1500);
  },[])

    if (loading) return Array.from({ length: 4 }).map((_, index) => <TemplateCardSkeleton key={index}/>)

  return (
    templates.map((template, index) =>(
        <TemplateCard key={index} template={template}/>
    ))
  )
}
