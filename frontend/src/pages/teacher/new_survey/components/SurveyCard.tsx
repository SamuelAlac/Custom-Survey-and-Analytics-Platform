import React from 'react'
import { Link } from 'react-router-dom';

interface SurveyCardProps {
    survey: any;
    index: number;
}

export const SurveyCard = ({ survey, index }: SurveyCardProps) => {
  return (
    <div key={index} className="card w-80 h-50 bg-base-100 card-md shadow-lg shadow-black/20">
        <div className="card-body">
            <h2 className="card-title">{survey?.survey_name}</h2>
            <p>{survey?.survey_description}</p>
            <div className="justify-end card-actions">
            <Link to={`${survey?.id}`} className="btn btn-primary">View</Link>
            </div>
        </div>
    </div>
  )
}
