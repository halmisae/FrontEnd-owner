import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReservationContext } from "./ReservationContext"; // 추가된 부분
import icon1 from "./assets/power.png";
import icon2 from "./assets/processing.png";
import icon3 from "./assets/reservationstatus.png";
import icon4 from "./assets/sales-inquiry.png";
import icon5 from "./assets/store-setting.png";
import Modal from "./components/Modal";
import "./Sidebar.css";
import { useAuth } from "./AuthContext";

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, logout, isOperational, operationalIn, operationalOut } = useAuth();
    const { newReservationsCount } = useContext(ReservationContext); // 컨텍스트에서 예약 수 가져오기

    const handleToggle = () => {
        if (!isLoggedIn) {
            alert("로그인을 먼저 해야합니다.");
            return;
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmAction = () => {
        if (isOperational) {
            operationalOut();
            logout();
            navigate("/");
            alert("영업을 종료했습니다.");
        } else {
            operationalIn();
            navigate("/processing");
            alert("영업을 시작했습니다.");
        }
        setIsModalOpen(false);
    };

    const handleProtectedLinkClick = (event, path) => {
        if (!isLoggedIn) {
            event.preventDefault();
            alert("로그인을 먼저 해야합니다.");
            return;
        }
        if (!isOperational) {
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
                    <div className={`icon-container ${newReservationsCount > 0 ? 'shake' : ''}`}>
                        <img src={icon2} alt={"처리중"} />
                        {newReservationsCount > 0 && (
                            <span className="notification-badge">
                                {newReservationsCount}
                            </span>
                        )}
                    </div>
                    <span>처리중</span>
                </Link>
                <Link to={"/reservation-status"} onClick={(e) => handleProtectedLinkClick(e, "/reservation-status")}>
                    <img src={icon3} alt={"예약현황"} /><span>예약현황</span>
                </Link>
                <Link to={"/sales"} onClick={(e) => handleProtectedLinkClick(e, "/sales")}>
                    <img src={icon4} alt={"매출조회"} /><span>매출조회</span>
                </Link>
                <Link to={"/store-setting"} onClick={(e) => handleProtectedLinkClick(e, "/store-setting")}>
                    <img src={icon5} alt={"가게설정"} /><span>가게설정</span>
                </Link>
                <button onClick={handleToggle} className={"toggle-button"}>
                    <img src={icon1} alt={!isOperational ? "영업종료" : "영업시작"} />
                    <span>{isOperational ? '영업종료' : '영업시작'}</span>
                </button>
            </div>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <p className={"status-check"}>
                        {isOperational ? '영업을 종료하시겠습니까?' : '영업을 시작하시겠습니까?'}
                    </p>
                    <p className={"status-index"}>
                        {isOperational ? '처리중인 예악이 남아있을 경우 전부 취소처리 됩니다' : ''}
                    </p>
                    <div className={"modal-buttons"}>
                        <button className={"modal-button"} onClick={handleConfirmAction}>
                            {isOperational ? '영업종료하기' : '영업시작하기'}
                        </button>
                        <button className={"modal-button"} onClick={handleCloseModal}>취소</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Sidebar;
