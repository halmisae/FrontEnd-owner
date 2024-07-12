import React from "react";
import ReactDOM from "react-dom";
import "../scss/Modal.css"

const Modal = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={"modal"}>
            <div className={"modal-content"}>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}

export default Modal;
