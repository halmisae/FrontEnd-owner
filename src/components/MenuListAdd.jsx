import React, { useState } from "react";
import icon1 from "../assets/store-setting-edit.png";
import icon2 from "../assets/menu-edit.png";
import StoreAccording from "./StoreAccording";
import "../scss/MenuListAdd.css";

const MenuListAdd = () => {
    const [menuName, setMenuName] = useState("");
    const [menuDescription, setMenuDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [menuImage, setMenuImage] = useState(null);
    const [imagePrevUrl, setImagePrevUrl] = useState(null);

    const handleMenuNameChange = (e) => setMenuName(e.target.value);
    const handleMenuDescriptionChange = (e) => setMenuDescription(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        setMenuImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePrevUrl(reader.result);
        };
        reader.readAsDataURL(file);
        console.log(imagePrevUrl);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (menuDescription.length < 10 || menuDescription.length > 100) {
            alert("메뉴 설명은 10자 이상 100자 이하만 가능합니다");
            return;
        }
        const formData = new FormData();
        formData.append("menuName", menuName);
        formData.append("menuDescription", menuDescription);
        formData.append("price", price);
        formData.append("menuImage", menuImage);

        console.log("Form Data Submitted");
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
                title={"메뉴 관리 - 메뉴 추가"}
                isCollapsible
                alwaysVisible
            >
                <div className={"menu-add-container"}>
                    <h2>메뉴 추가</h2>
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
                                    value={menuDescription}
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
                                    required
                                />
                            </div>
                            {imagePrevUrl && (
                                <div className={"image-preview"}>
                                    <img src={imagePrevUrl} alt={"미리보기"} />
                                </div>
                            )}
                        </div>
                        <button type={"submit"} className={"modal-button"}>추가하기</button>
                    </form>
                </div>
            </StoreAccording>
        </div>
    )
}

export default MenuListAdd;
