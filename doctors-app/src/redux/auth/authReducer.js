import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from './actionTypes';

let initState = {
    isLoading: false,
    email: '',
    error: false,
    message: '',
    isAuth: false,
    accessToken: ''
};

const authReducer = (state = initState, { type, payload }) => {
    console.log(payload);
    switch (type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: false
            };

        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                email: payload.auth,
                isLoading: false,
                error: false,
                isAuth: true,
                message: 'SIGNIN Successful!',
                accessToken: payload.accessToken
            };

        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: 'Something went wrong...'
            };
        case LOGOUT_USER:
            console.log(payload);
            return {
                ...state,
                email: '',
                isAuth: false,
                error: false,
                message: 'Logout Successful!',
                city: '',
                Name: '',
                email: ''
            };
        default:
            return state;
    }
};

export default authReducer;
