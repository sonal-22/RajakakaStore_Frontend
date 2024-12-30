import {
    FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from '../Actions/ForgotPasswordaction'; // Ensure the path is correct

const initialState = {
    users: [],
    loading: false,
    error: null,
};

export const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.filter((user) => user.id !== action.payload),
            };
        case FETCH_USERS_FAILURE:
        case UPDATE_USER_FAILURE:
        case DELETE_USER_FAILURE:
            console.error('Error:', action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
