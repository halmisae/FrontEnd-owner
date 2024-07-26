import React from 'react';
import "../scss/LoadingScreen.css";
import logo from "../assets/Logo.png"

const LoadingPage = () => {
    return (
        <div className="loading-page">
            <div className="spinner">
                <img className={"logo"} src={logo} alt={"할미새"}/>
            </div>
        </div>
    );
};

export default LoadingPage;
