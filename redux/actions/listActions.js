import {
    ADD_LIST_REQUEST,
    ADD_LIST_FAILURE,
    ADD_LIST_SUCCESS,
    GET_LISTS_REQUEST,
    GET_LISTS_FAILURE,
    GET_LISTS_SUCCESS,
    EDIT_LIST_REQUEST,
    EDIT_LIST_FAILURE,
    EDIT_LIST_SUCCESS,
    DELETE_LIST_REQUEST,
    DELETE_LIST_FAILURE,
    DELETE_LIST_SUCCESS,
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

export const editListRequest = payload => ({
    type: EDIT_LIST_REQUEST,
    payload
})

export const editListSuccess = payload => ({
    type: EDIT_LIST_SUCCESS,
    payload
})

export const editListFailure = payload => ({
    type: EDIT_LIST_FAILURE,
    payload
})

export const deleteListRequest = payload => ({
    type: DELETE_LIST_REQUEST,
    payload
})

export const deleteListSuccess = payload => ({
    type: DELETE_LIST_SUCCESS,
    payload
})

export const deleteListFailure = payload => ({
    type: DELETE_LIST_FAILURE,
    payload
})