import React from "react";
import { Redirect, withRouter } from "react-router";
import * as firebase from "firebase/app";
import axios from "axios";

import Env from "../helpers/Env";
import AuthService from "../auth.service";

class AuthBasedRedirect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

        if (AuthService.isNewUser) {
          this.register(user);
        } else {
          await this.setState({ auth: user });
        }
        // this.routeChange("usergroups");
      } else {
        // User is signed out.
        await this.setState({ auth: null });
        console.log("onAuthStateChanged - Signed Out");
        // this.routeChange("login");
      }
    });
  }

  register = async (user) => {
    await axios
      .post(`${Env.host}/auth/registration`, AuthService.registrationData)
      .then(async (response) => {
        console.log("registration response::::", response);
        AuthService.isNewUser = false;
        await this.setState({ auth: user });
      })
      .catch((err) => {
        console.log("registration err::::", err);
        AuthService.isNewUser = false;
      });
  };

  render() {
    const { from } = this.props?.location?.state || {
      from: { pathname: "/login" },
    };
    console.log("redirectTo from: " + JSON.stringify(from, null, 2));
    let redirectTo = null;
    if (!!this.state?.auth) {
      console.log("redirectTo hard-coded default");
      redirectTo = <Redirect to="/Projectpage" />;
    } else {
      console.log("redirectTo login");
      redirectTo = <Redirect to={from} />;
    }
    return <React.Fragment>{redirectTo}</React.Fragment>;
  }
}

export default withRouter(AuthBasedRedirect);
