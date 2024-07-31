import React, {useEffect, useState} from "react";
import StoreAccording from "./StoreAccording";
import icon1 from "../assets/storesale-edit.png";
import api from "../api";
import {useAuth} from "../AuthContext";
import {toast} from "react-toastify";

const ReservationDiscount = () => {
  const [discount, setDiscount] = useState({
    preorderDiscount: 1000,
  });
  const [error, setError] =useState("");
  const [isEdit, setEdit] = useState(false);
  const {selectedStore} = useAuth();


  useEffect(() => {
    api.get("/preorderDiscount", {params: {storeNumber: selectedStore}})
        .then((response)=>{
          const data = response.data;
          setDiscount({
            preorderDiscount: data.preorderDiscount,
          });
        })
        .catch((error)=>{
          toast.error(`데이터를 가져오는중 해당하는 오류발생: ${error.message}`);
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
        api.post("/preorderDiscount", {...discount, storeNumber:selectedStore})
            .then((response)=>{
              setEdit(false);
            })
        toast.success("할인 금액을 설정완료 하였습니다.");
      } catch (error){
        toast.error(`할인 금액 설정중 해당하는 오류발생: ${error.message}`);
      }
    }
  };

  return (
      <div className={"store-manage"}>
        <StoreAccording
            icon={<img src={icon1} alt={"할인및위약금관리-예약할인설정"} className={"according-icon"} />}
            title={"할인 및 위약금 관리 - 예약 할인설정"}
            isCollapsible={false}
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
