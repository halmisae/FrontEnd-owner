import React ,{useState}from "react";
import StoreAccording from "./StoreAccording";
import icon1 from "../assets/storeinfo-edit.png";
import icon2 from "../assets/store-setting-edit.png"
import "../scss/StoreSetting.css"
import "../scss/OwnerInfo.css"

const OwnerInfo = () => {
  const [formData, setFormData] = useState({
    userId: "userId",
    username: "userName",
    newPassword: "********",
    confirmPassword: "********",
    phoneNumber: "010-1111-2222"
  });
  const [isEdit,setEdit] = useState(false);
  const handleChange =(e)=>{
    const {name, value} =e.target;
    setFormData(prevState => ({...prevState,[name]:value}));
  };
  const handleEditToggle =()=>{
    if (isEdit){
      if (!validateForm()) {
        return;
      }
    }
    setEdit(prevState => !prevState);
  }
  const validateForm =()=>{
    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])(?!.*[<>'#()\/\\]).{8,32}$/;
    const phoneValid = /^010\d{8}%/;

    if (!passwordValid.test(formData.newPassword)){
      alert("비밀번호는 영어 소문자, 대문자, 숫자, 특수문자 중 최소 2가지 이상을 조합하여 최소 8자 이상 최대 32자 이내여야 합니다.(<,>,(,),#,',/,\\ 문자는 허용되지 않습니다.)");
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword){
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다");
      return false;
    }

    if (!phoneValid.test(formData.phoneNumber)){
      alert("전화번호는 010으로 시작하며, 11자리여야 합니다");
      return false;
    }
    return true;
  }
  return(
      <div className={"store-setting"}>
        <StoreAccording icon={<img src={icon2} alt={"가게설정"} className={"accordion-icon"}/>} title={"가게 설정"} isCollapsible={false} alwaysVisible={false}>
        </StoreAccording>
        <StoreAccording icon={<img src={icon1} alt={"정보수정"} className={"accordion-icon"}/>} title={"정보수정 - 업주 정보수정"} isCollapsible alwaysVisible>
          <form className={"according-content"}>
            <div>
              <label>아이디</label>
              <input className={"input-box"}
                  type={"text"}
                  name={"userId"}
                  value={formData.userId}
                  onChange={handleChange}
                  disabled
              />
            </div>
            <div>
              <label>이름</label>
              <input className={"input-box"}
                  type={"text"}
                  name={"username"}
                  value={formData.username}
                  onChange={handleChange}
                  disabled
              />
            </div>
            <div>
              <label>새로운 비밀번호</label>
              <input className={"input-box"}
                  type={"text"}
                  name={"newPassword"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={!isEdit}
              />
            </div>
            <div>
              <label>새로운 비밀번호 확인</label>
              <input className={"input-box"}
                  type={"text"}
                  name={"confirmPassword"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={!isEdit}
              />
            </div>
            <div>
              <label>전화번호</label>
              <input className={"input-box"}
                  type={"text"}
                  name={"phoneNumber"}
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEdit}
              />
            </div>
            <button className={"modal-button"} type={"button"} onClick={handleEditToggle}>
              {isEdit ? "수정완료" : "수정하기"}
            </button>
          </form>
        </StoreAccording>
      </div>
  )
}

export default OwnerInfo;