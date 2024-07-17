import React, {useState} from "react";
import StoreAccording from "./StoreAccording";
import icon1 from "../assets/store-setting-edit.png";
import icon2 from "../assets/storesale-edit.png"
import "../scss/UsageTimeDiscount.css"

const UsageTimeDiscount = () => {
    const [formData,setFormData] = useState({
        timeDiscount:0,
        unitTime:0,
        usageTime:0
    });
    const [isEdit, setEdit] = useState(false);
    const handEditToggle =()=> {
        setEdit((prevState)=>!prevState);
    }

    const handleInputChange = (e) => {
      const value = e.target.value;
      setFormData(value);
    }
    const renderUsageTimeOption =()=> {
        const options = [];
        for (let minute = 0; minute < 130; minute += 10){
            const minuteString = minute < 10 ? `0${minute}분` : `${minute}분`;
            options.push(
                <option key={minute} value={minuteString}>
                    {minuteString}
                </option>
            );
        }
        return options;
    }
    const renderUnitTimeOption =()=> {
        const options =[];
        for (let unit = 0; unit < 70; unit += 10){
            const unitString = unit < 10 ? `0${unit}분` : `${unit}`;
            options.push(
                <option key={unit} value={unitString}>
                    {unitString}
                </option>
            )
        }
        return options;
    }

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
              <form className={"discount-content"}>
                  <div className={"discount-content"}>
                      <label>기본 이용시간 설정</label>
                      <select
                          value={formData.usageTime}
                          onChange={handleInputChange}
                          disabled={!isEdit}
                      >
                          {renderUsageTimeOption()}
                      </select>
                  </div>
                  <div className={"discount-content"}>
                      <label>할인 시간 단위 설정</label>
                      <label>시간 단위 :
                          <span className={"span-space"}> </span>
                          <>
                              <select
                                  value={formData.unitTime}
                                  onChange={handleInputChange}
                                  disabled={!isEdit}
                              >
                                  {renderUnitTimeOption()}
                              </select>
                          </>
                      </label>
                      <label>단위 시간당 할인 금액 :
                          <span className={"span-space"}> </span>
                          <>
                              <input
                                  type={"number"}
                                  min={0}
                                  value={formData.timeDiscount}
                                  onChange={handleInputChange}
                                  disabled={!isEdit}
                              />
                          </>
                      </label>
                  </div>
                  <button className={"modal-button"} type={"button"} onClick={handEditToggle}>
                      {isEdit ? "설정하기" : "설정완료"}
                  </button>
              </form>
          </StoreAccording>
      </div>
  )
}

export default UsageTimeDiscount;