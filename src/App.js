import React from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./components/Home";
import CloseStore from "./components/CloseStore";
import Processing from "./components/Processing";
import SalesInquiry from "./components/SalesInquiry";
import ReservationStatus from "./components/ReservationStatus";
import StoreSettings from "./components/StoreSettings";
import "./App.css";


function App() {
  return (
      <BrowserRouter>
          <div className={"app"}>
              <Sidebar/>
              <div className={"content"}>
                  <Routes>
                      <Route path={"/"} element={<Home/>}/>
                      <Route path={"/processing"} element={<Processing/>}/>
                      <Route path={"/reservation-status"} element={<ReservationStatus/>}/>
                      <Route path={"/sales-inquiry"} element={<SalesInquiry/>}/>
                      <Route path={"/store-setting"} element={<StoreSettings/>}/>
                      <Route path={"/close-store"} element={<CloseStore/>}/>
                  </Routes>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
