import React,{useState,useEffect} from "react";
import "../scss/TopBar.css"

const TopBar = ({status}) => {
    const [currentTime,setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(()=>{
            setCurrentTime(new Date());
        },1000);

        return ()=> clearInterval(timer);
    }, []);

    const formDateTime = (date) =>{
        return date.toLocaleString("ko-KR",{
            year:"numeric",
            month:"numeric",
            day:"numeric",
            hour:"numeric",
            minute:"numeric",
            second:"numeric",
        });
    };

  return(
      <div className={"top-bar"}>
          <div className={"top-bar-content"}>
              <span>할미새</span>
              <span className={`status-indicator ${status === '영업중' ? 'open' : 'closed'}`}>{status}</span>
              <span className={"date-time"}>{formDateTime(currentTime)}</span>
          </div>
      </div>
  )
}

export default TopBar;