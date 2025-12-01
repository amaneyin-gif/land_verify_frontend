// import { Navigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';

// const ProtectedRoute = ({ children  }) => {
//   const { isAuthenticated } = useAuth();
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
// // console.log(children,"___protected page")
//   return <>{children}</>;
// };

// export default ProtectedRoute;


import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from '../components/ui/loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, accessibleRoutes, loadingRoutes } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  // Still loading assigned routes → show loader
  if (loadingRoutes) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Allow home always
  if (path === "/home") return children;
  // BLOCK if current page is not in allowed list
  if (!accessibleRoutes.includes(path)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
