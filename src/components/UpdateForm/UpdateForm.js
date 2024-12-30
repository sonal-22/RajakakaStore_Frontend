import React, { useState, useEffect } from 'react';
import './UpdateForm.css';
import { useDispatch, useSelector } from 'react-redux';

export default function UpdateForm({
    initialStore,
    initialModelNumber = '',
    initialSerialNumber = '',
    initialDate = '',
    initialTime = '',
    initialEmployeeName = '',
    onSubmit,
}) {
    const [currentDate, setCurrentDate] = useState(initialDate || new Date().toISOString().split('T')[0]);
    const [currentTime, setCurrentTime] = useState(initialTime || new Date().toTimeString().split(' ')[0].substring(0, 5));
    const [entryStorageId, setEntryStorageId] = useState(initialStore !== undefined ? initialStore : null);
    const [modelNumber, setModelNumber] = useState(initialModelNumber);
    const [serialNumber, setSerialNumber] = useState(initialSerialNumber);
    const [employeeName, setEmployeeName] = useState(initialEmployeeName);
    const dispatch = useDispatch();

    const storagesState = useSelector(state => state.storage || {});
    const { storages = [], loading = false, error = null } = storagesState;

    useEffect(() => {
        if (!initialDate || !initialTime) {
            const now = new Date();
            setCurrentDate(now.toISOString().split('T')[0]);
            setCurrentTime(now.toTimeString().split(' ')[0].substring(0, 5));
        }
    }, [initialDate, initialTime]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            entryStorageId: entryStorageId !== null && !isNaN(entryStorageId) ? Number(entryStorageId) : null,
            modelNumber: modelNumber.trim() === '' ? null : modelNumber,
            serialNumber: serialNumber.trim() === '' ? null : serialNumber,
            currentDate,
            currentTime,
            employeeName: employeeName.trim() === '' ? null : employeeName,
        };

        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const handleStoreChange = (e) => {
        const value = e.target.value;
        setEntryStorageId(Number(value));
    };

    return (
        <div className="update-form-modal">
            <h2 className='title'>Update Stock</h2>
            <form className="form-container" onSubmit={handleSubmit}>

                <div className="form-group center">
                    <label htmlFor="SelectStore">Select Store/Godown</label>
                    <select
                        className="form-control"
                        id="SelectStore"
                        value={entryStorageId}
                        onChange={handleStoreChange}
                        disabled
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
                        <label htmlFor="date" className="form-label">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time" className="form-label">Time</label>
                        <input
                            type="time"
                            className="form-control"
                            id="time"
                            value={currentTime}
                            onChange={(e) => setCurrentTime(e.target.value)}
                            required
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

                <button type="submit" className='btn'>Update Stock</button>
            </form>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
