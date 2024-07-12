import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import icon1 from "./assets/power.png";
import icon2 from "./assets/processing.png";
import icon3 from "./assets/reservationstatus.png";
import icon4 from "./assets/sales-inquiry.png";
import icon5 from "./assets/store-setting.png";
import Modal from "./components/Modal";
import "./Sidebar.css"

const Sidebar = ({status, toggleStatus}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggle =()=>{
        setIsModalOpen(true);
    };

    const handleCloseModal =()=>{
        setIsModalOpen(false);
    }

    const handleConfirmAction =()=>{
        toggleStatus();
        setIsModalOpen(false);
        if (status === '영업중'){
            navigate("/");
        } else {
            navigate("/processing");
        }
    };
  return(
      <div className={"sidebar"}>
          <div className={"sidebar-content"}>
          <Link to={"/processing"}><img src={icon2} alt={"처리중"}/><span>처리중</span></Link>
          <Link to={"/reservation-status"}><img src={icon3} alt={"예약현황"}/><span>예약현황</span></Link>
          <Link to={"/sales-inquiry"}><img src={icon4} alt={"매출조회"}/><span>매출조회</span></Link>
          <Link to={"/store-setting"}><img src={icon5} alt={"가게설정"}/><span>가게설정</span></Link>
          <button onClick={handleToggle} className={"toggle-button"}>
              <img src={icon1} alt={status === "영업중" ? "영업종료" : "영업시작"}/>
              <span>{status === '영업중' ? '영업종료' : '영업시작'}</span>
          </button>
          </div>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <p className={"status-check"}>{status === '영업중' ? '영업을 종료하시겠습니까?' : '영업을 시작하시겠습니까?'}</p>
              <p className={"status-index"}>{status === '영업중' ? '처리중인 예악이 남아있을 경우 전부 취소처리 됩니다' : ''}</p>
              <button onClick={handleConfirmAction}>
                  {status === '영업중' ? '영업종료하기' : '영업시작하기'}
              </button>
          </Modal>
      </div>
  )
}

export default Sidebar;