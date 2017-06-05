'use strict';
import React from 'react';
import Admin from './AdminContainer';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';

 const App = (props) => (
   <Router >
      <div>
        <Route exact path="/" component={Admin} />
        <Route path="/admin" component={Admin} />
      </div>
    </Router>
  );

export default App;

