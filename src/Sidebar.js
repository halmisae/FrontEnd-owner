import React from "react";
import {Link} from "react-router-dom";
import "./Sidebar.css"

const Sidebar = () => {
  return(
      <div className={"sidebar"}>
          <Link to={"/processing"}>처리중</Link>
          <Link to={"/reservation-status"}>예약현황</Link>
          <Link to={"/sales-inquiry"}>매출조회</Link>
          <Link to={"/store-setting"}>가게설정</Link>
          <Link to={"/close-store"}>영업종료</Link>
      </div>
  )
}

export default Sidebar;