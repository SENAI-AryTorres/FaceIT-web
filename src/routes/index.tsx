import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';
import Profile from '../pages/Profile';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Vacancy from '../pages/Vacancy';
import ForgotPassword from '../pages/ForgotPassword';
const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/forgotPassword" exact component={ForgotPassword} />
    <Route path="/profile" exact component={Profile} isPrivate/>
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/vacancy" exact component={Vacancy} isPrivate />
  </Switch>
);

export default Routes;
