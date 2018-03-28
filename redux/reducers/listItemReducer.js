import * as types from '../types';
import {
    initialState,
    requestState,
    successState,
    failureState
} from '../helpers/storeStates'

export default function listItemReducer(state = initialState, action) {
    switch(action.type) {
        case types.GET_LIST_ITEMS_REQUEST:
            return {
                ...state,
                ...requestState
            }
        case types.GET_LIST_ITEMS_SUCCESS:
            return {
                ...state,
                ...successState,
                items: action.payload
            }
        case types.GET_LIST_ITEMS_FAILURE:
            return {
                ...state,
                ...failureState,
                error: action.payload.message
            }
        case types.ADD_LIST_ITEM_REQUEST:
            return {
                ...state,
                ...requestState
            }
        case types.ADD_LIST_ITEM_SUCCESS:
            return {
                ...state,
                ...successState,
                data: action.payload
            }
        case types.ADD_LIST_ITEM_FAILURE:
            return {
                ...state,
                ...failureState,
                error: action.payload.message
            }
        case types.EDIT_LIST_ITEM_REQUEST:
            return {
                ...state,
                ...requestState
            }
        case types.EDIT_LIST_ITEM_SUCCESS:
            return {
                ...state,
                ...successState,
                data: action.payload
            }
        case types.EDIT_LIST_ITEM_FAILURE:
            return {
                ...state,
                ...failureState,
                error: action.payload.message
            }
        case types.DELETE_LIST_ITEM_REQUEST:
            return {
                ...state,
                ...requestState
            }
        case types.DELETE_LIST_ITEM_SUCCESS:
            return {
                ...state,
                ...successState,
                data: action.payload,
                deleteListItemSuccess: true
            }
        case types.DELETE_LIST_ITEM_FAILURE:
            return {
                ...state,
                ...failureState,
                error: action.payload.message
            }
        case types.RESET_DELETE_PROPERTY:
            return {
                ...state,
                deleteListItemSuccess: false
            }
        case types.SEARCH_TEXT_REQUEST:
            return {
                ...state,
                searchText: action.payload.text
            }
        default:
            return state
    }
}
