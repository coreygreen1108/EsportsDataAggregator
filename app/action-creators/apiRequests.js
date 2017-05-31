import {RECEIVE_API_REQUESTS} from '../constants';
import axios from 'axios';

export const receivedAPIRequests = (requestMethods) => ({
  type: RECEIVE_API_REQUESTS,
  requestMethods
});

export const fetchAPIRequests = () => {
  return dispatch => {
    axios.get(`/api/admin/apiRequests`)
    .then(response => {
      dispatch(receivedAPIRequests(response.data));
    })
    .catch(console.error.bind(console));
  };
};
