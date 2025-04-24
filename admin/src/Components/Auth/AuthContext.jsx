// import { createContext, useContext, useState, useEffect } from "react";
// import {jwtDecode} from "jwt-decode"; // Make sure jwt-decode is correctly imported

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userType = localStorage.getItem("userType");
  
//     if (token && userType) {
//       // You can check if token is expired here
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000;
//       if (decodedToken.exp < currentTime) {
//         // Token expired, logout
//         logout();
//       } else {
//         setUser({ token, userType });
//       }
//     } else {
//       setUser(null);
//     }
//   }, []);
  
  

//   console.log(user, "userType"); // Debug: Check if userType is correctly stored

//   const login = (token, userType) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("userType", userType);
//     setUser({ token, userType });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userType");
//     localStorage.removeItem("user_id");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userType = localStorage.getItem("userType");

        if (token && userType) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    logout();
                } else {
                    setUser({ token, userType });
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                logout();
            }
        }

        setLoading(false);
    }, []);

    const login = (token, userType) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userType", userType);
        setUser({ token, userType });
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    if (loading) {
        return <div>Loading...</div>; // or some other loading indicator
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);