import React, { useEffect, useState } from "react";
import StoreAccording from "./StoreAccording";
import icon1 from "../assets/store-setting-edit.png";
import icon2 from "../assets/storesale-edit.png";
import "../scss/UsageTimeDiscount.css";
import api from "../api";
import {useAuth} from "../AuthContext";

const UsageTimeDiscount = () => {
    const [formData, setFormData] = useState({
        discount: 0,
        unitTime: 0,
        usageTime: 0,
    });
    const {selectedStore} = useAuth();

    useEffect(() => {
        api
            .get("/unitTimeDiscount", { params: { storeNumber: selectedStore } })
            .then((response) => {
                const data = response.data;
                setFormData({
                    storeNumber: data.storeNumber,
                    discount: data.discount,
                    unitTime: data.unitTime,
                    usageTime: data.usageTime,
                });
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const [isEdit, setEdit] = useState(false);

    const handleEditToggle = () => {
        if (isEdit) {
            handleSubmit();
        }
        setEdit((prevState) => !prevState);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        api
            .post("/unitTimeDiscount", formData)
            .then((response) => {
                alert("설정이 성공적으로 완료되었습니다.");
            })
            .catch((error) => {
                console.error("Error submitting data: ", error);
                alert("설정 중 오류가 발생했습니다.");
            });
    };

    const renderUsageTimeOption = () => {
        const options = [];
        for (let minute = 0; minute < 130; minute += 10) {
            const minuteString = minute < 10 ? `0${minute}분` : `${minute}분`;
            options.push(
                <option key={minute} value={minute}>
                    {minuteString}
                </option>
            );
        }
        return options;
    };

    const renderUnitTimeOption = () => {
        const options = [];
        for (let unit = 0; unit < 70; unit += 10) {
            const unitString = unit < 10 ? `0${unit}분` : `${unit}`;
            options.push(
                <option key={unit} value={unit}>
                    {unitString}
                </option>
            );
        }
        return options;
    };

    return (
        <div className={"store-manage"}>
            <StoreAccording
                icon={<img src={icon2} alt={"할인및위약금관리-이용시간할인설정"} className={"according-icon"} />}
                title={"할인 및 위약금 관리 - 이용시간 할인 설정"}
                isCollapsible={false}
                alwaysVisible
            >
                <form className={"discount-content"}>
                    <div className={"discount-content"}>
                        <label>기본 이용시간 설정</label>
                        <select
                            name="usageTime"
                            value={formData.usageTime}
                            onChange={handleInputChange}
                            disabled={!isEdit}
                        >
                            {renderUsageTimeOption()}
                        </select>
                    </div>
                    <div className={"discount-content"}>
                        <label>할인 시간 단위 설정</label>
                        <label>
                            시간 단위 :
                            <span className={"span-space"}> </span>
                            <>
                                <select
                                    name="unitTime"
                                    value={formData.unitTime}
                                    onChange={handleInputChange}
                                    disabled={!isEdit}
                                >
                                    {renderUnitTimeOption()}
                                </select>
                            </>
                        </label>
                        <label>
                            단위 시간당 할인 금액 :
                            <span className={"span-space"}> </span>
                            <>
                                <input
                                    type={"number"}
                                    name="discount"
                                    min={0}
                                    value={formData.discount}
                                    onChange={handleInputChange}
                                    disabled={!isEdit}
                                />
                            </>
                        </label>
                    </div>
                    <button className={"modal-button"} type={"button"} onClick={handleEditToggle}>
                        {isEdit ? "설정완료" : "수정하기"}
                    </button>
                </form>
            </StoreAccording>
        </div>
    );
};

export default UsageTimeDiscount;
