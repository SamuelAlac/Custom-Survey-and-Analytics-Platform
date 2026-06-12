import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className='w-full min-h-screen bg-[url(/auth_main_bg.svg)] flex items-center justify-center bg-cover'>
      <div className="w-362.5 h-166.25 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden flex">
        <main className="flex-1 bg-white p-10 flex items-center">
          <section className="w-full max-w-md mx-auto">
            <Outlet />
          </section>
        </main>

        <aside className="hidden lg:flex flex-1 bg-[url('/auth_bg.svg')] bg-cover bg-center">
        </aside>          
      </div>
    </div>
  )
}