import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
    const [isOperational, setIsOperational] = useState(() => localStorage.getItem("isOperational") === "true");
    const [selectedStore, setSelectedStore] = useState(() => localStorage.getItem("selectedStore") || ""); // 초기값 설정

    const login = (storeNumber) => {
        setIsLoggedIn(true);
        setSelectedStore(storeNumber);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("selectedStore", storeNumber);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setSelectedStore(""); // 로그아웃 시 가게 정보 초기화
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("selectedStore");
    };

    const operationalIn = () => {
        setIsOperational(true);
        localStorage.setItem("isOperational", "true");
    };

    const operationalOut = () => {
        setIsOperational(false);
        localStorage.removeItem("isOperational");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, isOperational, operationalIn, operationalOut, selectedStore }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
