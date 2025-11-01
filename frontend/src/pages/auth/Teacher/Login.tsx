import { Link } from 'react-router-dom'

const TeacherLogin = () => {
  return (
    <section className='flex flex-col justify-center items-center bg-white'>
        <Link to="/" className='hidden md:block text-[#F37611] text-start w-60 md:w-110'>Back to u</Link>
        <div className='md:w-130 md:h-120 flex flex-col justify-center items-center'>
            <h2 className='text-black text-xl md:text-4xl font-bold'>Welcome Back</h2>
            <div className='w-50 md:w-90 text-center mt-2'>
                <p className='text-[#ACA6A7] text-sm md:text-md'>Enter your email and password to access your account.</p>
            </div>

            <form className='text-black w-60 md:w-110 h-75 text-start mt-5 flex flex-col space-y-3 md:space-y-5'>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='text-md md:text-2xl font-bold text-start'>Email</label>
                    <input type="email" name='email' placeholder='Email'
                    className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]'/>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="password" className='text-md md:text-2xl font-bold text-start'>Password</label>
                    <input type="password" name='password' placeholder='Password'
                    className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]'/>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        <input type="checkbox" name="remember_me" className='checkbox checkbox-sm rounded-sm
                        bg-white border-[#ACA6A7] border checked:text-[#F37611]'/>
                        <span className='text-[#ACA6A7] text-[10px] md:text-sm'>Remember me</span>
                    </div>
                    <Link to="/" className='hidden md:block text-[#F37611] text-sm'>Forgot your password?</Link>
                </div>

                <button type='submit' className='bg-[#F37611] text-md md:text-xl h-10 rounded-lg text-white shadow-lg shadow-black/30'>Log in</button>
                <Link to="/" className='block md:hidden text-[#F37611] text-[12px] text-end md:text-sm'>Forgot your password?</Link>
            </form>
            <Link to="/" className='md:hidden text-[#F37611] text-center text-sm'>Back to ewan</Link>
        </div>
    </section>
  )
}

export default TeacherLogin