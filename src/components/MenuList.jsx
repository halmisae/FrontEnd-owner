import React, { useEffect, useState } from "react";
import StoreAccording from "./StoreAccording";
import icon1 from "../assets/store-setting-edit.png";
import icon2 from "../assets/menu-edit.png";
import { useNavigate } from "react-router-dom";
import api from "../api";

const MenuList = () => {
    const [menuList, setMenuList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/menuList", { params: { storeNumber: 1 } })
            .then((response) => {
                setMenuList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleEditClick = (menu) => {
                const menuData = menu
        console.log(menuData)
                navigate("/menu-list-add", {
                    state: {
                        mode: 'edit',
                        menuNumber: menuData.menuNumber,
                        menuName: menuData.menuName,
                        menuDescription: menuData.introduction,
                        price: menuData.price,
                        menuImage: menuData.menuImage
                    }
            })
    };

    const handleAddClick = () => {
        navigate("/menu-list-add", { state: { mode: 'add' } });
    };


    const handleDeleteClick = (menuNumber) => {
        api.delete(`/menuList/menu`,{params :{menuNumber}})
            .then((response) => {
                if (response.status === 200) {
                    setMenuList(menuList.filter(menu => menu.menuNumber !== menuNumber));
                }
            })
            .catch((error) => {
                console.error("Error deleting menu: ", error);
                alert("삭제 중에 오류가 발생했습니다.");
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
                icon={<img src={icon2} alt={"메뉴관리"} className={"according-icon"} />}
                title={"메뉴 관리"}
                isCollapsible
                alwaysVisible
            >
                <div className={"menu-list"}>
                    {menuList.map(menu => (
                        <div key={menu.menuNumber} className={"menu-item"}>
                            <span>{menu.menuName}</span>
                            <span>{menu.price}원</span>
                            <span>{menu.introduction}</span>
                            <span><img src={menu.image} alt={"메뉴사진"} className={"according-icon"} /></span>
                            <button onClick={() => handleEditClick(menu)}>수정</button>
                            <button onClick={() => handleDeleteClick(menu.menuNumber)}>삭제</button>
                        </div>
                    ))}
                </div>
                <div className={"new-menu"}>
                    <button onClick={handleAddClick}>새 메뉴 추가</button>
                </div>
            </StoreAccording>
        </div>
    );
};

export default MenuList;
