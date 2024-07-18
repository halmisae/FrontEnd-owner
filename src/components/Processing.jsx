import React, { useState } from 'react';
import '../scss/Processing.css';

const dummyData = [
    {
        id: "004A",
        reservation_id: "004A",
        reservation_date: "2024-07-30T20:30:00",
        guest_count: 4,
        total_price: 60000,
        deposit: 30000,
        notes: "대형 테이블 또는 음료로 희망",
        isProcessing: false,
        menu: [
            { item: "감자탕", quantity: 1 },
            { item: "햄버거", quantity: 2 }
        ]
    },

    {
        id: "002A",
        reservation_id: "002A",
        reservation_date: "2024-07-30T21:30:00",
        guest_count: 5,
        total_price: 40000,
        deposit: 30000,
        notes: "저염음식 희망",
        isProcessing: false,
        menu: [
            { item: "피자", quantity: 1 },
            { item: "치킨", quantity: 2 }
        ]
    },

    {
        id: "001A",
        reservation_id: "001A",
        reservation_date: "2024-07-06T13:21:00",
        guest_count: 2,
        total_price: 30000,
        deposit: 15000,
        notes: "창가 좌석 희망",
        isProcessing: true,
        menu: [
            { item: "비빔밥", quantity: 1 },
            { item: "냉면", quantity: 1 }
        ]
    },

    {
        id: "003A",
        reservation_id: "003A",
        reservation_date: "2024-07-06T14:21:00",
        guest_count: 2,
        total_price: 30000,
        deposit: 15000,
        notes: "2인 좌석 희망",
        isProcessing: true,
        menu: [
            { item: "볶음밥", quantity: 1 },
            { item: "라면", quantity: 1 }
        ]
    }
];

const Processing = () => {
    const [reservations, setReservations] = useState(dummyData);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const handleReservationClick = (reservation) => {
        setSelectedReservation(reservation);
    };

    const handleAccept = (id) => {
        setReservations(reservations.map(reservation =>
            reservation.id === id ? { ...reservation, isProcessing: true } : reservation
        ));
        setSelectedReservation(null);
    };

    const handleReject = (id) => {
        setReservations(reservations.filter(reservation => reservation.id !== id));
        setSelectedReservation(null);
    };

    return (
        <div className="processing-container">
            <div className="reservation-bar">
                <div className="tab">
                    <h2>신규</h2>
                    <div className="reservation-list">
                        {reservations.filter(reservation => !reservation.isProcessing).map(reservation => (
                            <div key={reservation.id} className="reservation" onClick={() => handleReservationClick(reservation)}>
                                <h3>{reservation.reservation_id}</h3>
                                <p>{new Date(reservation.reservation_date).toLocaleString()}</p>
                                <button onClick={() => handleAccept(reservation.id)}>수락</button>
                                <button onClick={() => handleReject(reservation.id)}>거절</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tab">
                    <h2>진행중</h2>
                    <div className="reservation-list">
                        {reservations.filter(reservation => reservation.isProcessing).map(reservation => (
                            <div key={reservation.id} className="reservation" onClick={() => handleReservationClick(reservation)}>
                                <h3>{reservation.reservation_id}</h3>
                                <p>{new Date(reservation.reservation_date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="main">
                {selectedReservation && (
                    <div className="reservation-details">
                        <h2>예약 {selectedReservation.reservation_id}</h2>
                        <p>예약 일시: {new Date(selectedReservation.reservation_date).toLocaleString()}</p>
                        <p>인원: {selectedReservation.guest_count}</p>
                        <p>총액: {selectedReservation.total_price}원</p>
                        <p>예약금: {selectedReservation.deposit}원</p>
                        <p>희망사항: {selectedReservation.notes}</p>
                        <div className="menu-section">
                            <h4>메뉴 목록</h4>
                            <ul>
                                {selectedReservation.menu.map((menuItem, index) => (
                                    <li key={index}>{menuItem.item} x {menuItem.quantity}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="buttons">
                            <button onClick={() => handleAccept(selectedReservation.id)}>수락</button>
                            <button onClick={() => handleReject(selectedReservation.id)}>거절</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Processing;

