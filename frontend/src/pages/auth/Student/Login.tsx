import { Link } from 'react-router-dom'
import LoginForm from './components/LoginForm';

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
            <div className='mt-5'>
              <p className='text-[#ACA6A7] text-center text-sm md:text-md'>Don't have an account?
                <Link to='/Auth/Student-Register' className='text-[#F37611] font-semibold'> Sign Up</Link>
              </p>
            </div>
        </div>
    </section>
  )
}

export default StudentLogin