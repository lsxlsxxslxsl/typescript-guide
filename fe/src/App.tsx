import React, { FC } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

const route: FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/" exact component={Home}></Route>
      </Switch>
    </HashRouter>
  );
};

export default route;
