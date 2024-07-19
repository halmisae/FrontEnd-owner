import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon1 from "./assets/power.png";
import icon2 from "./assets/processing.png";
import icon3 from "./assets/reservationstatus.png";
import icon4 from "./assets/sales-inquiry.png";
import icon5 from "./assets/store-setting.png";
import Modal from "./components/Modal";
import "./Sidebar.css"
import {useAuth} from "./AuthContext";

const Sidebar = ({ status, toggleStatus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const {isLoggedIn, logout} =useAuth();

    const handleToggle = () => {
        if(!isLoggedIn){
            alert("로그인을 먼저 해야합니다.");
            return;
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmAction = () => {
        toggleStatus();
        setIsModalOpen(false);
        if (status === '영업중') {
            logout();
            navigate("/");
        } else {
            navigate("/processing");
        }
    };

    const handleProtectedLinkClick = (event, path) => {
        if (!isLoggedIn) {
            event.preventDefault();
            alert("로그인을 먼저 해야합니다.");
            return;
        }
        if (status !== '영업중') {
            event.preventDefault();
            alert("영업중이 아닙니다. 해당 페이지를 확인할 수 없습니다.");
        } else {
            navigate(path);
        }
    };

    return (
        <div className={"sidebar"}>
            <div className={"sidebar-content"}>
                <Link to={"/processing"} onClick={(e) => handleProtectedLinkClick(e, "/processing")}>
                    <img src={icon2} alt={"처리중"} /><span>처리중</span>
                </Link>
                <Link to={"/reservation-status"} onClick={(e) => handleProtectedLinkClick(e,"/reservation-status")}>
                    <img src={icon3} alt={"예약현황"} /><span>예약현황</span>
                </Link>
                <Link to={"/sales-inquiry"} onClick={(e)=> handleProtectedLinkClick(e,"/sales-inquiry")}>
                    <img src={icon4} alt={"매출조회"} /><span>매출조회</span>
                </Link>
                <Link to={"/store-setting"} onClick={(e) => handleProtectedLinkClick(e,"/store-setting")}>
                    <img src={icon5} alt={"가게설정"} /><span>가게설정</span>
                </Link>
                <button onClick={handleToggle} className={"toggle-button"}>
                    <img src={icon1} alt={status === "영업중" ? "영업종료" : "영업시작"} />
                    <span>{status === '영업중' ? '영업종료' : '영업시작'}</span>
                </button>
            </div>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <p className={"status-check"}>{status === '영업중' ? '영업을 종료하시겠습니까?' : '영업을 시작하시겠습니까?'}</p>
                    <p className={"status-index"}>{status === '영업중' ? '처리중인 예악이 남아있을 경우 전부 취소처리 됩니다' : ''}</p>
                    <div className={"modal-buttons"}>
                        <button className={"modal-button"} onClick={handleConfirmAction}>
                            {status === '영업중' ? '영업종료하기' : '영업시작하기'}
                        </button>
                        <button className={"modal-button"} onClick={handleCloseModal}>취소</button>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default Sidebar;
