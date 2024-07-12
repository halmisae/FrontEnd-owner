import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import Modal from "./Modal";

const WithDraw =()=> {
  const [isOpen,setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleConfirm =()=>{
    console.log("Account deleted");
  };

  const handleClose =()=>{
    setIsOpen(false);
    navigate(-1);
  };
  return(
      <div>
        <Modal isOpen={isOpen} onClose={handleClose}>
          <h2>회원탈퇴 확인</h2>
          <p>정말 할미새 회원을 탈퇴하시겠습니까?</p>
          <p>탈퇴시 개인정보는 즉시 파기되며, 주문 내역 및 예약 내역 데이터는 5년 동안 보관됩니다.</p>
          <p>이후 언제든지 다시 재가입 하실 수 있습니다.</p>
          <div className={"modal-buttons"}>
            <button className={"modal-button"} onClick={handleConfirm}>확인</button>
            <button className={"modal-button"} onClick={handleClose}>취소</button>
          </div>
        </Modal>
      </div>
  )
}

export default WithDraw;