import axios from 'axios';
import BaseApi from '../URLS/BaseApi';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const SET_PAGE_INDEX = 'SET_PAGE_INDEX';
export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

const BASE_API_URL = `${BaseApi.baseUrl}/product`; // Centralize API URL

// Fetch Products Action
// Fetch Products Action
export const fetchProducts = (
    pageIndex = 0,
    pageSize = 10,
    modelNumber = '',
    serialNumber = '',
    startDate = '',
    endDate = '',
    currentStorageId = '',
    exportAll = false // New parameter
) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    try {
        const response = await axios.post(
            `${BASE_API_URL}/getAllProduct`,

            {
                pageIndex: exportAll ? null : pageIndex, // Set to null for export
                pageSize: exportAll ? null : pageSize,  // Set to null for export
                modelNumber: modelNumber.trim(),
                serialNumber: serialNumber.trim(),
                startDate,
                endDate,
                currentStorageId,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: {
                products: response.data.products || [],
                totalCount: response.data.totalCount || 0,
            },
        });
    } catch (error) {
        dispatch({
            type: FETCH_PRODUCTS_FAILURE,
            payload: error.message,
        });
    }
};


export const fetchAllProductsForExport = (
    modelNumber = '',
    serialNumber = '',
    startDate = '',
    endDate = '',
    currentStorageId = null
) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${BASE_API_URL}/getAllProduct`,
            {
                pageIndex: null, // To fetch all data
                pageSize: null,  // To fetch all data
                modelNumber: modelNumber.trim(),
                serialNumber: serialNumber.trim(),
                startDate,
                endDate,
                currentStorageId,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        return response.data.products || [];
    } catch (error) {
        console.error('Error fetching all products for export:', error);
        return [];
    }
};


// Update Product Action
export const updateProduct = (product) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    try {
        const response = await axios.post(
            `${BASE_API_URL}/updateProduct`, // Adjusted endpoint
            product,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        console.log('Update Product Response:', response.data);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: response.data, // Backend response
        });
    } catch (error) {
        console.error('Error updating product:', error);

        dispatch({
            type: UPDATE_PRODUCT_FAILURE,
            payload: error.message,
        });
    }
};

// Page Index Setter
export const setPageIndex = (pageIndex) => ({
    type: SET_PAGE_INDEX,
    payload: pageIndex,
});
