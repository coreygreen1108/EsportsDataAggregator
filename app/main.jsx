'use strict';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/App';

render(
  <Provider store={store}>
    <Router >
      <Route path="/" component={App} />
    </Router>
  </Provider>,
    document.getElementById('main')
);
