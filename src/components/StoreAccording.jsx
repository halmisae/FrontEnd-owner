import React,{useState}from "react";
import {useNavigate} from "react-router-dom";
import backIcon from "../assets/back-space.png";
import "../scss/StoreAccording.css";
import PropTypes from "prop-types";

const StoreAccording = ({title,icon,children,isCollapsible, alwaysVisible}) =>{
    const [isOpen, setIsOpen] = useState(alwaysVisible);
    const navigate = useNavigate();

    const toggleAction  =()=>{
        if (isCollapsible){
            setIsOpen(prevState => !prevState);
        }
    };

    const handleGoBack =()=>{
        navigate(-1);
    };

    return(
        <div className={"according"}>
            <button className={"according-title"} onClick={toggleAction}>
                <span className={"icon"}>{icon}</span>
                {title}
                {(alwaysVisible && isCollapsible) && (
                    <img
                        src={backIcon}
                        alt={"뒤로 가기"}
                        className={"back-icon"}
                        onClick={handleGoBack}
                    />
                )}
            </button>
            {(isOpen || alwaysVisible)&& (<div className={"according-content"}>{children}</div>)}
        </div>
    )
};

StoreAccording.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    isCollapsible: PropTypes.bool,
    alwaysVisible: PropTypes.bool,
    children: PropTypes.node,
};

StoreAccording.defaultProps = {
    isCollapsible : false,
    alwaysVisible : false,
    children : null,
};

export default StoreAccording;