import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../scss/ReservationStatus.css"

const ReservationStatus = () => {
    return (
        <div className="reservation-status">
            <h1>예약 현황</h1>
            <div className={"calendar-container"}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView={"dayGridMonth"}
                weekends={true}
                events={[
                    {title: '예약1', date: '2024-07-13'},
                    {title: '예약2', date: '2024-07-13'},
                    {title: '예약10', date: '2024-09-13'}
                ]}
                height={800}
                contentHeight={700}
            />
            </div>
        </div>
    );
};

export default ReservationStatus;
