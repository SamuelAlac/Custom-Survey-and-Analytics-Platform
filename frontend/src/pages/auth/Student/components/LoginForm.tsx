import { Link, useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAuth } from '../../../../context/AuthContext'
import { useState } from 'react';


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

import React from 'react'

const LoginForm = () => {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({})
    const navigate = useNavigate()
    const { login, loading, logout } = useAuth()

    const [toast, setToast] = useState<Toast | null>(null);

    const showToast = (type: Toast['type'], message: string, duration = 3000) => {
    setToast({ type, message, duration });

    setTimeout(() => {
        setToast(null);
    }, duration);
    };

    const onSubmit: SubmitHandler<FormFields> = async (formData) =>{
        try {
            const { email, password, rememberMe } = formData
            const res = await login({ email, password, rememberMe })
            console.log(res)
            if (res.user){
                if (res.user.role == 'STUDENT'){
                    console.log('login successfull')
                    showToast('success', 'Login successful! Redirecting...');
                    setTimeout(() => navigate('/Student/Dashboard'), 1500);
                }else{
                    await logout()
                    showToast('warning', 'You are not authorized authorized.' );
                }
            }
        } catch (error: any) {
                showToast('warning', error?.detail);
                if (error?.email) {
                setError("email", { type: "server", message: error.email[0] });
                }
                if (error?.password) {
                setError("password", { type: "server", message: error.password[0] });
                }
            }
        }

  return (
    <>
    {toast && (
        <div className='toast toast-top toast-center z-50'>
            <div className={`alert ${
            toast.type === 'success' ? 'alert-success' :
            toast.type === 'error' ? 'alert-error' :
            toast.type === 'warning' ? 'alert-warning' : 'alert-info'
            }`}>
            <span>{toast.message}</span>
            </div>
        </div>
    )}

    <form onSubmit={handleSubmit(onSubmit)} className='text-black w-60 md:w-110 h-75 text-start mt-5 flex flex-col space-y-3 md:space-y-5'>
        <div className='flex flex-col'>
            <label htmlFor="email" className='text-md md:text-2xl font-bold text-start'>Email</label>
            <input { ...register('email') } type="email" name='email' placeholder='Email'
            className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]'/>
            {errors.email && <div className="text-red-900">{errors.email.message}</div>}
        </div>

        <div className='flex flex-col'>
            <label htmlFor="password" className='text-md md:text-2xl font-bold text-start'>Password</label>
            <input { ...register('password') } type="password" name='password' placeholder='Password'
            className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]'/>
            {errors.password && <div className="text-red-900">{errors.password.message}</div>}
        </div>

        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
                <input { ...register('rememberMe') } type="checkbox" name="remember_me" className='checkbox checkbox-sm rounded-sm
                bg-white border-[#ACA6A7] border checked:text-[#F37611]'/>
                <span className='text-[#ACA6A7] text-[10px] md:text-sm'>Remember me</span>
            </div>
            <Link to="/" className='hidden md:block text-[#F37611] text-sm'>Forgot your password?</Link>
        </div>

        <button type='submit' className='bg-[#F37611] text-md md:text-xl h-10 rounded-lg text-white shadow-lg shadow-black/30'>Log in</button>
        <Link to="/" className='block md:hidden text-[#F37611] text-[12px] text-end md:text-sm'>Forgot your password?</Link>
    </form>
    </>
  )
}

export default LoginForm