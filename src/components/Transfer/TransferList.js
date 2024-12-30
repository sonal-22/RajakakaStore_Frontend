import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransfers, setPageIndex, fetchAllTransfersForExport } from '../../Actions/Transferaction';
import Navbar from '../NavBar/Navbar';
import FilterComponent from '../Filters/Filters';
import './TransferList.css';
import { saveAs } from 'file-saver';  // Import saveAs for file download
import * as XLSX from 'xlsx';

const TransferList = () => {
    const dispatch = useDispatch();

    // Redux state
    const {
        transfers: productTransfers = [],
        loading,
        error,
        pageIndex,
        totalCount,
        pageSize,
    } = useSelector((state) => state.transferReducer || {});

    // Local state for filters
    const [filters, setFilters] = useState({
        modelNumber: '',
        serialNumber: '',
        startDate: '',
        endDate: '',
        fromStorageId: '',
        toStorageId: '',
        employeeName: '',
        transferDate: '',
        transferTime: '',
    });

    // Fetch data whenever filters, pageIndex, or pageSize change
    useEffect(() => {
        dispatch(getAllTransfers({ ...filters, pageIndex, pageSize }));
    }, [dispatch, filters, pageIndex, pageSize]);

    const handlePageChange = (index) => {
        dispatch(setPageIndex(index));
    };

    const totalPages = Math.ceil(totalCount / pageSize);

    const exportToExcel = async () => {
        try {
            // Fetch all transfers without pagination
            const allTransfers = await dispatch(fetchAllTransfersForExport(filters));

            // Debugging: check if allTransfers has data
            console.log('Transfers to export:', allTransfers);

            if (!allTransfers || allTransfers.length === 0) {
                // If no data is found, simply return
                console.log('No transfers found to export.');
                return; // Return to prevent execution of export logic
            }

            // Convert to Excel format
            const worksheet = XLSX.utils.json_to_sheet(allTransfers.map((transfer) => ({
                'Model Number': transfer.productDto?.modelNumber || 'N/A',
                'Serial Number': transfer.productDto?.serialNumber || 'N/A',
                'Customer Name': transfer.customerDetailsDto?.customerName || 'N/A',
                'Contact Number': transfer.customerDetailsDto?.contactNumber || 'N/A',
                'From Storage': transfer.fromStorageName || 'N/A',
                'To Storage': transfer.toStorageName || 'N/A',
                'Transfer Date': transfer.transferDate || 'N/A',
                'Transfer Time': transfer.transferTime || 'N/A',
            })));

            // Create a new workbook and append the worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Transfers');

            // Write the workbook to an array buffer
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            // Create a Blob from the Excel buffer and trigger the download
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(data, 'Transfers.xlsx');  // This triggers the download of the Excel file
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <FilterComponent
                onSearch={(searchParams) => {
                    // Update filters directly with modelNumber and serialNumber
                    setFilters((prevFilters) => ({
                        ...prevFilters,
                        modelNumber: searchParams.modelNumber || '',
                        serialNumber: searchParams.serialNumber || ''
                    }));
                }}
                onFilter={({ startDate, endDate }) => {
                    // Update filters directly with startDate and endDate
                    setFilters((prevFilters) => ({
                        ...prevFilters,
                        startDate: startDate || '',
                        endDate: endDate || ''
                    }));
                }}
            />
            <div className="order-header">
                <h2>Total Orders: {totalCount}</h2>
                <button className="export-button" onClick={exportToExcel}>
                    Export to Excel
                </button>
            </div>
            <div className="transfer-list-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : productTransfers.length === 0 ? (
                    <p>No transfers found</p>
                ) : (
                    <>
                        <table className="transfer-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Model Number</th>
                                    <th>From Storage</th>
                                    <th>To Storage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productTransfers.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.productDto?.modelNumber || 'N/A'}</td>
                                        <td>{item.fromStorageName || 'N/A'}</td>
                                        <td>{item.toStorageName || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index)}
                                    disabled={pageIndex === index}
                                    className={`pagination-button ${pageIndex === index ? 'active' : ''}`}
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

export default TransferList;
