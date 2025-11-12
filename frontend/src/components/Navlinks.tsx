import { NavLink, useLocation } from "react-router-dom"

export const StudentNav = ({ nav }: { nav: any }) => {
    const { pathname } = useLocation()
    
  return (
    <NavLink to={nav.location} className={({ isActive }) => `nav-link group flex justify-center h-20 pt-2
    ${isActive ? 'nav-link-active' : 'hover:bg-white/30'}`}>
        <figure className='flex flex-col items-center gap-2 text-center'>
            <div className='flex flex-col items-center'>
                <img src={pathname === nav.navPath ? nav.navSelectedIcon : nav.navIcon} alt={nav.name} className="w-10"/>
                <p className="font-bold text-[10px] md:text-[12px]">{nav.name}</p>
            </div>
        </figure>
    </NavLink>
  )
}

export const TeacherNav = ({ nav }: { nav: any }) => {
    const { pathname } = useLocation()
    
  return (
    <NavLink to={nav.location} className={({ isActive }) => `nav-link group flex justify-center h-20 pt-2
    ${isActive ? 'nav-link-active' : 'hover:bg-white/30'}`}>
        <figure className='flex flex-col items-center gap-2 text-center'>
            <div className='flex flex-col items-center'>
                <img src={pathname === nav.navPath ? nav.navSelectedIcon : nav.navIcon} alt={nav.name} className="w-10"/>
                <p className="font-bold text-[10px] md:text-[12px]">{nav.name}</p>
            </div>
        </figure>
    </NavLink>
  )
}
