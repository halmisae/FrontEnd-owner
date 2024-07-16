import React from "react";
import StoreAccording from "./StoreAccording";
import icon1 from "../assets/store-setting-edit.png";
import icon2 from "../assets/storesale-edit.png"

const UsageTimeDiscount = () => {
  return(
      <div className={"store-setting"}>
        <StoreAccording
            icon={<img src={icon1} alt={"가게설정"} className={"according-icon"}/>}
            title={"가게 설정"}
            isCollapsible={false}
            alwaysVisible={false}/>
          <StoreAccording
              icon={<img src={icon2} alt={"할인및위약금관리-이용시간할인설정"} className={"according-icon"}/>}
              title={"할인 및 위약금 관리 - 이용시간 할인 설정"}
              isCollapsible
              alwaysVisible
          >
              <form className={"according-content"}>
                  <div>
                      <label>기본 이용시간 설정</label>
                      <input
                          className={"input-box"}
                          type={}
                      />
                  </div>
              </form>
          </StoreAccording>
      </div>
  )
}

export default UsageTimeDiscount;