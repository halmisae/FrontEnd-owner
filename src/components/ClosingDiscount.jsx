import React, {useState} from "react";
import StoreAccording from "./StoreAccording";
import icon1 from "../assets/store-setting-edit.png";
import icon2 from "../assets/storesale-edit.png";

const ClosingDiscount = () => {
  const [formData, setFormData] = useState({
    closingPrice : 0,
    quantity : 0,
    pickupTime : 0
  });
  const [isEdit, setEdit] = useState(false);
  const handleEditToggle =()=> {
    setEdit((prevState)=>!prevState);
  }
  const handleInputChange =(e)=> {
    const value = e.target.value;
    setFormData(value);
  }
  const renderClosingPrice =()=> {
    const options = [];
    for (let price = 5000; price < 11000; price += 1000){
      const priceString = `${price}원`;
      options.push(
          <option key={price} value={priceString}>
            {priceString}
          </option>
      )
    }
    return options;
  }
  const renderPickupTime =()=> {
    const options = [];
    for (let hour = 0; hour < 24; hour += 1){
      const hourString = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      options.push(
          <option key={hour} value={hourString}>
            {hourString}
          </option>
      )
    }
    return options;
  }
  return(
      <div className={"store-setting"}>
        <StoreAccording
          icon={<img src={icon1} alt={"가게설정"} className={"according-icon"}/> }
          title={"가게 설정"}
          isCollapsible={false}
          alwaysVisible={false}/>
        <StoreAccording
          icon={<img src={icon2} alt={"할인및위약금관리-마감할인설정"} className={"according-icon"}/>}
          title={"할인 및 위약금 관리 - 마감 할인 설정"}
          isCollapsible
          alwaysVisible
        >
          <form className={"discount-content"}>
            <div className={"discount-content"}>
              <label>마감할인 판매시간</label>
              <select
                value={formData.pickupTime}
                onChange={handleInputChange}
                disabled={!isEdit}
              >
                {renderPickupTime()}
              </select>
            </div>
            <div className={"discount-content"}>
              <label>마감할인 상품 판매 금액</label>
              <label>판매 금액 :
                <span className={"span-space"}> </span>
                <>
                  <select
                    value={formData.closingPrice}
                    onChange={handleInputChange}
                    disabled={!isEdit}
                  >
                    {renderClosingPrice()}
                  </select>
                </>
              </label>
              <label>판매 수량 :
                <span className={"span-space"}> </span>
                <>
                  <input
                      type={"number"}
                      min={1}
                      value={formData.quantity}
                      onChange={handleInputChange}
                      disabled={!isEdit}
                  />
                </>
              </label>
            </div>
            <button className={"modal-button"} type={"button"} onClick={handleEditToggle}>
              {isEdit ? "설정하기" : "설정완료"}
            </button>
          </form>
        </StoreAccording>
      </div>
  )
}

export default ClosingDiscount;