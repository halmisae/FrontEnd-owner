import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {element} from "prop-types";

const PrivateRoute = () => {
    const { isLoggedIn, isOperational } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    if (!isOperational) {
        return <Navigate to="/home"/>;
    }

    return <Outlet />;
};

export default PrivateRoute;
