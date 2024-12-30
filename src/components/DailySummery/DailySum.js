import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailySummary } from '../../Actions/DailySummeryaction';
import Navbar from '../NavBar/Navbar';
import './DailySum.css';

const DailySummaryComponent = () => {
    const dispatch = useDispatch();

    const dailySummaryState = useSelector((state) => state.dailySummary);
    const { loading, data, error } = dailySummaryState;

    const dailySummaryDto = {
        startDate: '',
        endDate: '',
        serialNumber: '',
        modelNumber: '',
        pageIndex: 0,
        pageSize: 10,
    };

    useEffect(() => {
        dispatch(fetchDailySummary(dailySummaryDto));
    }, [dispatch]);

    if (loading) return <p className="loading-text">Loading...</p>;
    if (error) return <p className="error-text">Error: {error}</p>;

    const { products, productTransfers, productDisplays, orders } = data?.dailySummarys || {};

    return (
        <div className="all-list-container">
            <Navbar />
            <h2 className="summary-title">Daily Summary</h2>

            {/* Products Table */}
            <section>
                <h3 className="table-title">Products</h3>
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Model Number</th>
                            <th>Status</th>
                            <th>Sold</th>
                            <th>Damaged</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, index) => (
                            <tr key={index}>
                                <td>{product.serialNumber || 'N/A'}</td>
                                <td>{product.modelNumber || 'N/A'}</td>
                                <td>{product.status || 'N/A'}</td>
                                <td>{product.isSold ? 'Yes' : 'No'}</td>
                                <td>{product.isDamaged ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Transfers Table */}
            <section>
                <h3 className="table-title">Product Transfers</h3>
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>From Storage</th>
                            <th>To Storage</th>
                            <th>Employee Name</th>
                            <th>Transfer Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productTransfers?.map((transfer, index) => (
                            <tr key={index}>
                                <td>{transfer.fromStorageName || 'N/A'}</td>
                                <td>{transfer.toStorageName || 'N/A'}</td>
                                <td>{transfer.employeeName || 'N/A'}</td>
                                <td>{transfer.transferDate || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Displays Table */}
            <section>
                <h3 className="table-title">Product Displays</h3>
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>From Storage</th>
                            <th>Employee Name</th>
                            <th>Display Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productDisplays?.map((display, index) => (
                            <tr key={index}>
                                <td>{display.fromStorageName || 'N/A'}</td>
                                <td>{display.employeeName || 'N/A'}</td>
                                <td>{display.displayDate || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Orders Table */}
            <section>
                <h3 className="table-title">Orders</h3>
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Bill Number</th>
                            <th>Bill Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) => (
                            <tr key={index}>
                                <td>{order.customerDetailsDto?.customerName || 'N/A'}</td>
                                <td>{order.customerDetailsDto?.billNumber || 'N/A'}</td>
                                <td>{order.billDate || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default DailySummaryComponent;
