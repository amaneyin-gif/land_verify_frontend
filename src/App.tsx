import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import VerifyVillage from "./pages/VerifyVillage";
import VerifyVillageLayout from "./pages/verifyVillage3";
import NotFound from "./pages/NotFound";
import UserManagement from "./pages/UserManagement";
import Unauthorized from "./pages/UnAuthorised";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<NotFound 
            header="Access Denied"   
            content="You don't have permission to access this page. Please contact your administrator if you believe this is an error." 
             fontSize="clamp(5rem, 15vmin, 20rem)"/>} />
            <Route
              path="/home"
              element={
                <ProtectedRoute  >
                  <Dashboard />
                 </ProtectedRoute>
              }
            />
            <Route
              path="/verify"
              element={
                <ProtectedRoute  >
                  {/* <VerifyVillage /> */}
                  <VerifyVillageLayout/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-management"
              element={
                  <ProtectedRoute >
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound header="Not Found" 
            content="The page you're looking for does not exist."
            fontSize="clamp(5rem, 22vmin, 20rem)"/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;



// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import { AuthProvider } from "./contexts/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import VerifyVillage from "./pages/VerifyVillage";
// import UserManagement from "./pages/UserManagement";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <AuthProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>
//             {/* Redirect root */}
//             <Route path="/" element={<Navigate to="/login" replace />} />

//             {/* Public */}
//             <Route path="/login" element={<Login />} />

//             {/* Unauthorized */}
//             <Route
//               path="/unauthorized"
//               element={
//                 <NotFound
//                   header="Access Denied"
//                   content="You don't have permission to access this page. Please contact your administrator if you believe this is an error."
//                   fontSize="clamp(5rem, 15vmin, 20rem)"
//                 />
//               }
//             />

//             {/* Protected */}
//             <Route
//               path="/home"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/verify"
//               element={
//                 <ProtectedRoute>
//                   <VerifyVillage />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/user-management"
//               element={
//                 <ProtectedRoute>
//                   <UserManagement />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Catch‑all */}
//             <Route
//               path="*"
//               element={
//                 <NotFound
//                   header="Not Found"
//                   content="The page you're looking for does not exist."
//                   fontSize="clamp(5rem, 22vmin, 20rem)"
//                 />
//               }
//             />
//           </Routes>
//         </BrowserRouter>
//       </AuthProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
