import React from 'react';
import { useDispatch } from 'react-redux';
import Transfer from './Transfer'; // Import the form component
import { transferProducts } from '../../Actions/Transferaction';

const TransferModal = ({ show, onClose, selectedProducts = [] }) => {
    const dispatch = useDispatch();
    const handleSaveTransfer = () => {
        const transferData = {
            toStorageId: document.getElementById('To').value,
            fkProductIds: selectedProducts.map(product => product.id),
            employeeName: document.getElementById('Employee').value,
            transferDate: document.getElementById('date').value,
            transferTime: document.getElementById('time').value,
        };

        dispatch(transferProducts(transferData));
        onClose(); // Close the modal after transfer
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" style={{ backgroundColor: '#ffeb3b' }}>
                        <h5 className="modal-title" style={{ color: '#d32f2f' }}>Transfer</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h6>Selected Products:</h6>
                        <ul>
                            {selectedProducts.map(product => (
                                <li key={product.id}>
                                    {product.modelNumber} - {product.serialNumber}
                                </li>
                            ))}
                        </ul>

                        {/* Render the Transfer form here */}
                        <Transfer />
                    </div>
                    <div className="modal-footer" style={{ backgroundColor: '#ffeb3b' }}>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            style={{ backgroundColor: '#d32f2f', borderColor: '#b71c1c', color: 'white' }}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ backgroundColor: '#d32f2f', borderColor: '#b71c1c' }}
                            onClick={handleSaveTransfer}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransferModal;
