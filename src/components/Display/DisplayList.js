import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDisplayList, setPageIndex, fetchAllDisplayForExport } from '../../Actions/Displayaction';
import Navbar from '../NavBar/Navbar';
import FilterComponent from '../Filters/Filters';
import { saveAs } from 'file-saver'; // For file download
import * as XLSX from 'xlsx'; // For Excel export
import './DisplayList.css';

const DisplayList = () => {
    const dispatch = useDispatch();

    const { products = [], loading, error, pageIndex, totalCount, pageSize } = useSelector(
        (state) => state.DisplayReducer
    );

    const [modelNumber, setModelNumber] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [toStorageId, setToStorageId] = useState(null);
    const [fromStorageId, setFromStorageId] = useState(null);
    const [employeeName, setEmployeeName] = useState('');

    useEffect(() => {
        dispatch(
            fetchDisplayList(
                pageIndex,
                pageSize,
                modelNumber,
                serialNumber,
                startDate,
                endDate,
                toStorageId,
                fromStorageId,
                employeeName
            )
        );
    }, [
        dispatch,
        pageIndex,
        pageSize,
        modelNumber,
        serialNumber,
        startDate,
        endDate,
        toStorageId,
        fromStorageId,
        employeeName,
    ]);

    const handlePageChange = (index) => {
        dispatch(setPageIndex(index));
    };
    const exportDisplayToExcel = async () => {
        try {
            const allDisplays = await fetchAllDisplayForExport(
                modelNumber,
                serialNumber,
                startDate,
                endDate,
                fromStorageId,
                toStorageId
            )();

            if (!allDisplays || allDisplays.length === 0) {
                console.log('No display data found to export.');
                return;
            }

            const worksheet = XLSX.utils.json_to_sheet(allDisplays.map((display) => ({
                'Model Number': display.productDto?.modelNumber || 'N/A',
                'Serial Number': display.productDto?.serialNumber || 'N/A',
                'Displayed In': display.toStorageName || 'N/A',
                'Display Date': display.displayDate ? new Date(display.displayDate).toLocaleDateString() : 'N/A',
                'Employee Name': display.employeeName || 'N/A',
            })));

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Display Data');

            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(data, `Display_Data_${new Date().toISOString()}.xlsx`);
        } catch (error) {
            console.error('Error exporting display data to Excel:', error);
        }
    };




    const handleFilter = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const handleSearch = (model, serial) => {
        setModelNumber(model);
        setSerialNumber(serial);
    };

    const totalPages = Math.ceil(totalCount / pageSize);





    return (
        <div>
            <Navbar />
            <FilterComponent
                onSearch={(searchParams) => {
                    setModelNumber(searchParams.modelNumber);
                    setSerialNumber(searchParams.serialNumber);
                }}
                onFilter={({ startDate, endDate }) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                }}
            />

            <div className="display-header">
                <h2>Total Products: {totalCount}</h2>
                <button className="export-button" onClick={exportDisplayToExcel}>
                    Export to Excel
                </button>

            </div>

            <div className="display-list-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message || 'An error occurred'}</p>
                ) : products.length === 0 ? (
                    <p>No data available</p>
                ) : (
                    <>
                        <table className="display-table">
                            <thead>
                                <tr>
                                    <th>Model Name</th>
                                    <th>Serial Number</th>
                                    <th>Displayed In</th>
                                    <th>Date</th>
                                    <th>Employee Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((display, index) => (
                                    <tr key={index}>
                                        <td>{display.productDto?.modelNumber || 'N/A'}</td>
                                        <td>{display.productDto?.serialNumber || 'N/A'}</td>
                                        <td>{display.toStorageName || 'N/A'}</td>
                                        <td>{display.displayDate ? new Date(display.displayDate).toLocaleDateString() : 'N/A'}</td>
                                        <td>{display.employeeName || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="pagination">
                            {totalPages > 0 &&
                                Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        className={`pagination-button ${pageIndex === index ? 'active' : ''}`}
                                        onClick={() => handlePageChange(index)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DisplayList;
