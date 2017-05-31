'use strict';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/App';
import Admin from './containers/AdminContainer';

render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('main')
);


// render(
//   <Provider store={store}>
//     <Router >
//       <div>
//         <Route exact path="/" component={App} />
//         <Route path="/admin" component={Admin} />
//       </div>
//     </Router>
//   </Provider>,
//     document.getElementById('main')
// );
