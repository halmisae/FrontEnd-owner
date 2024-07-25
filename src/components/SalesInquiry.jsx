import React, { useState, useEffect } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import icon1 from "../assets/back-space.png";
import "../scss/SaleInquiry.css";
import api from "../api";

const fetchData = (storeNumber, year, month) => {
    const formattedDate = new Date(year, month, 1).toISOString();
    const requestUrl = `${api.getUri()}/sales?storeNumber=${storeNumber}&month=${encodeURIComponent(formattedDate)}`;

    return api.get(requestUrl)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching sales data: ", error);
            return [];
        });
};

const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
};

const getMonthlyData = (data, year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const monthlyData = [];

    const salesByDate = data.reduce((acc, order) => {
        if (order.visitTime) {
            const date = new Date(order.visitTime[0], order.visitTime[1] - 1, order.visitTime[2]).toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + order.totalPrice;
        }
        return acc;
    }, {});

    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        monthlyData.push({
            date: dateString,
            amount: salesByDate[dateString] || 0,
        });
    }

    return monthlyData;
};

const SalesInquiry = () => {
    const [data, setData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedYear] = useState(2024);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const storeNumber = 1;

    useEffect(() => {
        fetchData(storeNumber, selectedYear, selectedMonth)
            .then(fetchedData => {
                setData(fetchedData);
            })
            .catch(error => {
                setData([]);
            });
    }, [selectedMonth, selectedYear]);

    const handleMonthChange = (e) => {
        setSelectedMonth(Number(e.target.value));
    };

    const filteredData = getMonthlyData(data, selectedYear, selectedMonth);
    const monthlyOrders = data.filter(order =>
        order.visitTime &&
        new Date(order.visitTime[0], order.visitTime[1] - 1, order.visitTime[2]).getMonth() + 1 === selectedMonth &&
        new Date(order.visitTime[0], order.visitTime[1] - 1, order.visitTime[2]).getFullYear() === selectedYear
    );

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleBackToGraph = () => {
        setSelectedOrder(null);
    };

    return (
        <div className={"sale-container"}>
            <div className={"sale-history-div"}>
                <h3>주문기록</h3>
                <ul className={"sale-history"}>
                    {monthlyOrders.map((order) => (
                        <li key={order.reserveNumber}>
                            <button onClick={() => handleOrderClick(order)}>
                                {new Date(order.visitTime[0], order.visitTime[1] - 1, order.visitTime[2]).toISOString().split('T')[0]}: {order.totalPrice}원
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={"sale-graph"}>
                {selectedOrder ? (
                    <div>
                        <h4>주문 상세정보</h4>
                        <p>주문번호: {selectedOrder.reserveNumber}</p>
                        <p>결제금액: {selectedOrder.totalPrice}원</p>
                        <p>주문유형: {selectedOrder.orderType}</p>
                        <p>수량: {selectedOrder.people}</p>
                        <p>이용시간: {selectedOrder.useTime}분</p>
                        <p>주문일자: {new Date(selectedOrder.visitTime[0], selectedOrder.visitTime[1] - 1, selectedOrder.visitTime[2]).toISOString().split('T')[0]}</p>
                        <img src={icon1} alt={"뒤로가기"} className={"back-icon"} onClick={handleBackToGraph} />
                    </div>
                ) : (
                    <>
                        <label>
                            <select value={selectedMonth} onChange={handleMonthChange}>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            월
                        </label>
                        <ResponsiveContainer width="100%" height={650}>
                            <LineChart
                                data={filteredData}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </>
                )}
            </div>
        </div>
    );
};

export default SalesInquiry;
