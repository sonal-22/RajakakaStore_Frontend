import React, { useState, useEffect } from 'react';
import { fetchStorages } from '../../Actions/Storageaction';
import { useDispatch, useSelector } from 'react-redux';

export default function Display() {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [store, setStore] = useState('');
    const dispatch = useDispatch();

    const storagesState = useSelector(state => state.storage || {});
    const { storages = [], loading = false, error = null } = storagesState;

    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0];
        const formattedTime = now.toTimeString().split(' ')[0].substring(0, 5);

        setCurrentDate(formattedDate);
        setCurrentTime(formattedTime);
    }, []);

    useEffect(() => {
        dispatch(fetchStorages());
    }, [dispatch]);

    return (
        <div className="modal-container">
            <form className="form-container">
                <div className="form-group">
                    <label htmlFor="Store" className="form-label">Store Name</label>
                    <select
                        className="form-control"
                        id="SelectStore"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a store/godown</option>
                        {loading ? (
                            <option>Loading...</option>
                        ) : storages.length > 0 ? (
                            storages.map((storage) => (
                                <option key={storage.id} value={storage.id}>
                                    {storage.storageName}
                                </option>
                            ))

                        ) : (
                            <option>No storages available</option>
                        )}
                    </select>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="Displaydate" className="form-label">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="Displaydate"
                            value={currentDate}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Displaytime" className="form-label">Time</label>
                        <input
                            type="time"
                            className="form-control"
                            id="Displaytime"
                            value={currentTime}
                            readOnly
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="DisplayEmployee" className="form-label">Employee Name</label>
                    <input type="text" className="form-control" id="DisplayEmployee" placeholder="Enter employee name" />
                </div>
            </form>
        </div>
    );
}
