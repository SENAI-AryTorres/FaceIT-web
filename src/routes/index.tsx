import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';
import Perfil from '../pages/Perfil';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/perfil" exact component={Perfil} isPrivate/>
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
