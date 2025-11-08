import React from 'react'
import { Link } from 'react-router-dom'
import { useSurveyAssignments } from '../../../features/survey_assignment/hooks'

const NewSurvey = () => {

    const { data } = useSurveyAssignments()
    const surveys = data?.results
    console.log(surveys)

  return (
    <section className='space-y-8 max-h-full'>
        <div className='h-10 md:h-15 flex items-center justify-between'>
            <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-bold">Survey Forms</h1>
            <Link to='Dashboard' className='text-[#F37611]'>Back to Dashboard</Link>
        </div>

        <div>
            <h2 className='text-lg'>Start a new form</h2>
            <div className='grid grid-cols-4 mt-5 space-y-10'>
                <div className="card w-80 h-50 bg-base-100 card-md shadow-lg shadow-black/20 flex justify-center items-center">
                    <Link to='Create-Survey'>
                        <img src="/add_survey.svg" alt="Add Survey" className='w-20' />
                    </Link>
                </div>

                <div className="card w-80 h-50 bg-base-100 card-md shadow-lg shadow-black/20">
                    <div className="card-body">
                        <h2 className="card-title">Large Card</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="card w-80 h-50 bg-base-100 card-md shadow-lg shadow-black/20">
                    <div className="card-body">
                        <h2 className="card-title">Large Card</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

                {surveys?.map((survey: any, index: number) =>(
                    <div className="card w-80 h-50 bg-base-100 card-md shadow-lg shadow-black/20">
                        <div className="card-body">
                            <h2 className="card-title">{survey?.survey_details.title}</h2>
                            <p>{survey?.survey_details.description}</p>
                            <div className="justify-end card-actions">
                            <button className="btn btn-primary">View</button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="card w-80 h-50 bg-base-100 card-md shadow-lg shadow-black/20">
                    <div className="card-body">
                        <h2 className="card-title">Large Card</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
  )
}

export default NewSurvey