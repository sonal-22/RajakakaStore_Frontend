import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDamagedProducts } from '../../Actions/Damageaction';
import './DamageList.css'; // Import the CSS file for styling
import Navbar from '../NavBar/Navbar';

const DamagedProducts = () => {
    const dispatch = useDispatch();

    // Access state and handle potential undefined state slice
    const { damagedProducts = [], loading, error } = useSelector((state) => state.damagedProducts || {});

    // Define the productDto
    const productDto = {
        pageIndex: 0,
        pageSize: 10,
    };

    // Fetch damaged products on component mount
    useEffect(() => {
        dispatch(getDamagedProducts(productDto));
    }, [dispatch]);

    console.log('Damaged Products from Redux:', damagedProducts);


    return (
        <div className="damaged-products-container">
            <Navbar />

            <h1>Damaged Products</h1>
            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">Error: {error}</p>}
            <table className="damaged-products-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Model Number</th>
                        <th>Employee Name</th>
                    </tr>
                </thead>
                <tbody>
                    {damagedProducts && damagedProducts.length > 0 ? (
                        damagedProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.modelNumber}</td> {/* Adjust based on the data you have */}
                                <td>{product.employeeName}</td> {/* Adjust based on the data you have */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No damaged products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DamagedProducts;
