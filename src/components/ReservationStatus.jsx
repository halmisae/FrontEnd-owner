import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../scss/ReservationStatus.css";
import api from "../api";
import {useAuth} from "../AuthContext";

const formatToLocalDateTime = (date) => {
    const dateObj = new Date(date);
    const isoString = dateObj.toISOString();
    return isoString;
};

const fetchReservationData = (storeNumber, today) => {
    const requestUrl = `${api.getUri()}/schedule?storeNumber=${storeNumber}&today=${today}`;
    return api.get(requestUrl)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching Data: ", error);
            return [];
        });
};

const ReservationStatus = () => {
    const [events, setEvents] = useState([]);
    const storeNumber = selectedStore;
    const today = formatToLocalDateTime(new Date());
    const navigate = useNavigate();
    const {selectedStore} = useAuth();

    useEffect(() => {
        fetchReservationData(storeNumber, today)
            .then(data => {
                const eventData = data
                    .filter(reservation => reservation.reserveCount > 0)
                    .map(reservation => ({
                        title: `예약 ${reservation.reserveCount}건`,
                        date: reservation.stringDate
                    }));
                setEvents(eventData);
            });
    }, []);

    const handleEventClick = (clickInfo) => {
        const date = clickInfo.event.startStr;
        navigate(`/reservation-detail?date=${encodeURIComponent(date)}`);
    };

    return (
        <div className="reservation-status">
            <h1>예약 현황</h1>
            <div className={"calendar-container"}>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView={"dayGridMonth"}
                    weekends={true}
                    events={events}
                    height={800}
                    contentHeight={700}
                    eventClick={handleEventClick}
                />
            </div>
        </div>
    );
};

export default ReservationStatus;
