import {
    ADD_LIST_REQUEST,
    ADD_LIST_FAILURE,
    ADD_LIST_SUCCESS,
    GET_LISTS_REQUEST,
    GET_LISTS_FAILURE,
    GET_LISTS_SUCCESS,
} from '../types'


export const addListRequest = payload => ({
    type: ADD_LIST_REQUEST,
    payload
})

export const addListSuccess = payload => ({
    type: ADD_LIST_SUCCESS,
    payload
})

export const addListFailure = payload => ({
    type: ADD_LIST_FAILURE,
    payload
})

export const getListsRequest = payload => ({
    type: GET_LISTS_REQUEST,
    payload
})

export const getListsSuccess = payload => ({
    type: GET_LISTS_SUCCESS,
    payload
})

export const getListsFailure = payload => ({
    type: GET_LISTS_FAILURE,
    payload
})