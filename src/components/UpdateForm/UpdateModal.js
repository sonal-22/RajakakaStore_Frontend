import React from 'react';
import './UpdateModal.css'; // Ensure this contains modal styles

const Modal = ({ show, onClose, children }) => {
    if (!show) return null; // Only render modal if 'show' is true

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
