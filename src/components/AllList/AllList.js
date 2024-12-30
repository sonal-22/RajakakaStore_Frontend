import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPageIndex, updateProduct, fetchAllProductsForExport } from '../../Actions/AllItemsaction';
import Navbar from '../NavBar/Navbar';
import FilterComponent from '../Filters/Filters';
import TransferModal from '../Transfer/modal';
import DisplayModal from '../Display/DisplayModal';
import OrderModal from '../Order/OrderModal';
import UpdateProductForm from '../UpdateForm/UpdateForm';
import Modal from '../UpdateForm/UpdateModal';
import * as XLSX from 'xlsx';
import './AllList.css';

const AllList = () => {
    const dispatch = useDispatch();
    const [activeModal, setActiveModal] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [modelNumber, setModelNumber] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const productsState = useSelector((state) => state.allList);
    const { products, loading, error, pageIndex, totalCount, pageSize } = productsState;

    const totalPages = Math.ceil(totalCount / pageSize);

    useEffect(() => {
        dispatch(fetchProducts(pageIndex, pageSize, modelNumber, serialNumber, startDate, endDate));
    }, [dispatch, pageIndex, pageSize, modelNumber, serialNumber, startDate, endDate]);

    const handlePageChange = (index) => {
        dispatch(setPageIndex(index));
    };

    const handleExport = async () => {
        try {
            const allProducts = await dispatch(fetchAllProductsForExport(modelNumber, serialNumber, startDate, endDate, null));
            const worksheet = XLSX.utils.json_to_sheet(allProducts);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
            XLSX.writeFile(workbook, 'ProductList.xlsx');
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };

    const handleUpdateProduct = (updatedProduct) => {
        const currentDateTime = new Date().toISOString();

        const payload = {
            id: selectedProductId,
            ...updatedProduct,
            date: currentDateTime.split('T')[0],
            time: currentDateTime.split('T')[1].split('.')[0],
            pageIndex,
            pageSize,
            modelNumber,
            serialNumber,
            startDate,
            endDate,
        };

        dispatch(updateProduct(payload));
    };

    const handleModalOpen = (modalType) => {
        if (selectedProducts.length === 0) {
            alert('Please select at least one product.');
        } else {
            setActiveModal(modalType);
        }
    };

    const handleModalClose = () => {
        setActiveModal(null);
    };

    return (
        <div className="all-list-container">
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

            <div className="button-group">
                <button className="btn btn-display" onClick={() => handleModalOpen('Transfer')}>Transfer</button>
                <button className="btn btn-display" onClick={() => handleModalOpen('Display')}>Display</button>
                <button className="btn btn-order" onClick={() => handleModalOpen('Order')}>Order</button>
                <button className="btn btn-export" onClick={handleExport}>Export to Excel</button>
                <button className="wide-button">Total Products: {totalCount}</button>
            </div>

            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}

            {!loading && !error && products.length > 0 && (
                <>
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Serial Number</th>
                                <th>Model Number</th>
                                <th>Employee Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product.id)}
                                            onChange={() =>
                                                setSelectedProducts((prev) =>
                                                    prev.includes(product.id)
                                                        ? prev.filter((id) => id !== product.id)
                                                        : [...prev, product.id]
                                                )
                                            }
                                        />
                                    </td>
                                    <td>{product.serialNumber}</td>
                                    <td>{product.modelNumber}</td>
                                    <td>{product.employeeName}</td>
                                    <td>{product.date}</td>
                                    <td>{product.time}</td>
                                    <td>
                                        <button
                                            className="action-button edit-button"
                                            onClick={() => {
                                                setSelectedProductId(product.id);
                                                setActiveModal('Update');
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="action-button delete-button"
                                            onClick={() => console.log('Delete Product ID:', product.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`pagination-button ${index === pageIndex ? 'active' : ''}`}
                                onClick={() => handlePageChange(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {activeModal === 'Transfer' && (
                <TransferModal
                    show={true}
                    onClose={handleModalClose}
                    selectedProducts={selectedProducts}
                />
            )}

            {activeModal === 'Display' && (
                <DisplayModal
                    show={true}
                    onClose={handleModalClose}
                    selectedProducts={products.filter((p) => selectedProducts.includes(p.id))}
                />
            )}

            {activeModal === 'Order' && (
                <OrderModal
                    show={true}
                    onClose={handleModalClose}
                    selectedProducts={products.filter((p) => selectedProducts.includes(p.id))}
                />
            )}

            {activeModal === 'Update' && selectedProductId && (
                <Modal show={true} onClose={handleModalClose}>
                    <UpdateProductForm
                        initialStore={products.find((p) => p.id === selectedProductId)?.entryStorageId || ''}
                        initialModelNumber={products.find((p) => p.id === selectedProductId)?.modelNumber || ''}
                        initialSerialNumber={products.find((p) => p.id === selectedProductId)?.serialNumber || ''}
                        initialDate={products.find((p) => p.id === selectedProductId)?.date || ''}
                        initialTime={products.find((p) => p.id === selectedProductId)?.time || ''}
                        initialEmployeeName={products.find((p) => p.id === selectedProductId)?.employeeName || ''}
                        onSubmit={handleUpdateProduct}
                    />
                </Modal>
            )}
        </div>
    );
};

export default AllList;
