import {RECEIVE_API_REQUEST_METHODS, RECEIVE_API_DATA} from '../constants';

const initialState = {
  defaultMethodData: null,
   currentData: {}
};

export default function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_API_REQUEST_METHODS:
      newState.defaultMethodData = action.requestMethods;
      break;

    case RECEIVE_API_DATA:
      newState.currentData = action.apiData;
      break;

    default:
      return state;

  }

  return newState;

}
