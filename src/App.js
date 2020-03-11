import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import GroupPage from './pages/grouppage/grouppage.component';
import SignInPage from './pages/signinpage/signinpage.component';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/group/:id' component={GroupPage} />
          <Route exact path='/signin' component={SignInPage} />
        </Switch>
      
    </div>
  );
}

export default App;
