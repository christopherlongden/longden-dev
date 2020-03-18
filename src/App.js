import React, { useState, useEffect } from "react";
import Header from './components/header/header.component';
import Routes from './routes/routes'
import { withRouter } from "react-router-dom";
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);

    }, error => console.log(error));

    console.log("ran useEffect on app")

    return function cleanup() {
      unsubscribeFromAuth();
    }    
  }, [props.currentUser]);

  function handleSignOut() {
    auth.signOut();
    setCurrentUser(null);
  }
  
  return (
    <div className="App">
      <Header currentUser={currentUser} handleSignOut={handleSignOut} />
      <Routes appProps={{currentUser}} />
    </div>
  )
}

export default withRouter(App);