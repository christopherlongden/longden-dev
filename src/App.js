import React, { useState, useEffect } from "react";
import Header from './components/header/header.component';
import Routes from './routes/routes'
import { withRouter } from "react-router-dom";
import { auth } from './firebase/firebase.utils';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    })

    return function cleanup() {
      unsubscribeFromAuth();
      setCurrentUser(null);
    }
  });
  
  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <Routes appProps={{currentUser, setCurrentUser}} />
    </div>
  )
}

export default withRouter(App);