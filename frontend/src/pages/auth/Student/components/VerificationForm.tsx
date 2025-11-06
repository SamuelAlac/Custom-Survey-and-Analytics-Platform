import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import OTPInput from 'react-otp-input';
import { verifyUser } from '../../../../features/auth/api';

type Toast = {
    type: 'info' | 'success' | 'error' | 'warning' | null;
    message: string;
    duration?: number;
};

const VerificationForm = () => {

    // const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const email = searchParams.get('email');
    if (!email) throw new Error('Email not found')
    const [otp, setOtp] = useState('');
    
    const [toast, setToast] = useState<Toast | null>(null);
    
    const showToast = (type: Toast['type'], message: string, duration = 3000) => {
    setToast({ type, message, duration });

    setTimeout(() => {
        setToast(null);
    }, duration);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(`Entered OTP: ${otp}`)
        const res = await verifyUser({ email: email, code: otp })
        if (res.success !== false){
            showToast('success', 'User successfully verified! Redirecting back to login...')
            setTimeout(() => navigate('/Auth/Student-Login'), 2500);
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

    <form onSubmit={(e) => handleSubmit(e)} className='text-black w-60 md:w-110 h-75 text-start mt-5 flex flex-col space-y-3 md:space-y-5'>
        <div className='flex justify-center'>
            <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-1 text-black"></span>}
            renderInput={(props) => (
                <input
                {...props}
                className="!w-[60px] !h-[60px] !text-2xl text-center border border-gray-300 rounded-md focus:!border-[#F37611] focus:!ring-2 focus:!ring-[#F37611] focus:!outline-none"
                />
            )}
            />
        </div>

        <button type='submit' className='bg-[#F37611] text-md md:text-xl h-12 rounded-lg text-white shadow-lg shadow-black/30'>Next</button>
        <div className='flex justify-center items-center'>
            <p className='text-[#ACA6A7] text-center text-sm md:text-md'>Didn't received any code?</p>
            <button className='text-[#F37611] font-semibold ms-1'>Click to Resend</button>
        </div>
    </form>
    </>
  )
}

export default VerificationForm