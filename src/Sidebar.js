import React from "react";
import {Link} from "react-router-dom";
import icon1 from "./assets/power.png";
import icon2 from "./assets/processing.png";
import icon3 from "./assets/reservationstatus.png";
import icon4 from "./assets/sales-inquiry.png";
import icon5 from "./assets/store-setting.png";
import "./Sidebar.css"

const Sidebar = () => {
  return(
      <div className={"sidebar"}>
          <Link to={"/processing"}><img src={icon2} alt={"처리중"}/>처리중</Link>
          <Link to={"/reservation-status"}><img src={icon3} alt={"예약현황"}/>예약현황</Link>
          <Link to={"/sales-inquiry"}><img src={icon4} alt={"매출조회"}/>매출조회</Link>
          <Link to={"/store-setting"}><img src={icon5} alt={"가게설정"}/>가게설정</Link>
          <Link to={"/close-store"}><img src={icon1} alt={"영업종료"}/>영업종료</Link>
      </div>
  )
}

export default Sidebar;