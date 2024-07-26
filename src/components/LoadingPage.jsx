import React from 'react';
import "../scss/LoadingScreen.css";
import logo from "../assets/Logo.png"

const LoadingPage = () => {
    return (
        <div className="loading-page">
            <div className="spinner"></div>
            <img className={"logo"} src={logo} alt={"할미새"}/>
        </div>
    );
};

export default LoadingPage;
