import React, { useState, useEffect } from "react";
import "../scss/TopBar.css";
import {useAuth} from "../AuthContext";
import logo from "../assets/Logo.png"

const TopBar = () => {
    const {isLoggedIn, isOperational} =useAuth();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formDateTime = (date) => {
        return date.toLocaleString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
    };

    return (
        <div className="top-bar">
            <div className="top-bar-content">
                <span className="site-name"><img className={"top-bar-logo"} src={logo} alt={"할미새"}/>할미새</span>
                <span className={`status-indicator ${isOperational ? 'open' : 'closed'}`}>
                    {isOperational ? '영업중' : '준비중'}
                </span>
                <span className={`login-status ${isLoggedIn ? "logged-in" : "logged-out"}`}>
                    {isLoggedIn ? "로그인중" : "로그아웃중"}
                </span>
                <span className="date-time">{formDateTime(currentTime)}</span>
            </div>
        </div>
    );
}

export default TopBar;
