import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import React from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));


    const login = (token) => {
        localStorage.setItem("token", token);
        setLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        setLoggedIn(false);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const expiry = localStorage.getItem("tokenExpiry");

        if (!token || !expiry) {
            setLoggedIn(false);
            return;
        }

        const now = new Date().getTime();
        if (now > expiry) {
            logout();
        } else {
            setLoggedIn(true);
            const timeout = expiry - now;
            const timer = setTimeout(() => logout(), timeout);
            return () => clearTimeout(timer); // cleanup
        }
    }, []);


    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);