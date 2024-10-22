import React from 'react';
import './Modal.css'; // Ensure you have the correct styles

const Modal = ({ isOpen, onClose, children, onDownload }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>✖</button>
                {children}
                <div className="modal-footer">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button className="download-button" onClick={onDownload}>Download Cover Letter</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
