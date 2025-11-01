import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className='w-full min-h-screen flex flex-row-reverse'>
        <aside className='hidden bg-[#FBA02C] lg:flex flex-1 justify-center items-center'>
            <img src='/portal_bg.svg' alt="" className='w-90'/>
        </aside>
        
        <main className='bg-[#F0F6FF] flex-1 [&_section]:w-full [&_section]:min-h-screen [&_section]:p-7'>
            <Outlet/>
        </main>
    </div>
  )
}
