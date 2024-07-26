import React, { createContext, useState, useEffect } from 'react';
import api from "./api";

const ReservationContext = createContext();

const ReservationProvider = ({ children }) => {
    const [newReservationsCount, setNewReservationsCount] = useState(0);

    useEffect(() => {
        const fetchReservations = () => {
            api.get('/processing', { params: { storeNumber: 1 } })
                .then(response => {
                    const newReservations = response.data.filter(reservation => reservation.requestStatus === 'NOT_YET');
                    setNewReservationsCount(newReservations.length);
                })
                .catch(error => {
                    console.error('Error fetching reservations:', error);
                });
        };

        fetchReservations();
        const interval = setInterval(fetchReservations, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ReservationContext.Provider value={{ newReservationsCount }}>
            {children}
        </ReservationContext.Provider>
    );
};

export { ReservationProvider, ReservationContext };
