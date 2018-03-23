import { combineReducers } from 'redux'
import listReducer from './listReducer'
import authReducer from './authReducer'

export default combineReducers({
    listReducer,
    authReducer
});