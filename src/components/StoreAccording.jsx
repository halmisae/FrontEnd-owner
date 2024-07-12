import React,{useState}from "react";
import "../scss/StoreAccording.css"

const StoreAccording = ({title,icon,children,isCollapsible, alwaysVisible}) =>{
    const [isOpen, setIsOpen] = useState(alwaysVisible);

    const toggleAction  =()=>{
        if (isCollapsible){
            setIsOpen(prevState => !prevState);
        }
    };

    return(
        <div className={"according"}>
            <button className={"according-title"} onClick={toggleAction}>
                <span className={"icon"}>{icon}</span>
                {title}
            </button>
            {(isOpen || alwaysVisible)&& (<div className={"according-content"}>{children}</div>)}
        </div>
    )
};

export default StoreAccording;