import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";

import Env from "../helpers/Env";
import Constants from "../helpers/Constants";

import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      persona: "",
      loginFlag: false,
      invalidCredentialsMessage: "",
      redirectToReferrer: false,
      currentUser: null,
      loginFlag: false,
    };
    this.submitForm = this.submitForm.bind(this);
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitForm = async () => {
    const loginData = {
      persona: this.state.persona,
    };
    firebase
      .auth()
      // .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        loginData.uid = res.user.uid;
        axios
          .post(`${Env.host}/auth/login`, loginData)
          .then((loginResponse) => {
            console.log("response::::", loginResponse);
            this.setState({
              loginFlag: true,
            });
            window.localStorage.setItem("auth", JSON.stringify(loginResponse));
          });
        console.log(
          "createUserWithEmailAndPassword res: " + JSON.stringify(res)
        );
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(
          "createUserWithEmailAndPassword error: " + JSON.stringify(error)
        );
      });
  };

  render() {
    let redirectVar = null;
    if (this.state.loginFlag) {
      console.log("Register is:::", this.state.loginFlag);
      redirectVar = <Redirect to="/Projectpage" />;
    }
    return (
      <div style={{ marginTop: "20px", paddingLeft: "150px" }}>
        {redirectVar}
        <div className="login-page">
          <div className="row">
            <div className="col-8">
              <section className="jumbotron">
                <h1>TARA</h1>
                <p>
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups.
                </p>
              </section>
            </div>
            <div className="card login-card">
              <div className="card-body">
                {!this.state.loginFlag ? (
                  <p>{this.state.invalidCredentialsMessage}</p>
                ) : (
                  ""
                )}
                <div className="student-profile-form">
                  <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={this.handleOnChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        // onKeyDown={this.onKeyUp}
                        onChange={this.handleOnChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>I am</Form.Label>
                      <Form.Control
                        as="select"
                        name="persona"
                        onChange={this.handleOnChange}
                      >
                        <option value={Constants.Role.Admin}>Admin</option>
                        <option value={Constants.Role.User}>User</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                  <button
                    onClick={this.submitForm}
                    className="btn btn-primary btn-login"
                  >
                    Login
                  </button>
                  {/* <Link className="btn btn-primary btn-login" to="/">
                  Login
                </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
