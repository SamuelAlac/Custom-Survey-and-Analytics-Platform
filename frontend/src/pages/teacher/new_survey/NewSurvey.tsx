import { Link } from "react-router-dom"
import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from "react";

type QuestionType = 'mcq' | 'likert' | 'short_text'

interface Question {
    id: string;
    type: QuestionType;
    title: string;
    options?: string[]
}

interface SurveyFormFields {
    title: string;
    due_date: string;
    section: string;
    questions: Question[];
}

const NewSurvey = () => {
    const { register, control, handleSubmit, setValue, getValues } = useForm<SurveyFormFields>({
        defaultValues: { title: '', due_date: '', section: '', questions: [] }
    })
    const [questions, setQuestions] = useState<Question[]>([])

    useEffect(() => {
        setValue("questions", questions)
    }, [questions, setValue])
    
    const addQuestion = (type: QuestionType) =>{
        const newQuestion: Question = {
            id: crypto.randomUUID(),
            type,
            title: '',
            options: type === "mcq" ? ["Option 1", "Option 2"] : [],
        }
        setQuestions(prev => [...prev, newQuestion])
    }

    const onSubmit: SubmitHandler<SurveyFormFields> = (formData) =>{
        console.log(formData)
    }
    
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

                    {/* SURVEY BUILDER START */}
                    <div className='space-y-2'>
                        <h2 className='text-lg'>Questions</h2>
                        <button onClick={() => addQuestion('mcq')} 
                        className='bg-white w-full p-3 flex gap-3 items-center rounded-lg cursor-grab'>
                            <img src='/mcq_icon.svg' alt="Heading Icon" className='w-5'/>
                            <p className='text-[#F37611] font-semibold'>Multiple Choice</p>
                        </button>

                        <button onClick={() => addQuestion('likert')} 
                        className='bg-white w-full p-3 flex gap-3 items-center rounded-lg cursor-grab'>
                            <img src='/likert_scale_icon.svg' alt="Heading Icon" className='w-5'/>
                            <p className='text-[#F37611] font-semibold'>Likert Scale</p>
                        </button>

                        <button onClick={() => addQuestion('short_text')} 
                        className='bg-white w-full p-3 flex gap-3 items-center rounded-lg cursor-grab'>
                            <img src='/short_text_icon.svg' alt="Heading Icon" className='w-5'/>
                            <p className='text-[#F37611] font-semibold'>Short Text</p>
                        </button>
                    </div>
                </aside>
                {/* SURVEY BUILDER END */}

                <form onSubmit={handleSubmit(onSubmit)} className='bg-white h-fit w-200 ms-75 p-5 flex flex-col space-y-5'>
                    <div className='flex flex-col space-y-1.5'>
                        <label htmlFor="title">Survey Title</label>
                        <input {...register('title')} type="text" name='title' required placeholder='Enter survey title...'
                        className='border border-[#ACA6A7] p-2 rounded-lg placeholder-[#ACA6A7]'/>
                    </div>

                    <div className='flex justify-between gap-5'>
                        <div className='flex flex-col w-full space-y-1.5'>
                            <label htmlFor="due_date">Due Date</label>
                            <input {...register('due_date')} type="date" name='due_date' required
                            className='input border border-[#ACA6A7] p-2 rounded-lg placeholder-[#ACA6A7]'/>
                        </div>

                        <div className='flex flex-col w-full space-y-1.5'>
                            <label htmlFor="title">Assign to Section</label>
                            <select {...register('section')} name="section" required className="border border-[#ACA6A7] p-2 rounded-lg placeholder-[#ACA6A7]">
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

                    <div className="space-y-5">
                        {questions.map((question, index) => (
                        <div key={question.id} className="border rounded-lg p-4 space-y-3">
                            <input type="text" value={question.title}
                            onChange={(e) => { const newQuestions = [...questions]
                                newQuestions[index].title = e.target.value
                                setQuestions(newQuestions)
                            }}
                            placeholder={`Question ${index + 1}...`} className="w-full p-2 border rounded-lg"
                            />

                            {/* Render by type */}
                            {question.type === "mcq" && (
                            <div className="space-y-2"> {question.options?.map((opt, optIndex) => (
                                <input key={optIndex} type="text" value={opt}
                                    onChange={(e) => { const newQs = [...questions]
                                    newQs[index].options![optIndex] = e.target.value
                                    setQuestions(newQs)
                                    }}
                                    className="border p-1 rounded w-full" placeholder={`Option ${optIndex + 1}`}
                                />
                                ))}
                                <button type="button" className="text-sm text-[#F37611]"
                                onClick={() => { const newQs = [...questions]
                                    newQs[index].options?.push(`Option ${question.options!.length + 1}`)
                                    setQuestions(newQs)
                                }}>
                                + Add Option
                                </button>
                            </div>
                            )}

                            {question.type === "likert" && (
                            <p className="text-sm text-gray-600"> Likert Scale (1 - 5) will be shown to respondent.</p>
                            )}

                            {question.type === "short_text" && (
                            <textarea disabled className="w-full border rounded-lg p-2" 
                            placeholder="Short answer field..."></textarea>
                            )}
                        </div>
                        ))}
                    </div>

                    <button type="submit" className="bg-[#F37611] text-white font-semibold py-2 rounded-lg mt-5">
                        Save Survey
                    </button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default NewSurvey

                    // {/* MULTIPLE CHOICE QUESTION START */}
                    // <div className="bg-amber-100 min-h-fit w-full flex flex-col space-y-3 p-3">
                    //     <div className="min-w-150 p-3 flex text-xl font-semibold">
                    //         <label htmlFor="question" className="px-2">2.</label>
                    //         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae dolorem quaerat laboriosam consequatur a, tempora ea voluptates mollitia rerum harum dolore maiores explicabo itaque debitis, nostrum pariatur repudiandae ipsum odit.</p>
                    //     </div>
                    //     <form className="px-6 flex flex-col justify-center gap-3 text-[#595959]">
                    //         <div className="space-x-2">
                    //             <input type="radio" name="answer" value={'Choice A'} className="radio radio-xs" />
                    //             <label htmlFor="Choice A">Choice A</label>
                    //         </div>

                    //         <div className="space-x-2">
                    //             <input type="radio" name="answer" value={'Choice B'} className="radio radio-xs" />
                    //             <label htmlFor="Choice B">Choice B</label>
                    //         </div>

                    //         <div className="space-x-2">
                    //             <input type="radio" name="answer" value={'Choice C'} className="radio radio-xs" />
                    //             <label htmlFor="Choice C">Choice C</label>
                    //         </div>

                    //         <div className="space-x-2">
                    //             <input type="radio" name="answer" value={'Choice D'} className="radio radio-xs" />
                    //             <label htmlFor="Choice D">Choice D</label>
                    //         </div>
                    //     </form>
                    // </div>
                    // {/* MULTIPLE CHOICE QUESTION END */}

                    // {/* LIKERT SCALE START */}
                    // <div className="bg-amber-100 min-h-fit w-full flex flex-col space-y-3 p-3">
                    //     <div className="min-w-150 p-3 flex text-xl font-semibold">
                    //         <label htmlFor="question" className="px-2">2.</label>
                    //         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae dolorem quaerat laboriosam consequatur a, tempora ea voluptates mollitia rerum harum dolore maiores explicabo itaque debitis, nostrum pariatur repudiandae ipsum odit.</p>
                    //     </div>

                    //     <form className="flex justify-around text-[#595959]">
                    //         <div className="space-x-2">
                    //             <input type="radio" name="answer" value={'Strongly Agree'} className="radio radio-xs" />
                    //             <label htmlFor="Strongly Disagree">1</label>
                    //         </div>

                    //         <div className="space-x-2">
                    //             <input type="radio" name="answer" value={'Agree'} className="radio radio-xs" />
                    //             <label htmlFor="Disagree">2</label>
                    //         </div>

                    //         <div className="space-x-2">
                    //             <input type="radio" name="answer" value={'Neutral'} className="radio radio-xs" />
                    //             <label htmlFor="Neutral">3</label>
                    //         </div>

                    //         <div className="space-x-2">
                    //             <input type="radio" name="answer" className="radio radio-xs" />
                    //             <label htmlFor="Agree">4</label>
                    //         </div>

                    //         <div className="space-x-2">
                    //             <input type="radio" name="answer" className="radio radio-xs" />
                    //             <label htmlFor="Strongly Agree">5</label>
                    //         </div>
                    //     </form>
                    //     <div className="flex justify-between text-sm text-[#595959]">
                    //         <p>Strongly Disagree</p>
                    //         <p>Strongly Agree</p>
                    //     </div>
                    // </div>
                    // {/* IKERT SCALE END */}

                    // {/* SHORT TEXT START */}
                    // <div className="bg-amber-100 min-h-fit w-full flex flex-col space-y-3 p-3">
                    //     <div className="min-w-150 p-3 flex text-xl font-semibold">
                    //         <label htmlFor="question" className="px-2">3.</label>
                    //         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae dolorem quaerat laboriosam consequatur a, tempora ea voluptates mollitia rerum harum dolore maiores explicabo itaque debitis, nostrum pariatur repudiandae ipsum odit.</p>
                    //     </div>

                    //     <form className="text-[#595959] h-50 px-3">
                    //         <textarea placeholder="Hint ng text..." disabled className="w-full h-full textarea textarea-lg"></textarea>
                    //     </form>
                    // </div>
                    // {/* SHORT TEXT END */}