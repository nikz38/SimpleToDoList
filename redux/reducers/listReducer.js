import * as types from '../types';
import {
    initialState,
    requestState,
    successState,
    failureState
} from '../helpers/storeStates'

export default function listReducer(state = initialState, action) {
    switch(action.type) {
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
                error: action.payload
            }
        default:
            return state
    }
}
