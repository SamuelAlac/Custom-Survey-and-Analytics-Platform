import { Link, Outlet } from 'react-router-dom'

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

export const StudentLayout = () => {
  return (
    <div className='w-full min-h-screen flex'>
        <aside className='bg-[#FBA02C] fixed h-screen w-25 md:w-24 flex flex-col justify-center text-white'>
            <div className='flex flex-1 justify-center items-center border-b-2 border-b-white'>
              <div className='flex mx-3 gap-2'>
                  <img src='/app_icon.svg' className='w-15' alt="app icon"/>
              </div>
          </div>
          
          <div className='flex-4 mt-2.5 border-b-2 border-b-white'>
            <div className='group flex justify-center h-20 pt-2 hover:bg-white'>
                <figure className='flex flex-col items-center gap-2 text-center'>
                    <img src='/user_icon.svg' className='w-10' alt="User Profile Icon"/>
                    <Link to="/" className='font-bold text-[10px] md:text-[12px]'>
                    Profile
                    </Link>
                </figure>
            </div>

            <div className="group flex justify-center h-20 pt-2 hover:bg-white">
                <figure className='flex flex-col items-center gap-2 text-center'>
                    <Link to='Dashboard'>
                        <img src='/dashboard_nav_icon.svg' alt="Dashboard Icon"/>
                    </Link>
                    <Link to='Dashboard' className="font-bold text-[10px] md:text-[12px]">
                    Dashboard
                    </Link>
                </figure>
            </div>

            <div className="group flex justify-center h-20 pt-2 hover:bg-white">
                <figure className='flex flex-col items-center gap-2 text-center'>
                    <Link to='MyResponses'>
                        <img src='/responses_nav_icon.svg' alt="My Responses Icon"/>
                    </Link>
                    <Link to='MyResponses' className="font-bold text-[10px] md:text-[12px]">
                    My Responses
                    </Link>
                </figure>
            </div>
          </div>

          <div>
            <div className='flex items-center justify-center h-20 space-x-2.5 space-y-1'>
              <Link to='/'>
                  <img src='/logout_icon.svg' alt="Dashboard Icon"/>
              </Link>
            </div>
          </div>
        </aside>

        <main className='bg-[#F0F6FF] flex-1 [&_section]:w-full [&_section]:min-h-screen [&_section]:p-7 ms-20 md:ms-24'>
            <ScrollToTop/>
            <Outlet/>
        </main>
    </div>
  )
}