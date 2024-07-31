import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../scss/ReservationStatus.css";
import api from "../api";
import { useAuth } from "../AuthContext";
import {toast} from "react-toastify";

const formatToLocalDateTime = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString();
};

const fetchReservationData = (storeNumber, today) => {
    const requestUrl = `${api.getUri()}/schedule?storeNumber=${storeNumber}&today=${today}`;
    return api.get(requestUrl)
        .then(response => response.data)
        .catch(error => {
            toast.error(`데이터를 가져오는중 해당하는 오류발생: ${error.message}`);
            return [];
        });
};

const ReservationStatus = () => {
    const [events, setEvents] = useState([]);
    const { selectedStore } = useAuth();
    const today = formatToLocalDateTime(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedStore) {
            fetchReservationData(selectedStore, today)
                .then(data => {
                    const eventData = data
                        .filter(reservation => reservation.reserveCount > 0)
                        .map(reservation => ({
                            title: `예약 ${reservation.reserveCount}건`,
                            date: reservation.stringDate
                        }));
                    setEvents(eventData);
                });
        }
    }, [selectedStore,today]);

    const handleEventClick = (clickInfo) => {
        const date = clickInfo.event.startStr;
        navigate(`/reservation-detail?date=${encodeURIComponent(date)}`);
    };

    return (
        <div className="reservation-status">
            <h2>예약 현황</h2>
            <div className={"calendar-container"}>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView={"dayGridMonth"}
                    weekends={true}
                    events={events}
                    height={650}
                    contentHeight={650}
                    eventClick={handleEventClick}
                />
            </div>
        </div>
    );
};

export default ReservationStatus;
