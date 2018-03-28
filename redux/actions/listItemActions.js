import {
    GET_LIST_ITEMS_REQUEST,
    GET_LIST_ITEMS_FAILURE,
    GET_LIST_ITEMS_SUCCESS,
    ADD_LIST_ITEM_REQUEST,
    ADD_LIST_ITEM_FAILURE,
    ADD_LIST_ITEM_SUCCESS,
    EDIT_LIST_ITEM_REQUEST,
    EDIT_LIST_ITEM_FAILURE,
    EDIT_LIST_ITEM_SUCCESS,
    DELETE_LIST_ITEM_REQUEST,
    DELETE_LIST_ITEM_FAILURE,
    DELETE_LIST_ITEM_SUCCESS,
    RESET_DELETE_PROPERTY,
    SEARCH_TEXT_REQUEST
} from '../types'

export const getListItemsRequest = payload => ({
    type: GET_LIST_ITEMS_REQUEST,
    payload
})

export const getListItemsSuccess = payload => ({
    type: GET_LIST_ITEMS_SUCCESS,
    payload
})

export const getListItemsFailure = payload => ({
    type: GET_LIST_ITEMS_FAILURE,
    payload
})

export const addListItemRequest = payload => ({
    type: ADD_LIST_ITEM_REQUEST,
    payload
})

export const addListItemSuccess = payload => ({
    type: ADD_LIST_ITEM_SUCCESS,
    payload
})

export const addListItemFailure = payload => ({
    type: ADD_LIST_ITEM_FAILURE,
    payload
})

export const editListItemRequest = payload => ({
    type: EDIT_LIST_ITEM_REQUEST,
    payload
})

export const editListItemSuccess = payload => ({
    type: EDIT_LIST_ITEM_SUCCESS,
    payload
})

export const editListItemFailure = payload => ({
    type: EDIT_LIST_ITEM_FAILURE,
    payload
})

export const deleteListItemRequest = payload => ({
    type: DELETE_LIST_ITEM_REQUEST,
    payload
})

export const deleteListItemSuccess = payload => ({
    type: DELETE_LIST_ITEM_SUCCESS,
    payload
})

export const deleteListItemFailure = payload => ({
    type: DELETE_LIST_ITEM_FAILURE,
    payload
})

export const resetDeleteListItemProperty = payload => ({
    type: RESET_DELETE_PROPERTY,
    payload
})

export const searchTextRequest = payload => ({
    type: SEARCH_TEXT_REQUEST,
    payload
})