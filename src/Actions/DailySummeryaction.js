import axios from 'axios';
import BaseApi from '../URLS/BaseApi';

// Action Types
export const FETCH_DAILY_SUMMARY_REQUEST = 'FETCH_DAILY_SUMMARY_REQUEST';
export const FETCH_DAILY_SUMMARY_SUCCESS = 'FETCH_DAILY_SUMMARY_SUCCESS';
export const FETCH_DAILY_SUMMARY_FAILURE = 'FETCH_DAILY_SUMMARY_FAILURE';

// Action Creators
export const fetchDailySummaryRequest = () => {
    return {
        type: FETCH_DAILY_SUMMARY_REQUEST,
    };
};

export const fetchDailySummarySuccess = (data) => {
    return {
        type: FETCH_DAILY_SUMMARY_SUCCESS,
        payload: data,
    };
};

export const fetchDailySummaryFailure = (error) => {
    return {
        type: FETCH_DAILY_SUMMARY_FAILURE,
        payload: error,
    };
};

// Thunk for Fetching Daily Summary
export const fetchDailySummary = (dailySummaryDto) => {
    return (dispatch) => {
        dispatch(fetchDailySummaryRequest());
        axios
            .post(`${BaseApi.baseUrl}/summary/getDailyReport`, dailySummaryDto, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                dispatch(fetchDailySummarySuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchDailySummaryFailure(error.message));
            });
    };
};
