import React, {useState} from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
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
import "./App.css";


const App =()=> {
    const [status,setSatus] = useState('준비중');
    const toggleStatus =()=>{
        setSatus((prevState)=>(prevState ==='준비중' ? '영업중' : '준비중'));
    };
  return (
      <BrowserRouter>
          <div className={"app"}>
              <TopBar status={status}/>
              <div className={"main-content"}>
              <Sidebar status={status} toggleStatus={toggleStatus}/>
                <div className={"content"}>
                  <Routes>
                      <Route path={"/"} element={<Home/>}/>
                      <Route path={"/processing"} element={<Processing/>}/>
                      <Route path={"/reservation-status"} element={<ReservationStatus/>}/>
                      <Route path={"/sales-inquiry"} element={<SalesInquiry/>}/>
                      <Route path={"/store-setting"} element={<StoreSettings/>}/>
                      <Route path={"/close-store"} element={<CloseStore/>}/>
                      <Route path={"/owner-info"} element={<OwnerInfo/>}/>
                      <Route path={"/store-info"} element={<StoreInfo/>}/>
                      <Route path={"/withdraw"} element={<WithDraw/>}/>
                      <Route path={"/menu-list"} element={<MenuList/>}/>
                      <Route path={"/reservation-discount"} element={<ReservationDiscount/>}/>
                      <Route path={"/usage-time-discount"} element={<UsageTimeDiscount/>}/>
                      <Route path={"/closing-discount"} element={<ClosingDiscount/>}/>
                  </Routes>
                </div>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
