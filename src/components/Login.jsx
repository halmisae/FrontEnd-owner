import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../scss/Login.css";
import api2 from "../api2";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");
    const { login } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";
    const navigate = useNavigate();

    useEffect(() => {
        api2.get('/main')
            .then(response => {
                setStores(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching stores:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedStore) {
            alert("가게를 선택해주세요.");
            return;
        }
        login(selectedStore);
        navigate(from, { replace: true });
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
                    <label className="login-label">
                        가 게 :
                        <select
                            className="login-input"
                            value={selectedStore}
                            onChange={(e) => setSelectedStore(e.target.value)}
                        >
                            <option value="">가게를 선택하세요</option>
                            {stores.map(store => (
                                <option key={store.storeNumber} value={store.storeNumber}>
                                    {store.storeName}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button className="login-button" type="submit">로그인하기</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
