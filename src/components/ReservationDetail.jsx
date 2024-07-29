import React, { useState, useEffect } from 'react';
import '../scss/Processing.css';
import api from "../api";
import { useLocation } from 'react-router-dom';
import {useAuth} from "../AuthContext";

const ReservationDetail = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const date = queryParams.get("date");
    const {selectedStore} = useAuth();

    useEffect(() => {
        if (date) {
            api.get(`${api.getUri()}/schedule/daily?storeNumber=${selectedStore}&date=${encodeURIComponent(date)}`)
                .then(response => {
                    setReservations(response.data);
                })
                .catch(error => {
                    console.error("Error fetching reservation: ", error);
                });
        }
    }, [date]);

    const handleReservationClick = (reservation) => {
        if (reservation.requestStatus !== 'RANDOM_BOX') {
            setSelectedReservation(reservation);
        } else {
            setSelectedReservation(null);
        }
    };

    const handleReject = (reserveNumber) => {
        const reserveNumberCancel = reserveNumber.reserveMenu[0].reserveNumber;

        api.put(`${api.getUri()}/schedule/daily/reservation/cancel`, null, {
            params: {reserveNumber: reserveNumberCancel}
        })
            .then(response => {
                console.log("예약 취소가 완료되었습니다.", response.data);
                setReservations(prevState =>
                    prevState.filter(reservations => reservations.reserveMenu[0].reserveNumber !== reserveNumberCancel)
                );
                setSelectedReservation(null);
            })
            .catch(error => {
                console.error("예약 취소중 에러 발생", error);
            });
    };


    return (
        <div className="processing-container">
            <div className="reservation-bar">
                <div className="tab">
                    <h2>예약중</h2>
                    <div className="reservation-list">
                        {reservations.length === 0 ? (
                            <p>해당 날짜에 예약이 없습니다.</p>
                        ) : (
                            reservations.filter(reservation => reservation.requestStatus === 'ACCEPT').map(reservation => (
                                <div key={reservation.reserveNumber} className="reservation" onClick={() => handleReservationClick(reservation)}>
                                    <h3>{reservation.reserveNumber}</h3>
                                    <p>{new Date(reservation.visitTime[0], reservation.visitTime[1] - 1, reservation.visitTime[2], reservation.visitTime[3], reservation.visitTime[4], reservation.visitTime[5]).toLocaleString()}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="main">
                {selectedReservation ? (
                    <div className="reservation-details">
                        <h2>예약 {selectedReservation.reserveNumber}</h2>
                        <p>예약 일시: {new Date(selectedReservation.visitTime[0], selectedReservation.visitTime[1] - 1, selectedReservation.visitTime[2], selectedReservation.visitTime[3], selectedReservation.visitTime[4], selectedReservation.visitTime[5]).toLocaleString()}</p>
                        <p>인원: {selectedReservation.people}</p>
                        <p>총액: {selectedReservation.totalPrice}원</p>
                        <p>이용시간: {selectedReservation.useTime}분</p>
                        <div className="menu-section">
                            <h4>메뉴 목록</h4>
                            <ul>
                                {selectedReservation.reserveMenu.map((menuItem, index) => {
                                    const menuDetails = selectedReservation.menu.find(menu => menu.menuNumber === menuItem.menuNumber);
                                    return (
                                        <li key={index}>{menuDetails ? menuDetails.menuName : 'Unknown'} x {menuItem.quantity}</li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="accept-buttons">
                            <>
                                <button onClick={() => handleReject(selectedReservation)}>취소</button>
                            </>
                        </div>
                    </div>
                ) : (
                    <p>예약을 선택하세요.</p>
                )}
            </div>
        </div>
    );
};

export default ReservationDetail;
