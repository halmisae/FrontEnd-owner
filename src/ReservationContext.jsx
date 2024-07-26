import React, { createContext, useState, useEffect } from 'react';
import api from "./api";
import { useAuth } from "./AuthContext";

const ReservationContext = createContext();

const ReservationProvider = ({ children }) => {
    const [newReservationsCount, setNewReservationsCount] = useState(0);
    const { selectedStore } = useAuth();

    useEffect(() => {
        const fetchReservations = () => {
            if (selectedStore) {
                api.get(`${api.getUri()}/processing`, { params: { storeNumber: selectedStore } })
                    .then(response => {
                        const newReservations = response.data.filter(reservation => reservation.requestStatus === 'NOT_YET');
                        setNewReservationsCount(newReservations.length);
                    })
                    .catch(error => {
                        console.error('Error fetching reservations:', error);
                    });
            }
        };

        fetchReservations();
        const interval = setInterval(fetchReservations, 10000);
        return () => clearInterval(interval);
    }, [selectedStore]);

    return (
        <ReservationContext.Provider value={{ newReservationsCount }}>
            {children}
        </ReservationContext.Provider>
    );
};

export { ReservationProvider, ReservationContext };
