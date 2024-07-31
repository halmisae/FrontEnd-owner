import React, {useState, useEffect, useMemo} from 'react';
import '../scss/Processing.css';
import api from "../api";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import {useAuth} from "../AuthContext";
import {Card, ListGroup} from "react-bootstrap";
import {toast} from "react-toastify";

const Processing = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const {selectedStore} = useAuth();

    useEffect(() => {
        const fetchReservations = () => {
            api.get(`/processing`, { params: { storeNumber: selectedStore } })
                .then(response => {
                    setReservations(response.data);
                })
                .catch(error => {
                    toast.error(`데이터를 가져오는중 오류발생: ${error.message}`);
                });
        };

        fetchReservations();
        const interval = setInterval(fetchReservations, 3000);
        return () => clearInterval(interval);
    }, [selectedStore]);

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

                const orderType = reservations.find(res =>
                    (res.orderType === "CLOSING_ORDER" ? res.orderNumber : res.reserveNumber) === id
                )?.orderType;
                if (orderType === "CLOSING_ORDER"){
                    toast.success(`마감할인 ${id}번을 수락 하였습니다.`)
                }else {
                    toast.success(`방문예약 ${id}번을 수락하였습니다.`)
                }
            })
            .catch(error => {
                toast.error(`예약 및 주문 수락중 해당하는 오류발생: ${error.message}`);
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
            })
            .catch(error => {
                toast.error(`예약 및 주문 거절중 해당하는 오류발생: ${error.message}`);
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
                    ? {...res, doneType: "COMPLETE"} : res
                ));
                setSelectedReservation(null);
                toast.success(``)
            })
            .catch(error => {
                toast.error(`완료 처리중 해당하는 오류발생: ${error.message}`);
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
                    ? {...res, doneType: "NO_SHOW"} : res
                ));
                setSelectedReservation(null);
                toast.success(`주문번호${id}를 노쇼처리 하였습니다.`)
            })
            .catch(error => {
                toast.error(`노쇼 처리중 해당하는 오류발생: ${error.message}`);
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
    const newReservationsCount = useMemo(() => reservations.filter(reservation =>
        reservation.requestStatus === "NOT_YET" && reservation.doneType !== "OVER_TIME" && reservation.doneType !== "COMPLETE"
    ).length, [reservations]);

    const ongoingReservationsCount = useMemo(() => reservations.filter(reservation =>
        reservation.requestStatus === "ACCEPT" && isToday(reservation.orderType === "CLOSING_ORDER" ? reservation.orderDate : reservation.visitTime) && reservation.doneType === "NOT_YET"
    ).length, [reservations]);

    return (
        <div className="processing-container">
            <div className="reservation-bar">
                <div className="tab">
                    <h2>신규 {newReservationsCount}건</h2>
                    <div className="reservation-list">
                        {reservations.filter(reservation => reservation.requestStatus === "NOT_YET" && reservation.doneType !== "OVER_TIME" && reservation.doneType !== "COMPLETE").map(reservation => (
                            <div
                                key={reservation.orderType === "CLOSING_ORDER" ? reservation.orderNumber : reservation.reserveNumber}
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
                    <h2>진행중 {ongoingReservationsCount}건</h2>
                    <div className="reservation-list">
                        {reservations.filter(reservation =>
                            reservation.requestStatus === "ACCEPT" && isToday(reservation.orderType === "CLOSING_ORDER" ? reservation.orderDate : reservation.visitTime) && reservation.doneType === "NOT_YET"
                        ).map(reservation => (
                            <div
                                key={reservation.orderType === "CLOSING_ORDER" ? reservation.orderNumber : reservation.reserveNumber}
                                className="reservation"
                                onClick={() => handleReservationClick(reservation)}>
                                <h3>{reservation.orderType === "CLOSING_ORDER" ? `마감할인 주문번호${reservation.orderNumber}` : `방문예약 주문번호${reservation.reserveNumber}`}</h3>
                                <p>{renderReservationTime(reservation)}</p>
                                <div>
                                    <Button variant={"success"} onClick={(e) => {
                                        e.stopPropagation();
                                        handleComplete(reservation);
                                    }}>이용완료</Button>
                                    <Button variant={"danger"} onClick={(e) => {
                                        e.stopPropagation();
                                        handleNoShow(reservation);
                                    }}>노쇼</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="main">
                {selectedReservation && (
                    <Card className="reservation-details">
                        <Card.Header>
                            <h2>
                                {selectedReservation.orderType === "CLOSING_ORDER"
                                    ? `마감할인 주문 ${selectedReservation.orderNumber}`
                                    : `방문예약 ${selectedReservation.reserveNumber}`}
                            </h2>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {selectedReservation.orderType === "CLOSING_ORDER"
                                    ? `픽업 시간: ${renderReservationTime(selectedReservation)}`
                                    : `방문 일시: ${renderReservationTime(selectedReservation)}`}
                                <br/>
                                {selectedReservation.orderType === "CLOSING_ORDER"
                                    ? `수량: ${selectedReservation.quantity}`
                                    : `인원: ${selectedReservation.people}`}
                                <br/>
                                총액: {selectedReservation.totalPrice}원
                                <br/>
                                {selectedReservation.orderType === "CLOSING_ORDER" ? "" : `이용시간: ${selectedReservation.useTime}분`}
                            </Card.Text>
                            {selectedReservation.menuDTO && (
                                <>
                                    <Card.Title>{selectedReservation.orderType === "CLOSING_ORDER" ? "" : "메뉴 목록"}</Card.Title>
                                    <ListGroup>
                                        {selectedReservation.menuDTO.map((menuItem, index) => (
                                            <ListGroup.Item key={index}>
                                                {menuItem.menuName} x {menuItem.quantity}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </>
                            )}
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-flex justify-content-end">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAccept(selectedReservation);
                                    }}
                                >
                                    {selectedReservation.requestStatus === "ACCEPT" ? "이용완료" : "수락"}
                                </Button>
                                <Button
                                    variant="danger"
                                    size="lg"
                                    className="ms-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleReject(selectedReservation);
                                    }}
                                >
                                    {selectedReservation.requestStatus === "ACCEPT" ? "노쇼" : "거절"}
                                </Button>
                            </div>
                        </Card.Footer>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Processing;
