import {
    TRANSFER_PRODUCTS_REQUEST,
    TRANSFER_PRODUCTS_SUCCESS,
    TRANSFER_PRODUCTS_FAILURE,
    GET_TRANSFERS_REQUEST,
    GET_TRANSFERS_SUCCESS,
    GET_TRANSFERS_FAILURE,
    SET_PAGE_INDEX,
} from '../Actions/Transferaction';

const initialState = {
    transfers: [],
    loading: false,
    error: null,
    pageIndex: 0,
    totalCount: 0,
    pageSize: 10,
    success: false,
};

export const productTransferReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRANSFER_PRODUCTS_REQUEST:
        case GET_TRANSFERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case TRANSFER_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };

        case GET_TRANSFERS_SUCCESS:
            console.log("Reducer Payload:", action.payload); // Debug here
            return {
                ...state,
                loading: false,
                transfers: action.payload.productTransfers || [], // Ensure this matches the API structure
                totalCount: action.payload.totalCount || 0,
            };

        case TRANSFER_PRODUCTS_FAILURE:
        case GET_TRANSFERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case SET_PAGE_INDEX:
            return {
                ...state,
                pageIndex: action.payload,
            };

        default:
            return state;
    }
};
