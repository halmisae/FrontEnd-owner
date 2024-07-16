import React, { useState } from "react";
import StoreAccording from "./StoreAccording";
import icon1 from "../assets/storesale-edit.png";
import icon2 from "../assets/store-setting-edit.png";

const ReservationDiscount = () => {
  const [discount, setDiscount] = useState(1000);
  const [error, setError] =useState("");

  const handleInputChange =(e)=>{
    const value = e.target.value;
    setDiscount(value);
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!String(discount).endsWith("000")){
      setError("할인 금액의 끝 3자리 수는 000으로 끝나야 합니다.");
      return;
    }

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discount }),
      });
      if (response.ok) {
        alert("할인 금액이 성공적으로 설정되었습니다.");
      } else {
        alert("할인 금액 설정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting discount:", error);
      alert("할인 금액 설정 중 오류가 발생했습니다.");
    }
  };

  return (
      <div className={"store-setting"}>
        <StoreAccording
            icon={<img src={icon2} alt={"가게설정"} className={"according-icon"} />}
            title={"가게 설정"}
            isCollapsible={false}
            alwaysVisible={false}
        />
        <StoreAccording
            icon={<img src={icon1} alt={"할인및위약금관리"} className={"according-icon"} />}
            title={"할인 및 위약금 관리 - 예약 할인설정"}
            isCollapsible
            alwaysVisible
        >
          <form onSubmit={handleSubmit}>
            <div>
              <label>예약 할인 금액설정</label>
              <input
                  className={"input-box"}
                  type={"number"}
                  value={discount}
                  min={0}
                  onChange={handleInputChange}
              />
              {error && <p className={"error-message"} style={{color : 'red'}}>{error}</p>}
            </div>
            <button className={"modal-button"} type={"submit"}>
              설정하기
            </button>
          </form>
        </StoreAccording>
      </div>
  );
};

export default ReservationDiscount;
