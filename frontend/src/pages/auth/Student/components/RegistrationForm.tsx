import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { registerUser } from '../../../../features/auth/api';
import { useSections } from '../../../../features/section/hooks';

type FormFields = {
    fname: string;
    lname: string
    email: string;
    password1: string;
    password2: string;
    section: string;
    tac: boolean
}

type Toast = {
    type: 'info' | 'success' | 'error' | 'warning' | null;
    message: string;
    duration?: number;
};

const RegistrationForm = () => {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({})
    const navigate = useNavigate()

    const { data } = useSections()
    const sections = data?.results

    const [toast, setToast] = useState<Toast | null>(null);
    
    const showToast = (type: Toast['type'], message: string, duration = 3000) => {
    setToast({ type, message, duration });

    setTimeout(() => {
        setToast(null);
    }, duration);
    }
    
    const onSubmit: SubmitHandler<FormFields> = async (formData) =>{
        try {
            const { fname, lname, email, password1, password2, section, tac } = formData
            const res = await registerUser({ fname, lname, email, password1, password2, section, tac })
            showToast('success', res.message)
            setTimeout(() => navigate(`/Auth/Student-Register/${res.user.id}?email=${encodeURIComponent(email)}`,{
                state: { email }
            }), 1500);
        } catch (error: any) {
            console.log(error)
            if (error?.email) {
            setError("email", { type: "server", message: error.email[0] });
            }

            if (error?.password1) {
            setError("password1", { type: "server", message: error.password1[0] });
            }

            if (error?.password2) {
            setError("password2", { type: "server", message: error.password2[0] });
            }

            if (error?.section) {
            setError("section", { type: "server", message: error.section[0] });
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

    <form onSubmit={handleSubmit(onSubmit)} className='text-black w-60 md:w-110 h-125 text-start mt-5 flex flex-col space-y-3 md:space-y-3'>
        <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col space-y-2'>
                <label htmlFor="first_name" className='text-md md:text-2xl font-bold text-start'>First Name</label>
                <input { ...register('fname') } required type="text" placeholder='First Name' className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]' />
            </div>

            <div className='flex flex-col space-y-2'>
                <label htmlFor="last_name" className='text-md md:text-2xl font-bold text-start'>Last Name</label>
                <input { ...register('lname') } required type="text" placeholder='Last Name' className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]' />
            </div>
        </div>

        <div className='flex flex-col'>
            <label htmlFor="section" className='text-md md:text-2xl font-bold text-start'>Section</label>
            <select { ...register('section') } className="select w-full border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]">
                <option selected>None</option>
                {sections?.map((section: any, index: any) =>(
                    <option key={index}>{section.name}</option>
                ))}
            </select>
            {errors.section && <div className="text-red-900">{errors.section.message}</div>}
        </div>

        <div className='flex flex-col'>
            <label htmlFor="email" className='text-md md:text-2xl font-bold text-start'>Email</label>
            <input { ...register('email') } type="email" placeholder='Email' className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]' />
            {errors.email && <div className="text-red-900">{errors.email.message}</div>}
        </div>

        <div className='flex flex-col'>
            <label htmlFor="password1" className='text-md md:text-2xl font-bold text-start'>Password</label>
            <input { ...register('password1') } type="password" placeholder='Password' className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]' />
            {errors.password1 && <div className="text-red-900">{errors.password1.message}</div>}
        </div>

        <div className='flex flex-col'>
            <label htmlFor="password2" className='text-md md:text-2xl font-bold text-start'>Confirm Password</label>
            <input { ...register('password2') } type="password" placeholder='Confirm Password' className='border-[#ACA6A7] p-2 border rounded-lg outline-0 placeholder-[#ACA6A7]' />
            {errors.password2 && <div className="text-red-900">{errors.password2.message}</div>}
        </div>

        <div className='flex items-center gap-1'>
            <input { ...register('tac') } required type="checkbox" className='checkbox checkbox-sm rounded-sm bg-white border-[#ACA6A7] border checked:text-[#F37611]' />
            <span className='text-[#ACA6A7] text-[10px] md:text-sm'>
                I agree to the <a href="/" className='text-[#F37611] font-semibold'>terms and condition</a>
            </span>
        </div>

        <button type='submit' className='bg-[#F37611] text-md md:text-xl h-10 p-1 rounded-lg text-white shadow-lg shadow-black/30'>Sign Up</button>
    </form>
    </>
  )
}

export default RegistrationForm