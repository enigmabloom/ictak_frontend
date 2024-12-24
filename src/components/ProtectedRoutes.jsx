import { Navigate, Outlet, useLocation } from "react-router-dom";


const ProtectedRoutes = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");
    const location = useLocation();

    if(!token) {
        return <Navigate to="/login" />;
    }
    
    if (user?.selectedProject && location.pathname === '/student-dashboard') {
        return <Navigate to="/project-dashboard" />;
    }

    return <Outlet />;
}

export default ProtectedRoutes