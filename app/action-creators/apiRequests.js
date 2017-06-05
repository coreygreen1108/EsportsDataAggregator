import {RECEIVE_API_REQUEST_METHODS, RECEIVE_API_DATA} from '../constants';
import axios from 'axios';

export const receivedAPIRequestMethods = (requestMethods) => ({
  type: RECEIVE_API_REQUEST_METHODS,
  requestMethods
});

export const fetchAPIRequestMethods = () => {
  return dispatch => {
    axios.get(`/api/admin/apiRequests`)
    .then(response => {
      dispatch(receivedAPIRequestMethods(response.data));
    })
    .catch(console.error.bind(console));
  };
};

export const receivedAPIData = (apiData) => ({
  type: RECEIVE_API_DATA,
  apiData
});

export const fetchAPIRequest = (obj, formatObj) => {
   let urlQuery = formatObj.format;
   let urlQueryStr = '';
   urlQuery.forEach(format => {
    let defaultVal = obj[format] || formatObj[format];
    urlQueryStr += `${format}=${defaultVal}&`;
   });
   urlQueryStr = urlQueryStr.slice(0, -1);
   return dispatch => {
    axios.get(`/api/smite/${obj.system}/${obj.method}?${urlQueryStr}`)
    .then(response => {
      dispatch(receivedAPIData(response.data));
    })
    .catch(console.error.bind(console));
  };

};
