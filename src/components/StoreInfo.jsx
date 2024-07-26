import React, { useState } from "react";
import icon1 from "../assets/store-setting-edit.png";
import icon2 from "../assets/storeinfo-edit.png";
import StoreAccording from "./StoreAccording";
import DaumPost from "./DaumPost";
import "../scss/StoreInfo.css";
import api from "../api";
import {useAuth} from "../AuthContext";

const StoreInfo = () => {
    const [formData, setFormData] = useState({
        storeName: "할미새",
        storeAddress: "경기도 **시 **구",
        detailAddress: "",
        businessHour: "09:00",
        endBusinessHour: "18:00",
        weekBusinessHour: "10:00",
        weekEndBusinessHour: "20:00",
        breakTime: "13:00",
        endBreakTime: "14:00",
        storePhone: "031-***-****",
        holidays: []
    });
    const [isEdit, setEdit] = useState(false);
    const {selectedStore} = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleEditToggle = () => {
        if (isEdit) {
            updateStoreInfo();
        }
        setEdit((prevState) => !prevState);
    };

    const updateStoreInfo = async () => {
        const address = `${formData.storeAddress} ${formData.detailAddress}`;
        const queryParams = new URLSearchParams({
            storeNumber: selectedStore,
            storeName: formData.storeName,
            address: address,
            storePhone: formData.storePhone,
            weekdayOpen: formData.businessHour,
            weekdayClose: formData.endBusinessHour,
            weekendOpen: formData.weekBusinessHour,
            weekendClose: formData.weekEndBusinessHour,
            breakStart: formData.breakTime,
            breakEnd: formData.endBreakTime,
            storeHoliday: formData.holidays.join(",")
        }).toString();
        try {
            await api.patch(`/information?${queryParams}`, {}, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
        } catch (error) {
            console.error("가게정보 업로드중 에러 발생: ", error);
        }
    };

    const renderHourOption = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            const hourString = hour < 10 ? `0${hour}` : `${hour}`;
            options.push(
                <option key={hour} value={hourString}>
                    {hourString}
                </option>
            );
        }
        return options;
    };

    const renderMinuteOption = () => {
        const options = [];
        for (let minute = 0; minute < 60; minute += 10) {
            const minuteString = minute < 10 ? `0${minute}` : `${minute}`;
            options.push(
                <option key={minute} value={minuteString}>
                    {minuteString}
                </option>
            );
        }
        return options;
    };

    const holidayCheckBoxChange = (e) => {
        const { value, checked } = e.target;
        const weekdays = {
            "월요일": "MON",
            "화요일": "TUE",
            "수요일": "WED",
            "목요일": "THU",
            "금요일": "FRI",
            "토요일": "SAT",
            "일요일": "SUN"
        };
        setFormData((prevState) => {
            if (checked) {
                return { ...prevState, holidays: [...prevState.holidays, weekdays[value]] };
            } else {
                return { ...prevState, holidays: prevState.holidays.filter((day) => day !== weekdays[value]) };
            }
        });
    };

    const daysOfWeeks = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

    const setAddress = (address) => {
        setFormData((prevState) => ({ ...prevState, storeAddress: address }));
    };

    return (
        <div className={"store-setting"}>
            <StoreAccording icon={<img src={icon1} alt={"가게설정"} className={"according-icon"} />} title={"가게 설정"} isCollapsible={false} alwaysVisible={false}>
            </StoreAccording>
            <StoreAccording icon={<img src={icon2} alt={"가게정보수정"} className={"according-icon"} />} title={"가게 정보수정"} isCollapsible alwaysVisible>
                <form className={"storeInfo-content"}>
                    <div>
                        <label className={"storeInfo-title"}>상호명</label>
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
                        <label className={"storeInfo-title"}>가게 주소</label>
                        {isEdit ? (
                            <>
                                <input
                                    className={"input-box"}
                                    type={"text"}
                                    name={"storeAddress"}
                                    value={formData.storeAddress}
                                    onChange={handleChange}
                                    disabled={true}
                                />
                                <DaumPost setAddress={setAddress} />
                            </>
                        ) : (
                            <span>{formData.storeAddress}</span>
                        )}
                    </div>
                    <div>
                        <label className={"storeInfo-title"}>상세 주소</label>
                        {isEdit ? (
                            <>
                                <input
                                    className={"input-box"}
                                    type={"text"}
                                    name={"detailAddress"}
                                    value={formData.detailAddress}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                />
                            </>
                        ) : (
                            <span>{formData.detailAddress}</span>
                        )}
                    </div>
                    <div>
                        <label className={"storeInfo-title"}>가게 전화번호</label>
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
                        <label className={"storeInfo-title"}>영업시간</label>
                        <label className={"storeInfo-title"}>평일 :
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
                                    name={"businessHour"}
                                    value={formData.businessHour.split(':')[1]}
                                    onChange={(e) => handleChange({ target: { name: 'businessHour', value: `${formData.businessHour.split(':')[0]}:${e.target.value}` } })}
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
                                    name={"endBusinessHour"}
                                    value={formData.endBusinessHour.split(':')[1]}
                                    onChange={(e) => handleChange({ target: { name: 'endBusinessHour', value: `${formData.endBusinessHour.split(':')[0]}:${e.target.value}` } })}
                                    disabled={!isEdit}
                                >
                                    {renderMinuteOption()}
                                </select>
                            </>
                        </label>
                        <label className={"storeInfo-title"}>주말 :
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
                                    name={"weekBusinessHour"}
                                    value={formData.weekBusinessHour.split(':')[1]}
                                    onChange={(e) => handleChange({ target: { name: 'weekBusinessHour', value: `${formData.weekBusinessHour.split(':')[0]}:${e.target.value}` } })}
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
                                    name={"weekEndBusinessHour"}
                                    value={formData.weekEndBusinessHour.split(':')[1]}
                                    onChange={(e) => handleChange({ target: { name: 'weekEndBusinessHour', value: `${formData.weekEndBusinessHour.split(':')[0]}:${e.target.value}` } })}
                                    disabled={!isEdit}
                                >
                                    {renderMinuteOption()}
                                </select>
                            </>
                        </label>
                        <label className={"storeInfo-title"}>브레이크 타임 :
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
                                    name={"breakTime"}
                                    value={formData.breakTime.split(':')[1]}
                                    onChange={(e) => handleChange({ target: { name: 'breakTime', value: `${formData.breakTime.split(':')[0]}:${e.target.value}` } })}
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
                                    name={"endBreakTime"}
                                    value={formData.endBreakTime.split(':')[1]}
                                    onChange={(e) => handleChange({ target: { name: 'endBreakTime', value: `${formData.endBreakTime.split(':')[0]}:${e.target.value}` } })}
                                    disabled={!isEdit}
                                >
                                    {renderMinuteOption()}
                                </select>
                            </>
                        </label>
                        <div>
                            <label className={"storeInfo-title"}>휴일</label>
                            {isEdit ? (
                                <div className={"checkbox-group"}>
                                    {daysOfWeeks.map((day) => (
                                        <label key={day}>
                                            <input
                                                type={"checkbox"}
                                                value={day}
                                                checked={formData.holidays.includes(day)}
                                                onChange={holidayCheckBoxChange}
                                                disabled={!isEdit}
                                            />
                                            {day}
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <span>{formData.holidays.join(", ")}</span>
                            )}
                        </div>
                    </div>
                    <button className={"modal-button"} type={"button"} onClick={handleEditToggle}>
                        {isEdit ? "수정완료" : "수정하기"}
                    </button>
                </form>
            </StoreAccording>
        </div>
    );
};

export default StoreInfo;
