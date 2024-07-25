import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icon1 from "../assets/store-setting-edit.png";
import icon2 from "../assets/menu-edit.png";
import StoreAccording from "./StoreAccording";
import "../scss/MenuListAdd.css";
import api from "../api";

const MenuListAdd = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuName, setMenuName] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [imagePrevUrl, setImagePrevUrl] = useState(null);
    const [mode, setMode] = useState("add");
    const [menuNumber, setMenuNumber] = useState(null);
    const [storeNumber] = useState("1");

    useEffect(() => {
        const { state } = location;
        if (state) {
            setMode(state.mode);
            if (state.mode === "edit") {
                setMenuNumber(state.menuNumber);
                setMenuName(state.menuName);
                setIntroduction(state.menuDescription);
                setPrice(state.price);
                setImage(state.menuImage);
                setImagePrevUrl(state.image);
            }
        }
    }, [location]);

    const handleMenuNameChange = (e) => setMenuName(e.target.value);
    const handleMenuDescriptionChange = (e) => setIntroduction(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
            setImagePrevUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (introduction.length < 10 || introduction.length > 100) {
            alert("메뉴 설명은 10자 이상 100자 이하만 가능합니다");
            return;
        }

        const data = {
            menuNumber,
            storeNumber,
            menuName,
            introduction,
            price
        };

        const apiCall = mode === "edit"
            ? api.patch(`/menuList/menu`, data)
            : api.post("/menuList/menu", data);

        apiCall
            .then(() => {
                navigate("/menu-list");
            })
            .catch((error) => {
                console.error("Error submitting form: ", error);
                alert("제출 중에 오류가 발생했습니다.");
            });
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
                icon={<img src={icon2} alt={"메뉴관리-메뉴추가"} className={"according-icon"} />}
                title={`메뉴 관리 - ${mode === "edit" ? "메뉴 수정" : "메뉴 추가"}`}
                isCollapsible
                alwaysVisible
            >
                <div className={"menu-add-container"}>
                    <h2>{mode === "edit" ? "메뉴 수정" : "메뉴 추가"}</h2>
                    <form onSubmit={handleSubmit} className={"menu-add-form"}>
                        <div className={"form-left"}>
                            <div className={"form-group"}>
                                <label>메뉴 이름</label>
                                <input
                                    type={"text"}
                                    value={menuName}
                                    onChange={handleMenuNameChange}
                                    required
                                />
                            </div>
                            <div className={"form-group"}>
                                <label>메뉴 설명</label>
                                <textarea
                                    value={introduction}
                                    onChange={handleMenuDescriptionChange}
                                    required
                                    minLength={10}
                                    maxLength={100}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label>가격 :</label>
                                <input
                                    type={"number"}
                                    value={price}
                                    onChange={handlePriceChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className={"form-right"}>
                            <div className={"form-group"}>
                                <label>메뉴 사진 등록</label>
                                <input
                                    type={"file"}
                                    accept={"image/*"}
                                    onChange={handleImageChange}
                                    required={mode === "add"}
                                />
                            </div>
                            {imagePrevUrl && (
                                <div className={"image-preview"}>
                                    <img src={imagePrevUrl} alt={"미리보기"} />
                                </div>
                            )}
                        </div>
                        <button type={"submit"} className={"modal-button"}>{mode === "edit" ? "수정하기" : "추가하기"}</button>
                    </form>
                </div>
            </StoreAccording>
        </div>
    );
};

export default MenuListAdd;
