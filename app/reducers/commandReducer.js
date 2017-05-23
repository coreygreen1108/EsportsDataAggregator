import {RECEIVE_COMMAND} from '../constants';

// TODO remove selectedCommand, it is temporary placeholder
const initialState = {
  selectedCommand: ''
};

export default function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_COMMAND:
      newState.selectedCommand = action.command;
      break;

    default:
      return state;

  }

  return newState;

}
