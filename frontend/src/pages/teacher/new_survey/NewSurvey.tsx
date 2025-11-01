import { Link } from "react-router-dom"

const NewSurvey = () => {
  return (
    <section className='space-y-8 max-h-full'>
        <div className='h-10 md:h-15 flex items-center justify-between'>
            <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-bold">Create New Survey</h1>
            <Link to='Dashboard' className='text-[#F37611]'>Back to Dashboard</Link>
        </div>

        <div className='flex flex-col items-center justify-center min-h-full'>
            <h1 className='text-black'>CREATE SURVEY</h1>

            <div className='text-black flex w-full h-500 gap-10'>
                <aside className="bg-[#F37611]/70 text-white w-70 h-135 p-5 rounded-2xl flex flex-col space-y-3 fixed">
                    <h1 className='text-xl font-semibold'>Elements</h1>

                    <div className='space-y-2'>
                        <h2 className='text-lg'>Basic</h2>
                        <button className='bg-white w-full p-3 flex gap-3 items-center rounded-lg cursor-grab'>
                            <img src='/heading_icon.svg' alt="Heading Icon" className='w-5'/>
                            <p className='text-[#F37611] font-semibold'>Heading</p>
                        </button>
                    </div>

                    <div className='space-y-2'>
                        <h2 className='text-lg'>Drop downs</h2>
                        <button className='bg-white w-full p-3 flex gap-3 items-center rounded-lg cursor-grab'>
                            <img src='/date_time_icon.svg' alt="Heading Icon" className='w-5'/>
                            <p className='text-[#F37611] font-semibold'>Date & Time</p>
                        </button>

                        <button className='bg-white w-full p-3 flex gap-3 items-center rounded-lg cursor-grab'>
                            <img src='/section_icon.svg' alt="Heading Icon" className='w-5'/>
                            <p className='text-[#F37611] font-semibold'>Section</p>
                        </button>
                    </div>

                    <div className='space-y-2'>
                        <h2 className='text-lg'>Questions</h2>
                        <button className='bg-white w-full p-3 flex gap-3 items-center rounded-lg cursor-grab'>
                            <img src='/mcq_icon.svg' alt="Heading Icon" className='w-5'/>
                            <p className='text-[#F37611] font-semibold'>Multiple Choice</p>
                        </button>

                        <button className='bg-white w-full p-3 flex gap-3 items-center rounded-lg cursor-grab'>
                            <img src='/likert_scale_icon.svg' alt="Heading Icon" className='w-5'/>
                            <p className='text-[#F37611] font-semibold'>Likert Scale</p>
                        </button>

                        <button className='bg-white w-full p-3 flex gap-3 items-center rounded-lg cursor-grab'>
                            <img src='/short_text_icon.svg' alt="Heading Icon" className='w-5'/>
                            <p className='text-[#F37611] font-semibold'>Short Text</p>
                        </button>
                    </div>
                </aside>

                <form className='bg-white h-200 w-200 ms-75 p-5 flex flex-col space-y-5'>
                    <div className='flex flex-col space-y-1.5'>
                        <label htmlFor="title">Survey Title</label>
                        <input type="text" name='title' placeholder='Enter survey title...'
                        className='border border-[#ACA6A7] p-2 rounded-lg placeholder-[#ACA6A7]'/>
                    </div>

                    <div className='flex justify-between gap-5'>
                        <div className='flex flex-col w-full space-y-1.5'>
                            <label htmlFor="due_date">Due Date</label>
                            <input type="date" name='due_date'
                            className='input border border-[#ACA6A7] p-2 rounded-lg placeholder-[#ACA6A7]'/>
                        </div>

                        <div className='flex flex-col w-full space-y-1.5'>
                            <label htmlFor="title">Assign to Section</label>
                            <select name="section" id="section" className="border border-[#ACA6A7] p-2 rounded-lg placeholder-[#ACA6A7]">
                                <option value="">None</option>
                                <option value="BSIT 4H-G1">BSIT 4H-G1</option>
                                <option value="BSIT 4H-G2">BSIT 4H-G2</option>
                            </select>
                        </div>
                    </div>

                    <div className='border-t border-[#D9D9D9] mt-5'>
                        <div className='w-full h-40 rounded-xl outline-dashed outline-[#ACA6A7] bg-[#E0E0E0] mt-5
                        flex justify-center items-center'>
                            <figure className='flex gap-3'>
                                <img src='/drag_n_drop_icon.svg' alt="drag n drop"/>
                                <p className='text-[#595959] font-semibold'>Drag your first question here</p>
                            </figure>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default NewSurvey