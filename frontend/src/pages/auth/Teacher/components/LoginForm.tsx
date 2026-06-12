import { Link, useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAuth } from '../../../../context/AuthContext'
import toast from 'react-hot-toast';


interface FormFields {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const LoginForm = () => {

    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormFields>({})
    const navigate = useNavigate()
    const { login, loading, logout } = useAuth()

    const onSubmit: SubmitHandler<FormFields> = async (formData) =>{
        try {
            const { email, password, rememberMe } = formData
            const res = await login({ email, password, rememberMe })
            console.log(res)
            if (res.user){
                if (res.user.role == 'TEACHER' || res.user.role === 'ADMIN'){
                    toast.success(`Welcome back ${res.user?.first_name} ${res.user?.last_name}`)
                    setTimeout(() => navigate('/Teacher/Dashboard'), 1500);
                }else{
                    await logout()
                    toast.error('You are not allowed here!')
                }
            }
        } catch (error: any) {
            toast.error('Invalid teacher email or password. Please try again.')
            if (error?.email) {
            setError("email", { type: "server", message: error.id[0] });
            }
            if (error?.password) {
            setError("password", { type: "server", message: error.password[0] });
            }
        }
    }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className='text-black w-60 md:w-110 h-75 text-start mt-5 flex flex-col space-y-3 md:space-y-5'>
        <div className='flex flex-col'>
            <label htmlFor="email" className='text-md md:text-2xl font-bold text-start'>Email Address</label>
            <input { ...register('email') } type="email" name='email' placeholder='example@gmail.com'
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

        <button type='submit' disabled={loading} className='bg-[#F37611] text-md md:text-xl h-10 py-2 rounded-lg text-white shadow-lg shadow-black/30'>Log in</button>
        <Link to="/" className='block md:hidden text-[#F37611] text-[12px] text-end md:text-sm'>Forgot your password?</Link>
    </form>
    </>
  )
}
