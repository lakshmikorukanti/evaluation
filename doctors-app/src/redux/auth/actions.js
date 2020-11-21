import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from './actionTypes';
import axios from 'axios';
export const loginUserRequest = (payload) => ({
    type: LOGIN_USER_REQUEST,
    payload
});

export const loginUserSuccess = (payload) => ({
    type: LOGIN_USER_SUCCESS,
    payload
});

export const loginUserFailure = (payload) => ({
    type: LOGIN_USER_FAILURE,
    payload
});

export const logoutUser = (payload) => ({
    type: LOGOUT_USER,
    payload
});

export const userlogin = (payload) => async (dispatch) => {
    console.log(payload);
    dispatch(loginUserRequest());
    const { email, password } = payload;
    console.log(email, password);

    try {
        let res = await axios({
            method: 'post',
            url: 'http://localhost:5000/user/login',
            data: {
                email,
                password
            }
        });
        console.log(res.data);
        dispatch(loginUserSuccess(res.data));
        return true;
    } catch (err) {
        dispatch(loginUserFailure(err));
        return false;
    }
};
