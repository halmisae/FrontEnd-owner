import React, {useState} from "react";
import {useAuth} from "../AuthContext";
import {useNavigate} from "react-router-dom";
import "../scss/Login.css";

const Login = () => {
    const [userName,setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault();
        login();
        navigate("/home");
    };

    return (
        <div className={"login-container"}>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    사용자 이름 :
                    <input
                        type={"text"}
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}
                    />
                </label>
                <label>
                    비밀번호 :
                    <input
                        type={"password"}
                        value={passWord}
                        onChange={(e)=> setPassWord(e.target.value)}
                    />
                </label>
                <button type={"submit"}>로그인하기</button>
            </form>
        </div>
    )
}

export default Login;