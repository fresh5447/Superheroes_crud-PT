import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './App';
import Home from './Home';
import Heroes from './Heros/HeroesContainer';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/home" component={Home}/>
      <Route path="/heroes" component={Heroes} />
    </Route>
  </Router>,
  document.getElementById('root')
);
