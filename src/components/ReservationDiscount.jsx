import React, {useEffect, useState} from "react";
import StoreAccording from "./StoreAccording";
import icon1 from "../assets/storesale-edit.png";
import icon2 from "../assets/store-setting-edit.png";
import api from "../api";

const ReservationDiscount = () => {
  const [discount, setDiscount] = useState({
    preorderDiscount: 1000,
    storeNumber : 0
  });
  const [error, setError] =useState("");
  const [isEdit, setEdit] = useState(false);


  useEffect(() => {
    api.get("/preorderDiscount", {params: {storeNumber: 1}})
        .then((response)=>{
          const data = response.data;
          setDiscount({
            storeNumber: data.storeNumber,
            preorderDiscount: data.preorderDiscount,
          });
        })
        .catch((error)=>{
          console.error("Error fetching data: ",error);
        });
  }, []);
  const handleInputChange =(e)=>{
    const value = e.target.value;
    setDiscount(prevState => ({
      ...prevState,
      preorderDiscount: value
    }));
    setError("");
  }
  const handleEditToggle = () => {
    if (isEdit) {
      handleSubmit();
    }
    setEdit((prevState) => !prevState);
  };

  const handleSubmit = () => {
    if (!String(discount.preorderDiscount).endsWith("000")) {
      setError("할인 금액의 끝 3자리 수는 000으로 끝나야 합니다.");
    }else {
      try {
        api.post("/preorderDiscount", {...discount})
            .then((response)=>{
              console.log("Response: ",response.data);
              setEdit(false);
            })
        alert("할인 금액이 설정되었습니다");
      } catch (error){
        console.error("Error submitting discount: ",error);
        alert("할인 금액 설정 중 오류가 발생했습니다.");
      }
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
            icon={<img src={icon1} alt={"할인및위약금관리-예약할인설정"} className={"according-icon"} />}
            title={"할인 및 위약금 관리 - 예약 할인설정"}
            isCollapsible
            alwaysVisible
        >
          <form>
            <div>
              <label>예약 할인 금액설정</label>
              <input
                  className={"input-box"}
                  type={"number"}
                  value={discount.preorderDiscount}
                  min={0}
                  onChange={handleInputChange}
                  disabled={!isEdit}
              />
              {error && <p className={"error-message"} style={{color : 'red'}}>{error}</p>}
            </div>
            <button className={"modal-button"} type={"button"} onClick={handleEditToggle}>
              {isEdit ? "설정완료" : "수정하기"}
            </button>
          </form>
        </StoreAccording>
      </div>
  );
};

export default ReservationDiscount;
