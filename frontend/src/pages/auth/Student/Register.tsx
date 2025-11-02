import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { registerUser } from '../../../features/auth/api';

type FormFields = {
    fname: string;
    lname: string
    email: string;
    password1: string;
    password2: string;
    section: string;
    tac: boolean
}

const StudentRegister = () => {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({})
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormFields> = async (formData) =>{
        try {
            const { fname, lname, email, password1, password2, section, tac } = formData
            const res = await registerUser({ fname, lname, email, password1, password2, section, tac })
            console.log(`Registration successfull, message: ${res.message} userID: ${res.user.id}`);
            navigate(`/Auth/Student-Register/${res.user.id}?email=${encodeURIComponent(email)}`,{
                state: { email }
            })
        } catch (error) {
        }
    }

  return (
    <section className='flex flex-col justify-center items-center bg-white'>
        <div className='md:w-130 md:h-120 flex flex-col justify-center items-center'>
            <h2 className='text-black text-xl md:text-4xl font-bold'>Create an Account</h2>
            <div className='w-40 md:w-90 text-center mt-2'>
                <p className='text-[#ACA6A7] text-sm md:text-md'>Already have an account? 
                    <Link to='/Auth/Student-Login' className='text-[#F37611] font-semibold'> Log in</Link>
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='text-black w-60 md:w-110 h-125 text-start mt-5 flex flex-col space-y-3 md:space-y-3'>
                <div className='grid grid-cols-2 gap-5'>
                    <div className='flex flex-col space-y-2'>
                        <label htmlFor="first_name" className='text-md md:text-2xl font-bold text-start'>First Name</label>
                        <input { ...register('fname') } type="text" placeholder='First Name' className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]' />
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <label htmlFor="last_name" className='text-md md:text-2xl font-bold text-start'>Last Name</label>
                        <input { ...register('lname') } type="text" placeholder='Last Name' className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]' />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="email" className='text-md md:text-2xl font-bold text-start'>Email</label>
                    <input { ...register('email') } type="email" placeholder='Email' className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]' />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="password1" className='text-md md:text-2xl font-bold text-start'>Password</label>
                    <input { ...register('password1') } type="password" placeholder='Password' className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]' />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="password2" className='text-md md:text-2xl font-bold text-start'>Confirm Password</label>
                    <input { ...register('password2') } type="password" placeholder='Confirm Password' className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]' />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="section" className='text-md md:text-2xl font-bold text-start'>Section</label>
                    <input { ...register('section') } type="text" placeholder='Section' className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]' />
                </div>

                <div className='flex items-center gap-1'>
                    <input { ...register('tac') } required type="checkbox" className='checkbox checkbox-sm rounded-sm bg-white border-[#ACA6A7] border checked:text-[#F37611]' />
                    <span className='text-[#ACA6A7] text-[10px] md:text-sm'>
                        I agree to the <a href="/" className='text-[#F37611] font-semibold'>terms and condition</a>
                    </span>
                </div>

                <button type='submit' className='bg-[#F37611] text-md md:text-xl h-10 p-1 rounded-lg text-white shadow-lg shadow-black/30'>Sign Up</button>
            </form>
        </div>
    </section>
  )
}

export default StudentRegister