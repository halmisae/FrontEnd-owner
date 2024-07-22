import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
    const [isOperational, setIsOperational] = useState(() => localStorage.getItem("isOperational") === "true");

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
    };

    const operationalIn = () => {
        setIsOperational(true);
        localStorage.setItem("isOperational","true");
    };

    const operationalOut =()=> {
        setIsOperational(false);
        localStorage.removeItem("isOperational");
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, isOperational, operationalIn, operationalOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
