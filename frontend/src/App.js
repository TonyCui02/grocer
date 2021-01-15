import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import styles from "./App.css";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Browse from "./components/Browse/Browse";

// this section configures the app for firebase authentication
import firebase from "firebase/app";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
  apiKey: "AIzaSyAJeSnfmgSFUyQgnBjRoYtFWESblT8Rm-8",
  authDomain: "grocer-8f20d.firebaseapp.com",
  projectId: "grocer-8f20d",
  storageBucket: "grocer-8f20d.appspot.com",
  messagingSenderId: "883464122018",
  appId: "1:883464122018:web:9f99ae373ff415f48971fb",
  measurementId: "G-SG0CNZTY2L",
});

const auth = firebase.auth();

// the main app function, handles all routes
export default function App() {
  const [user, loading] = useAuthState(auth);

  // custom function, signs user in with their Google account, usage: onClick={signInWithGoogle}
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  // custom function, signs user in with their Facebook account, usage: onClick={signInWithFacebook}
  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider);
  };

  // React hook that only allows logged in users to access PrivateRoutes
  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return user !== null ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          );
        }}
      />
    );
  }

  // if the page is loading, render the loading component
  if (loading) {
    return <div>loading...</div>;
  } else {
    // otherwise render the routes in the app
    console.log(user);
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              {user ? (
                <Dashboard />
              ) : (
                <Login fb={signInWithFacebook} google={signInWithGoogle} />
              )}
            </Route>
            <PrivateRoute path="/browse">
              <Browse />
            </PrivateRoute>
            <Route>
              <div>
                <h1>404 not found</h1>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
