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
    setEdit(prevState => !prevState);
  };

  return(
      <div className={"store-setting"}>
        <StoreAccording icon={<img src={icon2} alt={"가게설정"} className={"accordion-icon"}/>} title={"가게 설정"} isCollapsible={false} alwaysVisible={false}>
        </StoreAccording>
        <StoreAccording icon={<img src={icon1} alt={"정보수정"} className={"accordion-icon"}/>} title={"정보수정 - 업주 정보수정"} isCollapsible alwaysVisible>
          <form>
            <div>
              <label>아이디</label>
              <input
                  type={"text"}
                  name={"userId"}
                  value={formData.userId}
                  onChange={handleChange}
                  disabled
              />
            </div>
            <div>
              <label>이름</label>
              <input
                  type={"text"}
                  name={"username"}
                  value={formData.username}
                  onChange={handleChange}
                  disabled
              />
            </div>
            <div>
              <label>새로운 비밀번호</label>
              <input
                  type={"text"}
                  name={"newPassword"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={!isEdit}
              />
            </div>
            <div>
              <label>새로운 비밀번호 확인</label>
              <input
                  type={"text"}
                  name={"confirmPassword"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={!isEdit}
              />
            </div>
            <div>
              <label>전화번호</label>
              <input
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