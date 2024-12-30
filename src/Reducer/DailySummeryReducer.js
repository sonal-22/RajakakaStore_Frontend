import {
    FETCH_DAILY_SUMMARY_REQUEST,
    FETCH_DAILY_SUMMARY_SUCCESS,
    FETCH_DAILY_SUMMARY_FAILURE,
} from '../Actions/DailySummeryaction';

const initialState = {
    loading: false,
    data: null,
    error: '',
};

const dailySummaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DAILY_SUMMARY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DAILY_SUMMARY_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: '',
            };
        case FETCH_DAILY_SUMMARY_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default dailySummaryReducer;
