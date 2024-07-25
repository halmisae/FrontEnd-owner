import React from "react";
import ReactDOM from "react-dom";
import "../scss/Modal.css";

const Modal = ({ isOpen, children, onClose }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modals" onClick={onClose}>
            <div className="modals-content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default Modal;
