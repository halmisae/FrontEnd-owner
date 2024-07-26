import React, { createContext, useState, useEffect } from 'react';
import api from "./api";
import { useAuth } from "./AuthContext";

const ReservationContext = createContext();

const ReservationProvider = ({ children }) => {
    const [newReservationsCount, setNewReservationsCount] = useState(0);
    const { selectedStore, isOperational } = useAuth();

    useEffect(() => {
        const fetchReservations = () => {
            if (selectedStore && isOperational) {
                api.get(`${api.getUri()}/processing`, { params: { storeNumber: selectedStore } })
                    .then(response => {
                        const newReservations = response.data.filter(reservation => reservation.requestStatus === 'NOT_YET');
                        setNewReservationsCount(newReservations.length);
                    })
                    .catch(error => {
                        console.error('Error fetching reservations:', error);
                    });
            } else {
                setNewReservationsCount(0);
            }
        };

        fetchReservations();
        const interval = setInterval(fetchReservations, 5000);
        return () => clearInterval(interval);
    }, [selectedStore, isOperational]);

    return (
        <ReservationContext.Provider value={{ newReservationsCount }}>
            {children}
        </ReservationContext.Provider>
    );
};

export { ReservationProvider, ReservationContext };
