import React from "react";
import {Tabs, Tab} from "react-bootstrap";
import ReservationDiscount from "./ReservationDiscount";
import ClosingDiscount from "./ClosingDiscount";
import UsageTimeDiscount from "./UsageTimeDiscount";

const DiscountManagement = () => {
    return (
        <div>
            <Tabs defaultActiveKey={"reservation"} id={"discount-management-tabs"} fill={true}>
                <Tab title={"예약 할인설정"} eventKey={"reservation"}>
                    <ReservationDiscount />
                </Tab>
                <Tab title={"이용시간 할인설정"} eventKey={"usageTime"}>
                    <UsageTimeDiscount />
                </Tab>
                <Tab title={"마감할인 상품등록 및 설정"} eventKey={"closing"}>
                    <ClosingDiscount />
                </Tab>
            </Tabs>
        </div>
    );
};

export default DiscountManagement;