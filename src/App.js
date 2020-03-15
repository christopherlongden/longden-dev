import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import GroupPage from './pages/grouppage/grouppage.component';
import SignInPage from './pages/signinpage/signinpage.component';
import SignUpPage from './pages/signuppage/signuppage.component';

import { auth } from './firebase/firebase.utils';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      // console.log("Firebase User: ", user);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
    
  render() {
    return (
      <div className="App">
          <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/group/:id' component={GroupPage} />
            <Route exact path='/signin' component={SignInPage} />
            <Route exact path='/signup' component={SignUpPage} />
          </Switch>
        
      </div>
    );
  }

}

export default App;
