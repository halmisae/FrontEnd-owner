import React, { useEffect, useState } from "react";
import StoreAccording from "./StoreAccording";
import icon1 from "../assets/store-setting-edit.png";
import icon2 from "../assets/menu-edit.png";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {useAuth} from "../AuthContext";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup"
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";

const MenuList = () => {
    const [menuList, setMenuList] = useState([]);
    const navigate = useNavigate();
    const {selectedStore} = useAuth();
    useEffect(() => {
        api.get("/menuList", { params: { storeNumber: selectedStore } })
            .then((response) => {
                setMenuList(response.data);
            })
            .catch((error) => {
                toast.error(`데이터를 받아오는중 오류발생: ${error.message}`);
            });
    }, [selectedStore]);

    const handleEditClick = (menu) => {
                const menuData = menu
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
                toast.error(`메뉴 삭제중 오류발생: ${error.message}`);
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
                <CardGroup>
                    {menuList.map(menu => (
                        <Card key={menu.menuNumber} style={{width: '18rem', margin: '1rem'}}>
                            <Card.Img variant="top" src={menu.image} alt="메뉴사진"
                                      style={{height: '180px', objectFit: 'cover'}}/>
                            <Card.Body>
                                <Card.Title>{menu.menuName}</Card.Title>
                                <Card.Text>{menu.price}원</Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button variant="primary" onClick={() => handleEditClick(menu)}>수정</Button>
                                    <Button variant="danger"
                                            onClick={() => handleDeleteClick(menu.menuNumber)}>삭제</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </CardGroup>
                <div className={"new-menu"}>
                    <button onClick={handleAddClick}>새 메뉴 추가</button>
                </div>
            </StoreAccording>
        </div>
    );
};

export default MenuList;
