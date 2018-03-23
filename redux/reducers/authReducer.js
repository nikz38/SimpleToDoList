import * as types from '../types';
import {
    initialState,
    requestState,
    successState,
    failureState
} from '../helpers/storeStates'

export default function listReducer(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                ...requestState
            }
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                ...successState,
                user: action.payload
            }
        case types.LOGIN_FAILURE:
            return {
                ...state,
                ...failureState,
                error: action.payload.message
            }
        case types.LOGOUT_REQUEST:
            return {
                ...state,
                ...requestState
            }
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                ...successState,
                user: null
            }
        case types.LOGOUT_FAILURE:
            return {
                ...state,
                ...failureState,
                error: action.payload.message
            }
        case types.REGISTER_REQUEST:
            return {
                ...state,
                ...requestState
            }
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                ...successState,
                user: action.payload
            }
        case types.REGISTER_FAILURE:
            return {
                ...state,
                ...failureState,
                error: action.message
            }
        default:
            return state
    }
}
