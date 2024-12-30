import React, { useState } from 'react';
import './Filters.css';

const FilterComponent = ({ onSearch, onFilter }) => {
    const [modelNumber, setModelNumber] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSearch = () => {
        onSearch({
            modelNumber: modelNumber.trim(),
            serialNumber: serialNumber.trim(),
        });
    };

    const handleFilter = () => {
        onFilter({
            startDate: startDate || null,
            endDate: endDate || null,
        });
    };

    const handleClearFilters = () => {
        setModelNumber('');
        setSerialNumber('');
        setStartDate('');
        setEndDate('');
        onSearch({ modelNumber: '', serialNumber: '' });
        onFilter({ startDate: null, endDate: null });
    };

    return (
        <div className="filter-container">
            <input
                type="text"
                placeholder="Search by model number"
                value={modelNumber}
                onChange={(e) => setModelNumber(e.target.value)}
                className="search-bar"
            />
            <input
                type="text"
                placeholder="Search by serial number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="search-bar"
            />
            <button onClick={handleSearch} className="search-button">Search</button>

            <div className="date-filter">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="date-input"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="date-input"
                />
                <button onClick={handleFilter} className="filter-button">Filter</button>
            </div>

            <button onClick={handleClearFilters} className="clear-button">Clear Filters</button>
        </div>
    );
};

export default FilterComponent;
