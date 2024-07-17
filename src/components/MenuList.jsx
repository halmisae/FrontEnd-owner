import React from "react";
import StoreAccording from "./StoreAccording";
import icon1 from "../assets/store-setting-edit.png";
import icon2 from "../assets/menu-edit.png";

const MenuList = () => {
  return(
      <div className={"store-setting"}>
        <StoreAccording
          icon={<img src={icon1} alt={"가게설정"} className={"according-icon"}/>}
          title={"가게 설정"}
          isCollapsible={false}
          alwaysVisible={false}
        />
        <StoreAccording
          icon={<img src={icon2} alt={"메뉴관리"} className={"according-icon"}/>}
          title={"메뉴 관리"}
          isCollapsible
          alwaysVisible
        >

        </StoreAccording>
      </div>
  )
}

export default MenuList;