import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";


// const logoutUser = async () => {
//     setToast(true)
//     await logout()

//     setTimeout(() => {
//       setToast(false)
//       navigate('/')
//     }, 2500)
//   }

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) =>{
    const { user, loading } = useAuth()
    if (loading) return <div>Loading...</div>
    if (!user){
        toast.error('Logged out')
        return <Navigate to='/' replace />;
    } 

    if (allowedRoles && !allowedRoles.includes(user.role)){
        toast.error('Unauthorized access')
        const redirectPath = user.role === 'TEACHER' || user.role === 'ADMIN'
        ? "/Teacher/Dashboard" : "/Student/Dashboard"
        return <Navigate to={redirectPath} replace/>
    }

    return <Outlet/>
}