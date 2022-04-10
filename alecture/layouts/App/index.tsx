import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';

const LogIn = loadable(() => import('@pages/DW_Login'));
const SignUp = loadable(() => import('@pages/DW_SignUp'));
const Workspace = loadable(() => import('@layouts/DW_Workspace'));


const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/DW_Workspace" component={Workspace} />
    </Switch>
  );
};

export default App;
