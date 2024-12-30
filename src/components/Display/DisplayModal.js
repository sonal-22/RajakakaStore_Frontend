import React from 'react';
import Display from '../Display/Display';
import './Display.css';
import { useDispatch } from 'react-redux';
import { DisplayProducts } from '../../Actions/Displayaction';

const DisplayModal = ({ show, onClose, selectedProducts, store }) => {
    const dispatch = useDispatch();

    const handleSaveDisplay = () => {
        if (!selectedProducts || selectedProducts.length === 0) {
            console.error("No products selected.");
            return;
        }

        const DisplayData = {
            toStorageId: store || '',
            fkProductIds: selectedProducts.map(product => product.id),
            employeeName: selectedProducts[0]?.employeeName || ''
        };

        dispatch(DisplayProducts(DisplayData));
        onClose();
    };




    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" style={{ backgroundColor: '#ffeb3b' }}>
                        <h5 className="modal-title" style={{ color: '#d32f2f' }}>Display</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Display />
                    </div>
                    <div className="modal-footer" style={{ backgroundColor: '#ffeb3b' }}>
                        <button type="button" className="btn btn-secondary" onClick={onClose} style={{ backgroundColor: '#d32f2f', borderColor: '#b71c1c', color: 'white' }}>Close</button>
                        <button type="button" onClick={handleSaveDisplay} className="btn btn-primary" style={{ backgroundColor: '#d32f2f', borderColor: '#b71c1c' }}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayModal;
