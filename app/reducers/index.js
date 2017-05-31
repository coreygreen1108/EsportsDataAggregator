import {combineReducers} from 'redux';
import commandReducer from './commandReducer';
import apiReducer from './apiReducer';

export default combineReducers({command: commandReducer, apiInfo: apiReducer});
