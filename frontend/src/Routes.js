import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as firebase from "firebase/app";

import Registration from "./components/Registration";
import Login from "./components/Login";
import MiniDrawer from "./components/MiniDrawer";
import AuthBasedRedirect from "./components/AuthBasedRedirect";

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: window.sessionStorage.getItem("auth"),
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log("onAuthStateChanged - Login success");
        console.log(JSON.stringify(user));
        await this.setState({ auth: user });
      } else {
        // User is signed out.
        await this.setState({ auth: null });
        console.log("onAuthStateChanged - Signed Out");
      }
    });
  }

  render() {
    console.log("Routes props: ", JSON.stringify(this.props));
    return (
      <div className="app-routes">
        <Router>
          <AuthBasedRedirect />

          {!!this.state?.auth ? (
            <MiniDrawer
              location={this?.props?.location}
              auth={this.state.auth}
            />
          ) : (
            ""
          )}
          <Route path="/sign-up" component={Registration} />
          <Route path="/login" component={Login} />
        </Router>
      </div>
    );
  }
}

export default Routes;
