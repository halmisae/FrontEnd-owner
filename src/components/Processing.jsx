import React, { useState, useEffect } from 'react';
import '../scss/Processing.css';
import api from "../api";

const Processing = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        const fetchReservations = () => {
            api.get(`${api.getUri()}/processing`, { params: { storeNumber: 1 } })
                .then(response => {
                    console.log('Fetched reservations:', response.data);
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
        return new Date(time[0], time[1] - 1, time[2], time[3], time[4], time[5]).toLocaleString();
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
                                <h3>{reservation.orderType === "CLOSING_ORDER" ? reservation.orderNumber : reservation.reserveNumber}</h3>
                                <p>{renderReservationTime(reservation)}</p>
                                <p>수량: {reservation.people || reservation.quantity}</p>
                                <div>
                                    <button onClick={(e) => { e.stopPropagation(); handleAccept(reservation); }}>수락</button>
                                    <button onClick={(e) => { e.stopPropagation(); handleReject(reservation); }}>거절</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tab">
                    <h2>진행중</h2>
                    <div className="reservation-list">
                        {reservations.filter(reservation => reservation.requestStatus === "ACCEPT").map(reservation => (
                            <div key={reservation.orderType === "CLOSING_ORDER" ? reservation.orderNumber : reservation.reserveNumber}
                                 className="reservation"
                                 onClick={() => handleReservationClick(reservation)}>
                                <h3>{reservation.orderType === "CLOSING_ORDER" ? reservation.orderNumber : reservation.reserveNumber}</h3>
                                <p>{renderReservationTime(reservation)}</p>
                                <div>
                                    <button onClick={(e) => { e.stopPropagation(); handleComplete(reservation); }}>이용완료</button>
                                    <button onClick={(e) => { e.stopPropagation(); handleNoShow(reservation); }}>노쇼</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="main">
                {selectedReservation && (
                    <div className="reservation-details">
                        <h2>{selectedReservation.orderType === "CLOSING_ORDER" ? `픽업 예약 ${selectedReservation.orderNumber}` : `예약 ${selectedReservation.reserveNumber}`}</h2>
                        <p>{selectedReservation.orderType === "CLOSING_ORDER" ? `픽업 시간: ${renderReservationTime(selectedReservation)}` : `방문 일시: ${renderReservationTime(selectedReservation)}`}</p>
                        <p>{selectedReservation.orderType === "CLOSING_ORDER" ? `수량: ${selectedReservation.quantity}` : `인원: ${selectedReservation.people}`}</p>
                        <p>총액: {selectedReservation.closingPrice}원</p>
                        {selectedReservation.orderType !== "CLOSING_ORDER" && (
                            <>
                                <p>이용시간: {selectedReservation.useTime}분</p>
                                <div className="menu-section">
                                    <h4>메뉴 목록</h4>
                                    <ul>
                                        {selectedReservation.menuDTO && selectedReservation.menuDTO.map((menuItem, index) => (
                                            <li key={index}>{menuItem.menuName} x {menuItem.quantity}</li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Processing;
