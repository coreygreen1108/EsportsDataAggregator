import {RECEIVE_API_REQUESTS} from '../constants';

const initialState = {
  defaultMethodData: null
};

export default function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_API_REQUESTS:
      newState.defaultMethodData = action.requestMethods;
      break;

    default:
      return state;

  }

  return newState;

}
