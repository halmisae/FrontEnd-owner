import React,{useState}from "react";
import "../scss/StoreAccording.css"

const StoreAccording = ({title,icon,children,isClickable = true}) =>{
    const [isOpen, setIsOpen] = useState(false);

    const toggleAction  =()=>{
        if (isClickable){
            setIsOpen(!isOpen);
        }
    };

    return(
        <div className={"according"}>
            <button className={"according-title"} onClick={toggleAction}>
                <span className={"icon"}>{icon}</span>
                {title}
            </button>
            {isOpen && <div className={"according-content"}>{children}</div>}
        </div>
    )
};

export default StoreAccording;