import React, { FC } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

const route: FC = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
        </Switch>
      </HashRouter>
    </div>
  );
};

export default route
