import './OrderList.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderList, setPageIndex, fetchAllOrdersForExport } from '../../Actions/Orderaction';
import Navbar from '../NavBar/Navbar';
import FilterComponent from '../Filters/Filters';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const OrderList = () => {
    const dispatch = useDispatch();
    const { orders = [], pageIndex, totalCount, pageSize } = useSelector((state) => state.OrderReducer);

    const [modelNumber, setModelNumber] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        dispatch(fetchOrderList(pageIndex, pageSize, modelNumber, serialNumber, startDate, endDate));
    }, [dispatch, pageIndex, pageSize, modelNumber, serialNumber, startDate, endDate]);

    const handlePageChange = (index) => {
        dispatch(setPageIndex(index));
    };

    const exportToExcel = async () => {
        try {
            // Ensure that fetchAllOrdersForExport is invoked properly with dispatch
            const allOrders = await dispatch(fetchAllOrdersForExport(
                modelNumber,
                serialNumber,
                startDate,
                endDate
            ));

            console.log('Orders fetched for export:', allOrders); // Debugging log

            if (!allOrders || allOrders.length === 0) {
                console.warn('No orders available for export:', allOrders);
                alert('No data available for export.');
                return;
            }

            const worksheet = XLSX.utils.json_to_sheet(allOrders.map(order => ({
                'Model Number': order.productDto?.modelNumber || 'N/A',
                'Serial Number': order.productDto?.serialNumber || 'N/A',
                'Customer Name': order.customerDetailsDto?.customerName || 'N/A',
                'Contact Number': order.customerDetailsDto?.contactNumber || 'N/A',
                'Bill Number': order.customerDetailsDto?.billNumber || 'N/A',
                'Bill Date': order.billDate ? new Date(order.billDate).toLocaleDateString() : 'N/A',
                'Bill Time': order.billTime ? new Date(`1970-01-01T${order.billTime}`).toLocaleTimeString() : 'N/A',
                'Employee Name': order.productDto?.employeeName || 'N/A',
            })));

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(data, 'Orders.xlsx');
        } catch (error) {
            console.error('Error exporting orders to Excel:', error);
            alert('Failed to export orders. Please try again.');
        }
    };

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div>
            <Navbar />
            <FilterComponent
                onSearch={({ modelNumber, serialNumber }) => {
                    setModelNumber(modelNumber);
                    setSerialNumber(serialNumber);
                }}
                onFilter={({ startDate, endDate }) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                }}
            />
            <div className="order-list-container">
                <div className="order-header">
                    <h2>Total Orders: {totalCount}</h2>
                    <button className="export-button" onClick={exportToExcel}>
                        Export to Excel
                    </button>
                </div>

                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Model Number</th>
                            <th>Serial Number</th>
                            <th>Customer Name</th>
                            <th>Contact Number</th>
                            <th>Bill Number</th>
                            <th>Bill Date</th>
                            <th>Bill Time</th>
                            <th>Employee Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.productDto?.modelNumber || 'N/A'}</td>
                                    <td>{order.productDto?.serialNumber || 'N/A'}</td>
                                    <td>{order.customerDetailsDto?.customerName || 'N/A'}</td>
                                    <td>{order.customerDetailsDto?.contactNumber || 'N/A'}</td>
                                    <td>{order.customerDetailsDto?.billNumber || 'N/A'}</td>
                                    <td>{order.billDate ? new Date(order.billDate).toLocaleDateString() : 'N/A'}</td>
                                    <td>{order.billTime ? new Date(`1970-01-01T${order.billTime}`).toLocaleTimeString() : 'N/A'}</td>
                                    <td>{order.productDto?.employeeName || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="pagination">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={`page-btn ${pageIndex === index ? 'active' : ''}`}
                            onClick={() => handlePageChange(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderList;
