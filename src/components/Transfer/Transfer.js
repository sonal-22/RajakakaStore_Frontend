import React, { useState, useEffect } from 'react';

export default function Transfer() {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const now = new Date();
        setCurrentDate(now.toISOString().split('T')[0]);
        setCurrentTime(now.toTimeString().split(' ')[0].substring(0, 5));
    }, []);

    return (
        <form className="row g-3">
            <div className="col-md-12">
                <label htmlFor="To" className="form-label">To</label>
                <select id="To" className="form-select">
                    <option defaultValue>Choose...</option>
                    <option>Store1</option>
                    <option>Store2</option>
                    <option>Store3</option>
                </select>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={currentDate}
                        readOnly
                    />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="time" className="form-label">Time</label>
                    <input
                        type="time"
                        className="form-control"
                        id="time"
                        value={currentTime}
                        readOnly
                    />
                </div>
            </div>
            <div className="col-12">
                <label htmlFor="Employee" className="form-label">Employee Name</label>
                <input type="text" className="form-control" id="Employee" placeholder="Enter employee name" />
            </div>
        </form>
    );
}
