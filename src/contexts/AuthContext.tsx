// import { createContext, useContext, useState, useEffect } from 'react';

let REACT_APP_BACKEND = 'https://x9k84zq3-3002.inc1.devtunnels.ms/api'
// let REACT_APP_BACKEND2 = 'https://79dkd582-3002.inc1.devtunnels.ms/api'

// const AuthContext = createContext(undefined);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [accessibleRoutes, setAccessibleRoutes] = useState([]);

//   useEffect(() => {
//     // Check if user is already logged in
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);


//   // const login = async (userid, password) => {
//   //   // TODO: Replace with actual API call
//   //   // This is a mock implementation
//   //   try {
//   //     // Simulate API call
//   //     console.log(REACT_APP_BACKEND,"__react backend")
//   //     const response = await fetch(`${REACT_APP_BACKEND}/login`, {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ userid, password }),
//   //     }).catch(() => {
//   //       // Mock response for development
//   //       return {
//   //         ok: true,
//   //         json: async () => ({ userid, name: 'Admin User' }),
//   //       };
//   //     });

//   //     if (response.ok) {
//   //       console.log("response ok",response)
//   //       const userData = await response.json();
//   //       const user = { userid: userData.userid, name: userData.name };
//   //       setUser(user);
//   //       localStorage.setItem('user', JSON.stringify(user));
//   //       return {
//   //         status: true,
//   //         data: userData};
//   //     }
//   //     return false;
//   //   } catch (error) {
//   //     console.error('Login error:', error);
//   //     return false;
//   //   }
//   // };

//   const login = async (userid, password) => {
//     try {
//       const response = await fetch(`${REACT_APP_BACKEND}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userid, password }),
//       });

//       // If backend sends error status (400, 404, 401 etc.)
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);

//         return {
//           status: false,
//           message: errorData?.message || "Something went wrong. Please try again.",
//         };
//       }

//       // Success login
//       const userData = await response.json();
//       const user = { userid: userData.user.userid, name: userData.user.name, token: userData.token };
//       setUser(user);
//       localStorage.setItem("user", JSON.stringify(user));

//       return {
//         status: true,
//         data: userData,
//       };

//     } catch (error) {
//       console.error("Login error:", error);
//       return {
//         status: false,
//         message: "Network error. Please try again.",
//       };
//     }
//   };


//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
// -------------------------------------- Revised Code --------------------------------------
// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext(undefined);

// export const AuthProvider = ({ children }) => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const [user, setUser] = useState(storedUser || null);
//   const [accessibleRoutes, setAccessibleRoutes] = useState([]);
//   const [loadingRoutes, setLoadingRoutes] = useState(true);

//   const login = async (userid, password) => {
//     try {
//       const response = await fetch(`${REACT_APP_BACKEND}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userid, password }),
//       });

//       // If backend sends error status (400, 404, 401 etc.)
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);

//         return {
//           status: false,
//           message: errorData?.message || "Something went wrong. Please try again.",
//         };
//       }

//       // Success login
//       const userData = await response.json();
//       const user = { userid: userData.user.userid, name: userData.user.name, token: userData.token };
//       setUser(user);
//       localStorage.setItem("user", JSON.stringify(user));

//       return {
//         status: true,
//         data: userData,
//       };

//     } catch (error) {
//       console.error("Login error:", error);
//       return {
//         status: false,
//         message: "Network error. Please try again.",
//       };
//     }
//   };

//   // Fetch routes on refresh
//   useEffect(() => {
//     const fetchRoutes = async () => {
//       if (!storedUser) {
//         setLoadingRoutes(false);
//         return;
//       }

//       try {
//         const res = await fetch(`${REACT_APP_BACKEND}/user/accessible-routes`, {
//           headers: {
//             Authorization: `Bearer ${storedUser.token}`
//           }
//         });

//         if (!res.ok) {
//           setAccessibleRoutes([]);
//         } else {
//           const data = await res.json();
//           setAccessibleRoutes(Array.isArray(data.data) ? data.data : []);
//         }
//       } catch (err) {
//         console.error("Route fetch error", err);
//       }

//       setLoadingRoutes(false);
//     };

//     fetchRoutes();
//   }, [user]);

//   const logout = () => {
//     setUser(null);
//     setAccessibleRoutes([]);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         accessibleRoutes,
//         loadingRoutes,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

//  === downward refresh not workin --

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser || null);
  const [accessibleRoutes, setAccessibleRoutes] = useState([]);
  const [loadingRoutes, setLoadingRoutes] = useState(true);
console.log(accessibleRoutes,"__accessibleRoutes")
console.log(user,"__user from authProvider")
  const login = async (userid, password) => {
    try {
      const response = await fetch(`${REACT_APP_BACKEND}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid, password }),
      });

      // If backend sends error status (400, 404, 401 etc.)
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        return {
          status: false,
          message: errorData?.message || "Something went wrong. Please try again.",
        };
      }

      // Success login
      const userData = await response.json();
      const user = { userid: userData.user.userid, name: userData.user.name, token: userData.token };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      return {
        status: true,
        data: userData,
      };

    } catch (error) {
      console.error("Login error:", error);
      return {
        status: false,
        message: "Network error. Please try again.",
      };
    }
  };
  /** -------------------------
   * FETCH ACCESSIBLE ROUTES ON:
   * - refresh
   * - or when user logs in
   * -------------------------- */
  useEffect(() => {
    const fetchRoutes = async () => {
      if (!user) {
        setLoadingRoutes(false);
        return;
      }
      console.log(storedUser,"--storedUser")

      try {
        const res = await fetch(`${REACT_APP_BACKEND}/user/accessible-routes`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log(res,"___route response1234")
        if (!res.ok) {
          setAccessibleRoutes([]);
        } else {
          const data = await res.json();
          // backend should return array of routes
          setAccessibleRoutes(Array.isArray(data.data) ? data.data : []);
        }
      } catch (err) {
        console.error("Route fetch error", err);
      }

      setLoadingRoutes(false);
    };

    fetchRoutes();
  }, [user]); // re-fetch after login

  /** LOGOUT */
  const logout = () => {
    setUser(null);
    setAccessibleRoutes([]);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        accessibleRoutes,
        loadingRoutes,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
