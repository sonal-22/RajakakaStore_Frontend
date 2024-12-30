// actions/Displayaction.js

import axios from 'axios';
import BaseApi from '../URLS/BaseApi';

// Action Types
export const DISPLAY_PRODUCTS_REQUEST = 'DISPLAY_PRODUCTS_REQUEST';
export const DISPLAY_PRODUCTS_SUCCESS = 'DISPLAY_PRODUCTS_SUCCESS';
export const DISPLAY_PRODUCTS_FAILURE = 'DISPLAY_PRODUCTS_FAILURE';
export const DISPLAY_LIST_REQUEST = 'DISPLAY_LIST_REQUEST';
export const DISPLAY_LIST_SUCCESS = 'DISPLAY_LIST_SUCCESS';
export const DISPLAY_LIST_FAILURE = 'DISPLAY_LIST_FAILURE';
export const SET_PAGE_INDEX = 'SET_PAGE_INDEX';
const BASE_API_URL = `${BaseApi.baseUrl}/product`; // Centralize API URL

// Fetch Display List
export const fetchDisplayList = (pageIndex = 0, pageSize = 10, modelNumber = '', serialNumber = '', startDate = '', endDate = '', fromStorageId = '', toStorageId = '') => async (dispatch) => {
    dispatch({ type: DISPLAY_LIST_REQUEST });

    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const productDisplayDto = {
            pageIndex,
            pageSize,
            startDate,
            endDate,
            modelNumber,
            serialNumber,
            fromStorageId,
            toStorageId,
        };

        console.log('Sending request with:', productDisplayDto);

        const response = await axios.post(`${BASE_API_URL}/getAllDisplay`, productDisplayDto, config);

        console.log('API Response:', response.data);

        dispatch({
            type: DISPLAY_LIST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);

        dispatch({
            type: DISPLAY_LIST_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};

// Set Page Index Action
export const setPageIndex = (pageIndex) => ({
    type: SET_PAGE_INDEX,
    payload: pageIndex,
});

// Display Products Action
export const DisplayProducts = (DisplayData) => async (dispatch) => {
    dispatch({ type: DISPLAY_PRODUCTS_REQUEST });

    const { toStorageId, fkProductIds, employeeName } = DisplayData;
    const validToStorageId = toStorageId !== null && toStorageId !== undefined ? toStorageId : 0;

    const displayData = {
        toStorageId: validToStorageId,
        fkProductIds,
        employeeName,
    };

    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        console.log('Sending display data:', displayData);

        const response = await axios.post(`${BASE_API_URL}/display`, displayData, config);

        console.log('API Response for Display:', response.data);

        dispatch({
            type: DISPLAY_PRODUCTS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('API Error for Display:', error.response ? error.response.data : error.message);

        dispatch({
            type: DISPLAY_PRODUCTS_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};

export const fetchAllDisplayForExport = (
    modelNumber = '',
    serialNumber = '',
    startDate = '',
    endDate = '',
    fromStorageId = '',
    toStorageId = ''
) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${BASE_API_URL}/getAllDisplay`,
            {
                modelNumber: modelNumber.trim(),
                serialNumber: serialNumber.trim(),
                startDate,
                endDate,
                fromStorageId: null,  // Ensure it's set even if empty
                toStorageId: null,     // Ensure it's set even if empty
                pageIndex: null,                              // Setting to 0 for all data
                pageSize: null,                               // Setting to 0 for fetching all records
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        return response.data.productDisplays || [];
    } catch (error) {
        console.error('Error fetching all displays for export:', error.response?.data || error.message);
        return [];
    }
};

