import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) =>{
    const { user, loading } = useAuth()
    if (loading) return <div>Loading...</div>
    if (!user) return <Navigate to='/' replace />;

    if (allowedRoles && !allowedRoles.includes(user.role)){
        // return user.role === 'TEACHER' || user.role === 'ADMIN'
        // ? <Navigate to="/Teacher/Dashboard" replace />
        // : <Navigate to="/Student/Dashboard" replace />;
        return <Navigate to={'/'} replace/>
    }

    return <Outlet/>
}