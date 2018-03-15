import {
    ADD_LIST_ITEM_REQUEST,
    ADD_LIST_ITEM_FAILURE,
    ADD_LIST_ITEM_SUCCESS
} from '../types'


export const addListItemRequest = error => ({
    type: ADD_LIST_ITEM_REQUEST
})

export const addListItemSuccess = payload => ({
    type: ADD_LIST_ITEM_SUCCESS,
    payload
})

export const addListItemFailure = payload => ({
    type: ADD_LIST_ITEM_FAILURE,
    payload
})