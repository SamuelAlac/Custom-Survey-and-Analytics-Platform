import { Link } from 'react-router-dom'
import RegistrationForm from './components/RegistrationForm';

const StudentRegister = () => {
  return (
    <section className='flex flex-col justify-center items-center bg-white'>    
        <div className='md:w-130 md:h-120 flex flex-col justify-center items-center'>
            <h2 className='text-black text-xl md:text-4xl font-bold'>Create an Account</h2>
            <div className='w-40 md:w-90 text-center mt-2'>
                <p className='text-[#ACA6A7] text-sm md:text-md'>Already have an account? 
                    <Link to='/Auth/Student-Login' className='text-[#F37611] font-semibold'> Log in</Link>
                </p>
            </div>
            <RegistrationForm/>
        </div>
    </section>
  )
}

export default StudentRegister