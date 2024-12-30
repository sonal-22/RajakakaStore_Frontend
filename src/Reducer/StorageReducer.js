import {
    FETCH_STORAGES_REQUEST,
    FETCH_STORAGES_SUCCESS,
    FETCH_STORAGES_FAILURE,
} from '../Actions/Storageaction';

const initialState = {
    storages: [],
    loading: false,
    error: null,
};

export const storageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STORAGES_REQUEST:
            return { ...state, loading: true };
        case FETCH_STORAGES_SUCCESS:
            return { ...state, loading: false, storages: action.payload };
        case FETCH_STORAGES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
