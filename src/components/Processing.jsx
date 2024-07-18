import React, { useState, useEffect } from 'react';
import '../scss/Processing.css';
import axios from 'axios';

const dummyData = [
    {
        id: "랜덤박스-004A",
        reservation_id: "004A",
        reservation_date: "2024-07-30T20:30:00",
        quantity: 5,
        total_price: 60000,
        isProcessing: false,
        isRandomBox: true,
    },

    {
        id: "랜덤박스-004A",
        reservation_id: "004A",
        reservation_date: "2024-07-30T20:30:00",
        quantity: 5,
        total_price: 60000,
        isProcessing: false,
        isRandomBox: true,
    },

    {
        id: "랜덤박스-004A",
        reservation_id: "004A",
        reservation_date: "2024-07-30T20:30:00",
        quantity: 5,
        total_price: 60000,
        isProcessing: false,
        isRandomBox: true,
    },

    {
        id: "랜덤박스-004A",
        reservation_id: "004A",
        reservation_date: "2024-07-30T20:30:00",
        quantity: 5,
        total_price: 60000,
        isProcessing: false,
        isRandomBox: true,
    },

    {
        id: "예약-002A",
        reservation_id: "002A",
        reservation_date: "2024-07-30T21:30:00",
        guest_count: 5,
        total_price: 40000,
        deposit: 30000,
        notes: "저염음식 희망",
        isProcessing: false,
        isRandomBox: false,
        menu: [
            { item: "피자", quantity: 1 },
            { item: "치킨", quantity: 2 }
        ]
    },
    {
        id: "예약-001A",
        reservation_id: "001A",
        reservation_date: "2024-07-06T13:21:00",
        guest_count: 2,
        total_price: 30000,
        deposit: 15000,
        notes: "창가 좌석 희망",
        isProcessing: true,
        isRandomBox: false,
        menu: [
            { item: "비빔밥", quantity: 1 },
            { item: "냉면", quantity: 1 }
        ]
    },
    {
        id: "예약-003A",
        reservation_id: "003A",
        reservation_date: "2024-07-06T14:21:00",
        guest_count: 2,
        total_price: 30000,
        deposit: 15000,
        notes: "2인 좌석 희망",
        isProcessing: true,
        isRandomBox: false,
        menu: [
            { item: "볶음밥", quantity: 1 },
            { item: "라면", quantity: 1 }
        ]
    },
    {
        id: "예약-003A",
        reservation_id: "003A",
        reservation_date: "2024-07-06T14:21:00",
        guest_count: 2,
        total_price: 30000,
        deposit: 15000,
        notes: "2인 좌석 희망",
        isProcessing: true,
        isRandomBox: false,
        menu: [
            { item: "볶음밥", quantity: 1 },
            { item: "라면", quantity: 1 }
        ]
    },
    {
        id: "예약-003A",
        reservation_id: "003A",
        reservation_date: "2024-07-06T14:21:00",
        guest_count: 2,
        total_price: 30000,
        deposit: 15000,
        notes: "2인 좌석 희망",
        isProcessing: true,
        isRandomBox: false,
        menu: [
            { item: "볶음밥", quantity: 1 },
            { item: "라면", quantity: 1 }
        ]
    },
    {
        id: "예약-003A",
        reservation_id: "003A",
        reservation_date: "2024-07-06T14:21:00",
        guest_count: 2,
        total_price: 30000,
        deposit: 15000,
        notes: "2인 좌석 희망",
        isProcessing: true,
        isRandomBox: false,
        menu: [
            { item: "볶음밥", quantity: 1 },
            { item: "라면", quantity: 1 }
        ]
    },
    {
        id: "예약-003A",
        reservation_id: "003A",
        reservation_date: "2024-07-06T14:21:00",
        guest_count: 2,
        total_price: 30000,
        deposit: 15000,
        notes: "2인 좌석 희망",
        isProcessing: true,
        isRandomBox: false,
        menu: [
            { item: "볶음밥", quantity: 1 },
            { item: "라면", quantity: 1 }
        ]
    },
    {
        id: "예약-003A",
        reservation_id: "003A",
        reservation_date: "2024-07-06T14:21:00",
        guest_count: 2,
        total_price: 30000,
        deposit: 15000,
        notes: "2인 좌석 희망",
        isProcessing: true,
        isRandomBox: false,
        menu: [
            { item: "볶음밥", quantity: 1 },
            { item: "라면", quantity: 1 }
        ]
    }
];

const Processing = () => {
    const [reservations, setReservations] = useState(dummyData);
    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('/api/reservations')
                .then(response => {
                    setReservations(response.data);
                })
                .catch(error => {
                    console.error('Error fetching reservations:', error);
                });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleReservationClick = (reservation) => {
        if (!reservation.isRandomBox) {
            setSelectedReservation(reservation);
        } else {
            setSelectedReservation(null);
        }
    };

    const handleAccept = (id) => {
        setReservations(reservations.map(reservation =>
            reservation.id === id ? { ...reservation, isProcessing: true } : reservation
        ));
        setSelectedReservation(null);
        axios.post('/api/accept', { id })
            .then(response => {
                console.log('Reservation accepted:', response);
            })
            .catch(error => {
                console.error('Error accepting reservation:', error);
            });
    };

    const handleReject = (id) => {
        setReservations(reservations.filter(reservation => reservation.id !== id));
        setSelectedReservation(null);
    };

    const handleComplete = (id) => {
        setReservations(reservations.filter(reservation => reservation.id !== id));
        setSelectedReservation(null);
        // Update MySQL database as complete
        axios.post('/api/complete', { id })
            .then(response => {
                console.log('Reservation completed:', response);
            })
            .catch(error => {
                console.error('Error completing reservation:', error);
            });
    };

    return (
        <div className="processing-container">
            <div className="reservation-bar">
                <div className="tab">
                    <h2>신규</h2>
                    <div className="reservation-list">
                        {reservations.filter(reservation => !reservation.isProcessing).map(reservation => (
                            <div key={reservation.id} className="reservation"
                                 onClick={() => handleReservationClick(reservation)}>
                                <h3>{reservation.id}</h3>
                                <p>{new Date(reservation.reservation_date).toLocaleString()}</p>
                                <p>수량: {reservation.quantity}</p>
                                <div>
                                    <button onClick={() => handleAccept(reservation.id)}>수락</button>
                                    <button onClick={() => handleReject(reservation.id)}>거절</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tab">
                    <h2>진행중</h2>
                    <div className="reservation-list">
                        {reservations.filter(reservation => reservation.isProcessing).map(reservation => (
                            <div key={reservation.id} className="reservation" onClick={() => handleReservationClick(reservation)}>
                                <h3>{reservation.id}</h3>
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
                        <div className="accept-buttons">
                            {selectedReservation.isProcessing ? (
                                <>
                                    <button onClick={() => handleComplete(selectedReservation.id)}>이용완료</button>
                                    <button onClick={() => handleComplete(selectedReservation.id)}>노쇼</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleAccept(selectedReservation.id)}>수락</button>
                                    <button onClick={() => handleReject(selectedReservation.id)}>거절</button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Processing;