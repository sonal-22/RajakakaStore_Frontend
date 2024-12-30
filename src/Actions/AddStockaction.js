// Actions/AddStockaction.js
import axios from 'axios';
import BaseApi from '../URLS/BaseApi';

export const AddStock_REQUEST = 'AddStock_REQUEST';
export const AddStock_SUCCESS = 'AddStock_SUCCESS';
export const AddStock_FAILURE = 'AddStock_FAILURE';

export const AddStocks = (entryStorageId, modelNumber, serialNumber, currentDate, currentTime, employeeName, isDamaged) => async (dispatch) => {
    dispatch({ type: AddStock_REQUEST });

    try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
        };

        const response = await axios.post(`${BaseApi.baseUrl}/product/addProduct`, {
            entryStorageId,
            modelNumber,
            serialNumber,
            currentDate,
            currentTime,
            employeeName,
            isDamaged
        }, config);

        dispatch({ type: AddStock_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: AddStock_FAILURE, payload: error.message });
    }
};
