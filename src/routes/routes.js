import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./applied-route";
import SignInPage from '../pages/signinpage/signinpage.component';
import SignUpPage from '../pages/signuppage/signuppage.component';
import HomePage from '../pages/homepage/homepage.component';
import GroupPage from '../pages/grouppage/grouppage.component';
import UserPage from '../pages/userpage/userpage.component';
import NotFound from '../pages/notfoundpage/notfoundpage.component'

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute exact path='/' component={HomePage} appProps={appProps} />
      <AppliedRoute exact path='/signin' component={SignInPage} appProps={appProps} />
      <AppliedRoute exact path='/signup' component={SignUpPage} appProps={appProps} />
      <AppliedRoute exact path='/group/:id' component={GroupPage} appProps={appProps} />
      <AppliedRoute exact path='/user/:id' component={UserPage} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}