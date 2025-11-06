import { Link } from 'react-router-dom';
import VerificationForm from './components/VerificationForm';

export const VerifyAccount = () => {
  return (
    <section className='flex flex-col justify-center items-center bg-white'>    
        <Link to="/Auth/Student-Register" className='hidden md:block text-[#F37611] text-start w-60 md:w-110'>Back to Registration</Link>
        <div className='md:w-130 md:h-120 flex flex-col justify-center items-center'>
            <h2 className='text-black text-xl md:text-4xl font-bold'>Please Check your Email</h2>
            <div className='w-50 md:w-90 text-center mt-2'>
                <p className='text-[#ACA6A7] text-sm md:text-lg'>We sent the link to your email.</p>
                <p className='text-[#ACA6A7] text-sm md:text-lg'>Please check your inbox.</p>
            </div>
            <VerificationForm/>
        </div>
    </section>
  )
}

export default VerifyAccount