import React from "react";
import StoreAccording from "./StoreAccording";
import {useNavigate} from "react-router-dom";
import icon1 from "../assets/menu-edit.png";
import icon2 from "../assets/storesale-edit.png";
import icon3 from "../assets/storeinfo-edit.png";
import icon4 from "../assets/store-setting-edit.png";
import "../scss/StoreSetting.css"

const StoreSettings = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) =>{
    navigate(path);
  };

  return(
      <div className={"store-setting"}>
        <StoreAccording icon={<img src={icon4} alt={"가게설정"} className={"according-icon"}/>} title={"가게 설정"} isCollapsible={false} alwaysVisible={false}>
        </StoreAccording>
        <StoreAccording icon={<img src={icon3} alt={"정보수정"} className={"according-icon"}/>} title={"정보수정"} isCollapsible alwaysVisible={false}>
          <button className={"store-settings-item"} onClick={()=>handleNavigation("/store-info")}>가게 정보수정</button>
          <button className={"store-settings-item"} onClick={()=>handleNavigation("/withdraw")}>회원탈퇴</button>
        </StoreAccording>
        <StoreAccording icon={<img src={icon1} alt={"가게 메뉴관리"} className={"according-icon"}/>} title={"가게 메뉴관리"} isCollapsible alwaysVisible={false}>
          <button className={"store-settings-item"} onClick={()=>handleNavigation("/menu-list")}>메뉴 목록보기</button>
        </StoreAccording>
        <StoreAccording icon={<img src={icon2} alt={"할인 및 위약금관리"} className={"according-icon"}/>} title={"할인 및 위약금관리"} isCollapsible alwaysVisible={false}>
          <button className={"store-settings-item"} onClick={()=>handleNavigation("/reservation-discount")}>예약 할인설정</button>
          <button className={"store-settings-item"} onClick={()=>handleNavigation("/usage-time-discount")}>이용시간 할인설정</button>
          <button className={"store-settings-item"} onClick={()=>handleNavigation("/closing-discount")}>마감할인 상품등록 및 설정</button>
        </StoreAccording>
      </div>
  )
}

export default StoreSettings;