import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import "../scss/Login.css";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const { login } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        login();
        navigate(from, {replace : true});
    };

    return (
        <div className="login-container">
            <div className="login-window">
                <h1>로그인</h1>
                <form onSubmit={handleSubmit}>
                    <label className="login-label">
                        아 이 디 :
                        <input
                            className="login-input"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </label>
                    <label className="login-label">
                        비 밀 번 호 :
                        <input
                            className="login-input"
                            type="password"
                            value={passWord}
                            onChange={(e) => setPassWord(e.target.value)}
                        />
                    </label>
                    <button className="login-button" type="submit">로그인하기</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
