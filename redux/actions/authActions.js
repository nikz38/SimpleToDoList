import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
} from '../types'


export const loginRequest = payload => ({
    type: LOGIN_REQUEST,
    payload
})

export const loginSuccess = payload => ({
    type: LOGIN_SUCCESS,
    payload
})

export const loginFailure = payload => ({
    type: LOGIN_FAILURE,
    payload
})

export const logoutRequest = payload => ({
    type: LOGOUT_REQUEST,
    payload
})

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
})

export const logoutFailure = payload => ({
    type: LOGOUT_FAILURE,
    payload
})

export const registerRequest = payload => ({
    type: REGISTER_REQUEST,
    payload
})

export const registerSuccess = payload => ({
    type: REGISTER_SUCCESS,
    payload
})

export const registerFailure = payload => ({
    type: REGISTER_FAILURE,
    payload
})