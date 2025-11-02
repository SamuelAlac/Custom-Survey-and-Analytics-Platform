import React, { useState } from 'react'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import OTPInput from 'react-otp-input';
import { verifyUser } from '../../../features/auth/api';

export const VerifyAccount = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    if (!email) throw new Error('Email not found')
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(`Entered OTP: ${otp}`)
        const res = await verifyUser({ email: email, code: otp })
        console.log(res)
    }

  return (
    <section className='flex flex-col justify-center items-center bg-white'>
        <Link to="/Auth/Student-Login" className='hidden md:block text-[#F37611] text-start w-60 md:w-110'>Back to login</Link>
        <div className='md:w-130 md:h-120 flex flex-col justify-center items-center'>
            <h2 className='text-black text-xl md:text-4xl font-bold'>Please Check your Email</h2>
            <div className='w-50 md:w-90 text-center mt-2'>
                <p className='text-[#ACA6A7] text-sm md:text-lg'>We sent the link to your email.</p>
                <p className='text-[#ACA6A7] text-sm md:text-lg'>Please check your inbox.</p>
            </div>

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
        </div>
    </section>
  )
}

export default VerifyAccount