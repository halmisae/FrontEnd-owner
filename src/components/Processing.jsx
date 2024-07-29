import React, { useState, useEffect } from 'react';
import '../scss/Processing.css';
import api from "../api";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import {useAuth} from "../AuthContext";

const Processing = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const {selectedStore} = useAuth();

    useEffect(() => {
        const fetchReservations = () => {
            api.get(`${api.getUri()}/processing`, { params: { storeNumber: selectedStore } })
                .then(response => {
                    setReservations(response.data);
                })
                .catch(error => {
                    console.error('Error fetching reservations:', error);
                });
        };

        fetchReservations();
        const interval = setInterval(fetchReservations, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleReservationClick = (reservation) => {
        setSelectedReservation(reservation);
    };

    const handleAccept = (reservation) => {
        const { orderType, reserveNumber, orderNumber } = reservation;
        const id = orderType === "CLOSING_ORDER" ? orderNumber : reserveNumber;
        const endpoint = orderType === "CLOSING_ORDER"
            ? "/processing/new/closingOrder/accept"
            : "/processing/new/reservation/accept";

        const params = orderType === "CLOSING_ORDER"
            ? { orderNumber: id }
            : { reserveNumber: id };

        api.post(`${api.getUri()}${endpoint}`, null, { params })
            .then(response => {
                setReservations(reservations.map(res =>
                    (res.orderType === "CLOSING_ORDER" ? res.orderNumber : res.reserveNumber) === id
                        ? { ...res, requestStatus: "ACCEPT" }
                        : res
                ));
                setSelectedReservation(null);
                console.log('Reservation accepted:', response);
            })
            .catch(error => {
                console.error('Error accepting reservation:', error);
            });
    };

    const handleReject = (reservation) => {
        const { orderType, reserveNumber, orderNumber } = reservation;
        const id = orderType === "CLOSING_ORDER" ? orderNumber : reserveNumber;
        const endpoint = orderType === "CLOSING_ORDER"
            ? "/processing/new/closingOrder/reject"
            : "/processing/new/reservation/reject";

        const payload = orderType === "CLOSING_ORDER"
            ? { orderNumber: id }
            : { reserveNumber: id };

        api.post(`${api.getUri()}${endpoint}`, payload)
            .then(response => {
                setReservations(reservations.filter(res =>
                    (res.orderType === "CLOSING_ORDER" ? res.orderNumber : res.reserveNumber) !== id
                ));
                setSelectedReservation(null);
                console.log('Reservation rejected:', response);
            })
            .catch(error => {
                console.error('Error rejecting reservation:', error);
            });
    };

    const handleComplete = (reservation) => {
        const { orderType, reserveNumber, orderNumber } = reservation;
        const id = orderType === "CLOSING_ORDER" ? orderNumber : reserveNumber;
        const endpoint = orderType === "CLOSING_ORDER"
            ? "/processing/closingOrder/complete"
            : "/processing/reservation/complete";

        const params = orderType === "CLOSING_ORDER"
            ? { orderNumber: id }
            : { reserveNumber: id };

        api.post(`${api.getUri()}${endpoint}`, null, { params })
            .then(response => {
                setReservations(reservations.filter(res =>
                    (res.orderType === "CLOSING_ORDER" ? res.orderNumber : res.reserveNumber) !== id
                ));
                setSelectedReservation(null);
                console.log('Reservation completed:', response);
            })
            .catch(error => {
                console.error('Error completing reservation:', error);
            });
    };

    const handleNoShow = (reservation) => {
        const { orderType, reserveNumber, orderNumber } = reservation;
        const id = orderType === "CLOSING_ORDER" ? orderNumber : reserveNumber;
        const endpoint = orderType === "CLOSING_ORDER"
            ? "/processing/closingOrder/noShow"
            : "/processing/reservation/noShow";

        const params = orderType === "CLOSING_ORDER"
            ? { orderNumber: id }
            : { reserveNumber: id };

        api.post(`${api.getUri()}${endpoint}`, null, { params })
            .then(response => {
                setReservations(reservations.filter(res =>
                    (res.orderType === "CLOSING_ORDER" ? res.orderNumber : res.reserveNumber) !== id
                ));
                setSelectedReservation(null);
                console.log('Reservation marked as no-show:', response);
            })
            .catch(error => {
                console.error('Error marking reservation as no-show:', error);
            });
    };

    const renderReservationTime = (reservation) => {
        const { orderType, reserveTime, visitTime, orderDate } = reservation;
        const time = orderType === "CLOSING_ORDER" ? orderDate : (orderType === "RESERVATION" ? visitTime : reserveTime);
        return new Date(time[0], time[1] - 1, time[2], time[3], time[4]).toLocaleString();
    };

    const isToday = (dateArray) => {
        const today = new Date();
        const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        return today.toDateString() === date.toDateString();
    };

    return (
        <div className="processing-container">
            <div className="reservation-bar">
                <div className="tab">
                    <h2>신규</h2>
                    <div className="reservation-list">
                        {reservations.filter(reservation => reservation.requestStatus === "NOT_YET").map(reservation => (
                            <div key={reservation.orderType === "CLOSING_ORDER" ? reservation.orderNumber : reservation.reserveNumber}
                                 className="reservation"
                                 onClick={() => handleReservationClick(reservation)}>
                                <h3>{reservation.orderType === "CLOSING_ORDER" ? `마감할인 주문번호${reservation.orderNumber}` : `방문예약 주문번호${reservation.reserveNumber}`}</h3>
                                <p>{renderReservationTime(reservation)}</p>
                                <p>{reservation.orderType === "CLOSING_ORDER" ? "수량" : "인원수"}: {reservation.people || reservation.quantity}</p>
                                <div>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        handleAccept(reservation);
                                    }}>수락
                                    </Button>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        handleReject(reservation);
                                    }}>거절
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tab">
                    <h2>진행중</h2>
                    <div className="reservation-list">
                        {reservations.filter(reservation =>
                            reservation.requestStatus === "ACCEPT" && isToday(reservation.orderType === "CLOSING_ORDER" ? reservation.orderDate : reservation.visitTime)
                        ).map(reservation => (
                            <div key={reservation.orderType === "CLOSING_ORDER" ? reservation.orderNumber : reservation.reserveNumber}
                                 className="reservation"
                                 onClick={() => handleReservationClick(reservation)}>
                                <h3>{reservation.orderType === "CLOSING_ORDER" ? `마감할인 주문번호${reservation.orderNumber}` : `방문예약 주문번호${reservation.reserveNumber}`}</h3>
                                <p>{renderReservationTime(reservation)}</p>
                                <div>
                                    <Button variant={"success"} onClick={(e) => { e.stopPropagation(); handleComplete(reservation); }}>이용완료</Button>
                                    <Button variant={"danger"} onClick={(e) => { e.stopPropagation(); handleNoShow(reservation); }}>노쇼</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="main">
                {selectedReservation && (
                    <div className="reservation-details">
                        <h2>{selectedReservation.orderType === "CLOSING_ORDER" ? `마감할인 주문 ${selectedReservation.orderNumber}` : `방문예약 ${selectedReservation.reserveNumber}`}</h2>
                        <p>{selectedReservation.orderType === "CLOSING_ORDER" ? `픽업 시간: ${renderReservationTime(selectedReservation)}` : `방문 일시: ${renderReservationTime(selectedReservation)}`}</p>
                        <p>{selectedReservation.orderType === "CLOSING_ORDER" ? `수량: ${selectedReservation.quantity}` : `인원: ${selectedReservation.people}`}</p>
                        <p>총액: {selectedReservation.totalPrice}원</p>
                        <>
                            <p>이용시간: {selectedReservation.useTime}분</p>
                            <div className="menu-section">
                                <h4>{selectedReservation.orderType === "CLOSING_ORDER" ? "" : "메뉴 목록"}</h4>
                                <ul>
                                    {selectedReservation.menuDTO && selectedReservation.menuDTO.map((menuItem, index) => (
                                        <li key={index}>{menuItem.menuName} x {menuItem.quantity}</li>
                                    ))}
                                </ul>
                                <div>
                                    <Button variant={"primary"} size={"lg"} onClick={(e) => {
                                        e.stopPropagation();
                                        handleAccept(selectedReservation);
                                    }}>{selectedReservation.requestStatus === "ACCEPT" ? "이용완료" : "수락"}
                                    </Button>
                                    <Button variant={"danger"} size={"lg"} onClick={(e) => {
                                        e.stopPropagation();
                                        handleReject(selectedReservation);
                                    }}>{selectedReservation.requestStatus === "ACCEPT" ? "노쇼" : "거절"}
                                    </Button>
                                </div>
                            </div>
                        </>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Processing;
