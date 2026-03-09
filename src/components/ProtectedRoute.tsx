
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { Loader } from '../components/ui/loader';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, accessibleRoutes, loadingRoutes } = useAuth();
//   const location = useLocation();
//   const path = location.pathname;

//   // Still loading assigned routes → show loader
//   if (loadingRoutes) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader />
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // Allow home always
//   if (path === "/home") return children;
//   // BLOCK if current page is not in allowed list
//   if (!accessibleRoutes.includes(path)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "../components/ui/loader";

/** Page Name → Route mapping */
const PAGE_ROUTE_MAP = {
  "Home": "/home",
  "Verify Village": "/verify",
  "User Management": "/user-management",
  "User Creation": "/user-management",
  "Role Creation": "/user-management",
  "Village Assignment": "/user-management",
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, accessibleRoutes, loadingRoutes } = useAuth();
  console.log("Accessible Routes:", accessibleRoutes);
  const location = useLocation();
  const path = location.pathname;

  // ⏳ Loading permissions
  if (loadingRoutes) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  // 🔐 Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🧠 Build allowed paths from backend response
  const allowedPaths = accessibleRoutes.flatMap((route) => {
    const parentPath = PAGE_ROUTE_MAP[route.name];
    const childPaths = route.children.map(
      (child) => PAGE_ROUTE_MAP[child]
    );
    return [parentPath, ...childPaths].filter(Boolean);
  });

  // 🚫 Unauthorized
  if (!allowedPaths.includes(path)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
