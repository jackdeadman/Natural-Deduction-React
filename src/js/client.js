import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Proof from './pages/Proof';
import Selection from './pages/Selection';

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
      <Route path='/' component={Selection}/>
      <Route path='/proof' component={Proof}/>
    </Router>
, app);
