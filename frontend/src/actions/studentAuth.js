import axios from "axios";

import { STUDENT_SIGNUP, LOGIN, EMPLOYER_SIGNUP } from "./types";

import Env from "../helpers/Env";

export const studentSignup = data => dispatch => {
  console.log("before signup");
  return axios
    .post(Env.host + "/student/sign-up", data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log(response);
      return response;
    })
    .then(signupResponse => {
      console.log("student from reducers", signupResponse);
      dispatch({
        type: STUDENT_SIGNUP,
        payload: signupResponse
      });
    });
};

export const employerSignup = data => dispatch => {
  console.log("before employer signup");
  return axios
    .post(Env.host + "/company/sign-up", data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log(response);
      return response;
    })
    .then(signupResponse => {
      console.log("employer from signup action", signupResponse);
      dispatch({
        type: EMPLOYER_SIGNUP,
        payload: signupResponse
      });
    });
};

export const login = data => dispatch => {
  console.log("before signup");
  return axios
    .post(Env.host + "/student/login", data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      // console.log("response from student login axios:", response.data[0].ID);
      console.log("response from student login axios status: ", response.data);
      // console.log("response from student login axios ID: ", response[0].ID);
      return response.data;
    })
    .then(loginResponse => {
      // loginResponse = { ID: 8, role: "student" };
      // loginResponse = { ID: 8, role: "company" };
      console.log("login resposne from actions", loginResponse);
      window.localStorage.setItem("auth", JSON.stringify(loginResponse));
      dispatch({
        type: LOGIN,
        payload: loginResponse
      });
    });
};

export const logout = () => dispatch => {
  return dispatch({
    type: LOGIN,
    payload: null
  });
};
