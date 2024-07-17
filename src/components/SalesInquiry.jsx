import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import icon1 from "../assets/back-space.png";
import "../scss/SaleInquiry.css";

const fetchData = async () => {
  return [
    { salesNumber: 1, doneDate: '2024-01-01', paymentPrice: 50000, orderType: 'online', quantity: 2, usageTime: '1h', menuName: 'Product A' },
    { salesNumber: 2, doneDate: '2024-01-01', paymentPrice: 55000, orderType: 'online', quantity: 2, usageTime: '2h', menuName: 'Product A' },
    { salesNumber: 3, doneDate: '2024-01-02', paymentPrice: 30000, orderType: 'offline', quantity: 1, usageTime: '2h', menuName: 'Product B' },
  ];
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getMonthlyData = (data, year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const monthlyData = [];

  const salesByDate = data.reduce((acc, order) => {
    const date = order.doneDate;
    acc[date] = (acc[date] || 0) + order.paymentPrice;
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

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };
    loadData();
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const filteredData = getMonthlyData(data, selectedYear, selectedMonth);
  const monthlyOrders = data.filter(order =>
      new Date(order.doneDate).getMonth() + 1 === selectedMonth &&
      new Date(order.doneDate).getFullYear() === selectedYear
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
                <li key={order.salesNumber}>
                  <button onClick={() => handleOrderClick(order)}>
                    {order.doneDate}: {order.paymentPrice}원
                  </button>
                </li>
            ))}
          </ul>
        </div>
        <div className={"sale-graph"}>
          {selectedOrder ? (
              <div>
                <h4>주문 상세정보</h4>
                <p>주문번호: {selectedOrder.salesNumber}</p>
                <p>결제금액: {selectedOrder.paymentPrice}원</p>
                <p>주문유형: {selectedOrder.orderType}</p>
                <p>수량: {selectedOrder.quantity}</p>
                <p>이용시간: {selectedOrder.usageTime}</p>
                <p>주문일자: {selectedOrder.doneDate}</p>
                <p>상품명: {selectedOrder.menuName}</p>
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
