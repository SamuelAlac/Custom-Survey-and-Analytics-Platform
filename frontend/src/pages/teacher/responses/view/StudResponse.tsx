import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ResponseNote } from '../../../student/my_responses/components/ResponseNote'

const StudResponse = () => {

  const { id } = useParams<{ id: string }>()
  if (!id) return <p>Survey ID is missing</p>

  return (
    <section>
      <div className='h-10 md:h-15 flex items-center justify-between'>
        <h1 className="text-[#050505] text-sm md:text-2xl text-center lg:text-start lg:text-4xl font-semibold">Response</h1>
        <Link to='/Teacher/Dashboard' className='text-sm md:text-xl text-[#F37611]'>Back to Dashboard</Link>
      </div>

      <div className="bg-white rounded-xl min-h-fit h-screen shadow-lg shadow-black/30 mt-10">
          <ResponseNote id={id} />
      </div>
    </section>
  )
}

export default StudResponse