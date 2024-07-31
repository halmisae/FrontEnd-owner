import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../scss/Login.css";
import api2 from "../api2";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Login = () => {
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
            })
            .catch(error => {
                toast.error(error.message);
            });
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedStore) {
            toast.warn("가게를 선택해주세요.");
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
