import { Link, useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAuth } from '../../../context/AuthContext'
import { useState } from 'react';
import LoginForm from './components/LoginForm';

type FormFields = {
    email: string;
    password: string;
    rememberMe: boolean;
}

type Toast = {
    type: 'info' | 'success' | 'error' | 'warning' | null;
    message: string;
    duration?: number;
};

const StudentLogin = () => {
  return (
    <section className='flex flex-col justify-center items-center bg-white'>
        <Link to="/" className='hidden md:block text-[#F37611] text-start w-60 md:w-110'>Back to u</Link>
        <div className='md:w-130 md:h-120 flex flex-col justify-center items-center'>
            <h2 className='text-black text-xl md:text-4xl font-bold'>Welcome Back</h2>
            <div className='w-50 md:w-90 text-center mt-2'>
                <p className='text-[#ACA6A7] text-sm md:text-md'>Enter your email and password to access your account.</p>
            </div>

            <LoginForm/>
            <p className='text-[#ACA6A7] text-center text-sm md:text-md'>Don't have an account?
                <Link to='/Auth/Student-Register' className='text-[#F37611] font-semibold'> Sign Up</Link>
            </p>
        </div>
    </section>
  )
}

export default StudentLogin