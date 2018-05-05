import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import About from '../about';
import Login from '../defaults/Login';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </main>
  </div>
);

export default App;
