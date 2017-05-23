import {RECEIVE_COMMAND} from '../constants';

export const receiveingCommand = (command) => ({
  type: RECEIVE_COMMAND,
  command
});

