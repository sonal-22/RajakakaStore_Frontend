import React, { useState, useEffect } from 'react';

export default function Order({ customerName, setCustomerName, billNumber, setBillNumber, employeeName, setEmployeeName }) {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0];
        const formattedTime = now.toTimeString().split(' ')[0].substring(0, 5);

        setCurrentDate(formattedDate);
        setCurrentTime(formattedTime);
    }, []);

    return (
        <div>
            <form className="row g-3">
                <div className="col-6">
                    <label htmlFor="Customer" className="form-label">Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Customer"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div className="col-6">
                    <label htmlFor="Bill" className="form-label">Bill Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Bill"
                        value={billNumber}
                        onChange={(e) => setBillNumber(e.target.value)}
                    />
                </div>
                <div className="col-6">
                    <label htmlFor="Number" className="form-label">Customer Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Number"
                        placeholder=""
                    />
                </div>
                <div className="col-6">
                    <label htmlFor="DisplayEmployee" className="form-label">Employee Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="DisplayEmployee"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                    />
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
            </form>
        </div>
    );
}
