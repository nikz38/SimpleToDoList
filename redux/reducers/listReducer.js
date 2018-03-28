import * as types from '../types';
import {
    initialState,
    requestState,
    successState,
    failureState
} from '../helpers/storeStates'

export default function listReducer(state = initialState, action) {
    switch(action.type) {
        case types.ADD_LIST_REQUEST:
            return {
                ...state,
                ...requestState
            }
        case types.ADD_LIST_SUCCESS:
            return {
                ...state,
                ...successState,
                data: action.payload
            }
        case types.ADD_LIST_FAILURE:
            return {
                ...state,
                ...failureState,
                error: action.payload.message
            }
        case types.GET_LISTS_REQUEST:
            return {
                ...state,
                ...requestState
            }
        case types.GET_LISTS_SUCCESS:
            return {
                ...state,
                ...successState,
                lists: action.payload
            }
        case types.GET_LISTS_FAILURE:
            return {
                ...state,
                ...failureState,
                error: action.payload.message
            }
        case types.DELETE_LIST_SUCCESS:
            return {
                ...state,
                ...failureState,
                deleteListSuccess: true
            }
        case types.RESET_DELETE_PROPERTY:
            return {
                ...state,
                deleteListSuccess: false
            }
        default:
            return state
    }
}
