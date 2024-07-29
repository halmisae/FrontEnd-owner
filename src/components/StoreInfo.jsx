import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import icon1 from "../assets/store-setting-edit.png";
import icon2 from "../assets/storeinfo-edit.png";
import StoreAccording from "./StoreAccording";
import DaumPost from "./DaumPost";
import "../scss/StoreInfo.css";
import api from "../api";
import { useAuth } from "../AuthContext";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

const weekdays = {
    "월요일": "MON",
    "화요일": "TUE",
    "수요일": "WED",
    "목요일": "THU",
    "금요일": "FRI",
    "토요일": "SAT",
    "일요일": "SUN"
};

const daysOfWeeks = Object.keys(weekdays);

const StoreInfo = () => {
    const [formData, setFormData] = useState({
        storeName: "",
        storeAddress: "",
        detailAddress: "",
        businessHour: "",
        endBusinessHour: "",
        weekBusinessHour: "",
        weekEndBusinessHour: "",
        breakTime: "",
        endBreakTime: "",
        storePhone: "",
        holidays: [],
        storeImage: null
    });
    const [isEdit, setEdit] = useState(false);
    const { selectedStore } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStoreInfo = async () => {
            try {
                const response = await api.get(`/information?storeNumber=${selectedStore}`);
                const data = response.data;

                if (data) {
                    setFormData({
                        storeName: data.storeName || "",
                        storeAddress: data.address.split(" ")[0] || "",
                        detailAddress: data.address.split(" ")[1] || "",
                        businessHour: data.weekdayOpen || "",
                        endBusinessHour: data.weekdayClose || "",
                        weekBusinessHour: data.weekendOpen || "",
                        weekEndBusinessHour: data.weekendClose || "",
                        breakTime: data.breakStart || "",
                        endBreakTime: data.breakEnd || "",
                        storePhone: data.storePhone || "",
                        holidays: data.storeHoliday.map(day => weekdays[day] || "").filter(day => day),
                        storeImage: data.storeImage || null
                    });
                }
            } catch (error) {
                console.error("가게정보 로드중 에러 발생: ", error);
            }
        };

        fetchStoreInfo();
    }, [selectedStore]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevState) => ({ ...prevState, storeImage: file }));
        }
    };

    const handleEditToggle = () => {
        if (isEdit) {
            updateStoreInfo();
        }
        setEdit((prevState) => !prevState);
    };

    const updateStoreInfo = async () => {
        const address = `${formData.storeAddress} ${formData.detailAddress}`;
        const formDataToSend = new FormData();
        formDataToSend.append("storeNumber", selectedStore);
        formDataToSend.append("storeName", formData.storeName);
        formDataToSend.append("address", address);
        formDataToSend.append("storePhone", formData.storePhone);
        formDataToSend.append("weekdayOpen", formData.businessHour);
        formDataToSend.append("weekdayClose", formData.endBusinessHour);
        formDataToSend.append("weekendOpen", formData.weekBusinessHour);
        formDataToSend.append("weekendClose", formData.weekEndBusinessHour);
        formDataToSend.append("breakStart", formData.breakTime);
        formDataToSend.append("breakEnd", formData.endBreakTime);
        formDataToSend.append("storeHoliday", formData.holidays.join(","));
        if (formData.storeImage) {
            formDataToSend.append("image", formData.storeImage);
        }

        try {
            await api.patch(`/information?storeNumber=${selectedStore}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            navigate("/store-info");
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
        const selectedHoliday = weekdays[value];
        setFormData((prevState) => {
            if (checked) {
                return { ...prevState, holidays: [...prevState.holidays, selectedHoliday] };
            } else {
                return { ...prevState, holidays: prevState.holidays.filter((day) => day !== selectedHoliday) };
            }
        });
    };

    const setAddress = (address) => {
        setFormData((prevState) => ({ ...prevState, storeAddress: address }));
    };

    return (
        <div className={"store-setting"}>
            <StoreAccording
                icon={<img src={icon1} alt={"가게설정"} className={"according-icon"} />}
                title={"가게 설정"}
                isCollapsible={false}
                alwaysVisible={false}
            />
            <StoreAccording
                icon={<img src={icon2} alt={"가게정보수정"} className={"according-icon"} />}
                title={"가게 정보수정"}
                isCollapsible
                alwaysVisible
            >
                <form className={"storeInfo-content"}>
                    <div>
                        <FloatingLabel controlId="storeName" label="상호명" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="상호명"
                                name="storeName"
                                value={formData.storeName || ""}
                                onChange={handleChange}
                                disabled={!isEdit}
                            />
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel controlId="storeAddress" label="가게 주소" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="가게 주소"
                                name="storeAddress"
                                value={formData.storeAddress || ""}
                                onChange={handleChange}
                                disabled={true}
                            />
                        </FloatingLabel>
                        {isEdit && <DaumPost setAddress={setAddress} />}
                    </div>
                    <div>
                        <FloatingLabel controlId="detailAddress" label="상세 주소" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="상세 주소"
                                name="detailAddress"
                                value={formData.detailAddress || ""}
                                onChange={handleChange}
                                disabled={!isEdit}
                            />
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel controlId="storePhone" label="가게 전화번호" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="가게 전화번호"
                                name="storePhone"
                                value={formData.storePhone || ""}
                                onChange={handleChange}
                                disabled={!isEdit}
                            />
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel controlId="storeImage" label="가게 사진" className="mb-3">
                            <Form.Control
                                type="file"
                                name="storeImage"
                                onChange={handleFileChange}
                                disabled={!isEdit}
                            />
                        </FloatingLabel>
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
                                        <Form.Check
                                            key={day}
                                            type={"checkbox"}
                                            id={`holiday-${day}`}
                                            label={day}
                                            value={day}
                                            checked={formData.holidays.includes(weekdays[day])}
                                            onChange={holidayCheckBoxChange}
                                            disabled={!isEdit}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <span>{daysOfWeeks.filter(day => formData.holidays.includes(weekdays[day])).join(", ")}</span>
                            )}
                        </div>
                        <Button variant="primary" onClick={handleEditToggle}>
                            {isEdit ? "저장하기" : "수정하기"}
                        </Button>
                    </div>
                </form>
            </StoreAccording>
        </div>
    );
};

export default StoreInfo;
