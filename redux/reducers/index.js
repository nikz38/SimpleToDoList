import { combineReducers } from 'redux'
import listReducer from './listReducer'
import listItemReducer from './listItemReducer'
import authReducer from './authReducer'

export default combineReducers({
    listReducer,
    listItemReducer,
    authReducer
});