import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./components/Home";
import CloseStore from "./components/CloseStore";
import Processing from "./components/Processing";
import SalesInquiry from "./components/SalesInquiry";
import ReservationStatus from "./components/ReservationStatus";
import StoreSettings from "./components/StoreSettings";
import TopBar from "./components/TopBar";
import StoreInfo from "./components/StoreInfo";
import OwnerInfo from "./components/OwnerInfo";
import WithDraw from "./components/WithDraw";
import MenuList from "./components/MenuList";
import ReservationDiscount from "./components/ReservationDiscount";
import UsageTimeDiscount from "./components/UsageTimeDiscount";
import ClosingDiscount from "./components/ClosingDiscount";
import MenuListAdd from "./components/MenuListAdd";
import Login from "./components/Login";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import ReservationDetail from "./components/ReservationDetail";
import DaumPost from "./components/DaumPost";
import {ReservationProvider} from "./ReservationContext";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className={"app"}>
                    <TopBar />
                    <div className={"main-content"}>
                        <ReservationProvider>
                            <Sidebar />
                            <div className={"content"}>
                                <Routes>
                                    <Route path={"/"} element={<Login />} />
                                    <Route path={"/home"} element={<Home />} />
                                    <Route element={<PrivateRoute />}>
                                        <Route path={"/processing"} element={<Processing />} />
                                        <Route path={"/reservation-status"} element={<ReservationStatus />} />
                                        <Route path={"/reservation-detail"} element={<ReservationDetail />} />
                                        <Route path={"/sales"} element={<SalesInquiry />} />
                                        <Route path={"/store-setting"} element={<StoreSettings />} />
                                        <Route path={"/close-store"} element={<CloseStore />} />
                                        <Route path={"/owner-info"} element={<OwnerInfo />} />
                                        <Route path={"/store-info"} element={<StoreInfo />} />
                                        <Route path={"/withdraw"} element={<WithDraw />} />
                                        <Route path={"/menu-list"} element={<MenuList />} />
                                        <Route path={"/menu-list-add"} element={<MenuListAdd />} />
                                        <Route path={"/reservation-discount"} element={<ReservationDiscount />} />
                                        <Route path={"/usage-time-discount"} element={<UsageTimeDiscount />} />
                                        <Route path={"/closing-discount"} element={<ClosingDiscount />} />
                                        <Route element={<DaumPost />}/>
                                    </Route>
                                </Routes>
                            </div>
                        </ReservationProvider>
                    </div>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
