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


export const fetchAPIRequest = (obj, queryObj) => {
   // if (queryObj.lengt)
   // let queryStr = '';
   // queryObj.forEach(format => {
   //  queryStr += format
   //  })
   let urlQuery = queryObj.format[0];
   let defaultVal = obj[urlQuery] ? obj[urlQuery] : queryObj[urlQuery];
   // if (!obj[urlQuery])

   return dispatch => {
    axios.get(`/api/smite/${obj.system}/${obj.method}?${urlQuery}=${defaultVal}`)
    .then(response => {
      console.log('res', response, response.data);
      dispatch(receivedAPIData(response.data));
    })
    .catch(console.error.bind(console));
  };

};

// router.get('/:system/:method', (req, res) => {
//   let system = req.params.system;
//   let method = req.params.method;
//   let additionalData = req.query;
//   sessionManager.makeRequest(system, method, 'Json', additionalData)
//   .then(function(info){
//     res.send(info);
//   })
//   .catch(function(err){
//     console.log('ERROR', err);
//   });
// });
