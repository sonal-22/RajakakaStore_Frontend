import React, { useState, useEffect } from 'react';
import './AddStock.css';
import Navbar from '../NavBar/Navbar';
import { AddStocks } from '../../Actions/AddStockaction';
import { fetchStorages } from '../../Actions/Storageaction';
import { useDispatch, useSelector } from 'react-redux';

export default function AddStock() {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [store, setStore] = useState('');
    const [modelNumber, setModelNumber] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [isDamaged, setIsDamaged] = useState(false);
    const [formError, setFormError] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const dispatch = useDispatch();
    const storagesState = useSelector(state => state.storage || {});
    const { storages = [], loading = false, error = null } = storagesState;

    useEffect(() => {
        const now = new Date();
        setCurrentDate(now.toISOString().split('T')[0]);
        setCurrentTime(now.toTimeString().split(' ')[0].substring(0, 5));
    }, []);

    useEffect(() => {
        dispatch(fetchStorages());
    }, [dispatch]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Validate form fields
        if (!store || !modelNumber || !serialNumber || !employeeName) {
            setFormError('Please fill out all fields.');
            return;
        }

        setFormError('');
        setShowAlert(true); // Show alert for confirmation
    };

    const handleConfirm = () => {
        setShowAlert(false);
        dispatch(
            AddStocks(store, modelNumber, serialNumber, currentDate, currentTime, employeeName, isDamaged)
        );

        // Clear form inputs
        setStore('');
        setModelNumber('');
        setSerialNumber('');
        setEmployeeName('');
        setIsDamaged(false);
    };

    return (
        <div>
            <Navbar />
            <div className="add-stock-container">
                <h2 className="title">Add Stock</h2>
                <form className="form-container" onSubmit={handleFormSubmit}>
                    <div className="form-group center">
                        <label htmlFor="SelectStore">Select Store/Godown</label>
                        <select
                            className="form-control"
                            id="SelectStore"
                            value={store || ''}
                            onChange={(e) => setStore(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a store/godown</option>
                            {loading ? (
                                <option>Loading...</option>
                            ) : (
                                storages.map((storage) => (
                                    <option key={storage.id} value={storage.id.toString()}>
                                        {storage.storageName}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="ModelNumber">Model Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ModelNumber"
                                value={modelNumber}
                                onChange={(e) => setModelNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="SerialNumber">Serial Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="SerialNumber"
                                value={serialNumber}
                                onChange={(e) => setSerialNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                value={currentDate}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <input
                                type="time"
                                className="form-control"
                                id="time"
                                value={currentTime}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="EmpName">Employee Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="EmpName"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={isDamaged}
                                onChange={(e) => setIsDamaged(e.target.checked)}
                            />
                            Is Damaged
                        </label>
                    </div>

                    {formError && <div className="error-message">{formError}</div>}

                    <button type="submit" className="btn">Add Stock</button>

                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>

            {/* Alert Box */}
            {showAlert && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h4>Confirm Stock Details</h4>
                        <p><strong>Store:</strong> {storages.find(storage => storage.id.toString() === store)?.storageName || 'Not Selected'}</p>
                        <p><strong>Model Number:</strong> {modelNumber}</p>
                        <p><strong>Serial Number:</strong> {serialNumber}</p>
                        <p><strong>Date:</strong> {currentDate}</p>
                        <p><strong>Time:</strong> {currentTime}</p>
                        <p><strong>Employee Name:</strong> {employeeName}</p>
                        <p><strong>Damaged:</strong> {isDamaged ? 'Yes' : 'No'}</p>
                        <div className="popup-buttons">
                            <button onClick={handleConfirm} className="btn confirm-btn">Confirm</button>
                            <button onClick={() => setShowAlert(false)} className="btn cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
