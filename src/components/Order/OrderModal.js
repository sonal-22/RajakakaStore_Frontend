import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderProducts } from '../../Actions/Orderaction';
import Order from './Order';

const OrderModal = ({ show, onClose, selectedProducts }) => {
    const dispatch = useDispatch();
    const [customerName, setCustomerName] = useState('');
    const [billNumber, setBillNumber] = useState('');
    const [employeeName, setEmployeeName] = useState('');

    const orderState = useSelector((state) => state.order || {});
    const { loading = false, success = false, error = null } = orderState;

    const handleOrderSubmit = () => {
        console.log('Order submit triggered');
        const orderData = {
            customerName,
            billNumber,
            employeeName,
            fkProductIds: selectedProducts.map(product => product.id),
        };
        dispatch(orderProducts(orderData));
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" style={{ backgroundColor: '#ffeb3b' }}>
                        <h5 className="modal-title" style={{ color: '#d32f2f' }}>Order Details</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {error && <p className="error-text">{error}</p>}
                        <Order
                            customerName={customerName}
                            setCustomerName={setCustomerName}
                            billNumber={billNumber}
                            setBillNumber={setBillNumber}
                            employeeName={employeeName}
                            setEmployeeName={setEmployeeName}
                        />
                        <h6>Selected Products:</h6>
                        <ul>
                            {selectedProducts.map((product) => (
                                <li key={product.id}>{product.modelNumber} - {product.serialNumber}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="modal-footer" style={{ backgroundColor: '#ffeb3b' }}>
                        <button type="button" className="btn btn-secondary" onClick={onClose} style={{ backgroundColor: '#d32f2f', color: 'white' }}>Close</button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleOrderSubmit}
                            style={{ backgroundColor: '#d32f2f' }}
                            disabled={loading}
                        >
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
