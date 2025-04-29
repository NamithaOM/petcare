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
                    // Add any fields you want to keep from decodedToken or localStorage
                    const user_id = localStorage.getItem("user_id");
                    setUser({ token, userType, user_id, ...decodedToken });
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                logout();
            }
        }
    
        setLoading(false);
    }, []);
    

    const login = (token, userType, user_id) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userType", userType);
        localStorage.setItem("user_id", user_id);
        const decodedToken = jwtDecode(token);
        setUser({ token, userType, user_id, ...decodedToken });
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