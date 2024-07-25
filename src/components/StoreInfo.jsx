import React,{useState} from "react";
import icon1 from "../assets/store-setting-edit.png";
import icon2 from "../assets/storeinfo-edit.png";
import StoreAccording from "./StoreAccording";
import "../scss/StoreInfo.css"

const StoreInfo = () => {
    const [formData,setFormData] = useState({
        storeName: "할미새",
        storeAddress: "경기도 **시 **구",
        businessHour: "",
        endBusinessHour: "",
        weekBusinessHour: "",
        weekEndBusinessHour: "",
        breakTime: "",
        endBreakTime: "",
        storePhone: "031-***-****",
        holidays: []
    });
    const [isEdit,setEdit] = useState(false);
    const handleChange =(e)=>{
        const {name,value}=e.target;
        setFormData((prevState)=>({...prevState,[name]:value}));
    }
    const handleEditToggle =()=>{
        setEdit((prevState)=>!prevState);
    }
    const renderHourOption =()=>{
        const options = [];
        for (let hour =1; hour <= 24; hour++){
            const hourString = hour < 10 ? `0${hour}` : `${hour}`;
            options.push(
                <option key={hour} value={hourString}>
                    {hourString}
                </option>
            );
        }
        return options;
    }
    const renderMinuteOption =()=>{
        const options = [];
        for (let minute = 0; minute < 60; minute += 10){
            const minuteString = minute < 10 ? `0${minute}` : `${minute}`;
            options.push(
                <option key={minute} value={minuteString}>
                    {minuteString}
                </option>
            );
        }
        return options;
    }
    const holidayCheckBoxChange =(e)=>{
        const {value,checked} = e.target;
        setFormData((prevState) =>{
            if (checked){
                console.log({...prevState,holidays:[...prevState.holidays,value]})
                return {...prevState,holidays:[...prevState.holidays,value]};
            }else {
                return {...prevState,holidays:prevState.holidays.filter((day)=>day !== value)}
            }
        });
    }
    const daysOfWeeks=["월요일","화요일","수요일","목요일","금요일","토요일","일요일"];
    return(
        <div className={"store-setting"}>
            <StoreAccording icon={<img src={icon1} alt={"가게설정"} className={"according-icon"}/>} title={"가게 설정"} isCollapsible={false} alwaysVisible={false}>
            </StoreAccording>
            <StoreAccording icon={<img src={icon2} alt={"가게정보수정"} className={"according-icon"}/>} title={"가게 정보수정"} isCollapsible alwaysVisible>
                <form className={"storeInfo-content"}>
                    <div>
                        <label>상호명</label>
                        {isEdit ? (
                            <input
                                className={"input-box"}
                                type={"text"}
                                name={"storeName"}
                                value={formData.storeName}
                                onChange={handleChange}
                                disabled={!isEdit}
                            />
                        ) : (
                            <span>{formData.storeName}</span>
                        )}
                    </div>
                    <div>
                        <label>가게 주소</label>
                        {isEdit ? (
                            <input
                                className={"input-box"}
                                type={"text"}
                                name={"storeAddress"}
                                value={formData.storeAddress}
                                onChange={handleChange}
                                disabled={!isEdit}
                            />
                        ) : (
                            <span>{formData.storeAddress}</span>
                        )}
                    </div>
                    <div>
                        <label>가게 전화번호</label>
                        {isEdit ? (
                            <input
                                className={"input-box"}
                                type={"text"}
                                name={"storePhone"}
                                value={formData.storePhone}
                                onChange={handleChange}
                                disabled={!isEdit}
                            />
                        ) : (
                            <span>{formData.storePhone}</span>
                        )}
                    </div>
                    <div className={"storeInfo-time"}>
                        <label>영업시간</label>
                        <label>평일 :
                            <span className={"span-space"}> </span>
                            <>
                                <select
                                    className={"select-box"}
                                    name={"businessHour"}
                                    value={formData.businessHour.split(':')[0]}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                >
                                    {renderHourOption()}
                                </select>
                                :
                                <select
                                    className={"select-box"}
                                    name={"businessHourMinute"}
                                    value={formData.businessHour.split(':')[1]}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                >
                                    {renderMinuteOption()}
                                </select>
                                <span className={"span-space"}>~</span>
                                <select
                                    className={"select-box"}
                                    name={"endBusinessHour"}
                                    value={formData.endBusinessHour.split(':')[0]}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                >
                                    {renderHourOption()}
                                </select>
                                :
                                <select
                                    className={"select-box"}
                                    name={"endBusinessHourMinute"}
                                    value={formData.endBusinessHour.split(':')[1]}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                >
                                    {renderMinuteOption()}
                                </select>
                            </>
                        </label>
                        <label>주말 :
                            <span className={"span-space"}> </span>
                            <>
                                <select
                                    className={"select-box"}
                                    name={"weekBusinessHour"}
                                    value={formData.weekBusinessHour.split(':')[0]}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                >
                                    {renderHourOption()}
                                </select>
                                :
                                <select
                                    className={"select-box"}
                                    name={"weekBusinessHourMinute"}
                                    value={formData.weekBusinessHour.split(':')[1]}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                >
                                    {renderMinuteOption()}
                                </select>
                                <span className={"span-space"}>~</span>
                                <select
                                    className={"select-box"}
                                    name={"weekEndBusinessHour"}
                                    value={formData.weekEndBusinessHour.split(':')[0]}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                >
                                    {renderHourOption()}
                                </select>
                                :
                                <select
                                    className={"select-box"}
                                    name={"weekEndBusinessHourMinute"}
                                    value={formData.weekEndBusinessHour.split(':')[1]}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                >
                                    {renderMinuteOption()}
                                </select>
                            </>
                        </label>
                        <label>브레이크 타임 :
                            <span className={"span-space"}> </span>
                            <>
                                <select
                                    className={"select-box"}
                                    name={"breakTime"}
                                    value={formData.breakTime.split(':')[0]}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                >
                                    {renderHourOption()}
                                </select>
                                :
                                <select
                                    className={"select-box"}
                                    name={"breakTimeMinute"}
                                    value={formData.breakTime.split(':')[1]}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                >
                                    {renderMinuteOption()}
                                </select>
                                <span className={"span-space"}>~</span>
                                <select
                                    className={"select-box"}
                                    name={"endBreakTime"}
                                    value={formData.endBreakTime.split(':')[0]}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                >
                                    {renderHourOption()}
                                </select>
                                :
                                <select
                                    className={"select-box"}
                                    name={"endBreakTimeMinute"}
                                    value={formData.endBreakTime.split(':')[1]}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                >
                                    {renderMinuteOption()}
                                </select>
                            </>
                        </label>
                        <label>휴무일</label>
                        <div className={"checkbox-group"}>
                            {daysOfWeeks.map((day) =>(
                                <label key={day}>
                                    <input
                                        type={"checkbox"}
                                        name={"holidays"}
                                        value={day}
                                        checked={formData.holidays.includes(day)}
                                        onChange={holidayCheckBoxChange}
                                        disabled={!isEdit}
                                    />
                                    {day}
                                </label>
                            ))}
                        </div>
                    </div>
                    <button className={"modal-button"} type={"button"} onClick={handleEditToggle}>
                        {isEdit ? "수정완료" : "수정하기"}
                    </button>
                </form>
            </StoreAccording>
        </div>
    )
}

export default StoreInfo;