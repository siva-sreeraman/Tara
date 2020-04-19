import {
  STUDENT_SIGNUP,
  LOGIN,
  LOGOUT,
  EMPLOYER_SIGNUP
} from "../actions/types";
import Constants from "../helpers/Constants";

const initialState = {
  studentSignupResponse: {},
  employerSignupResponse: {},
  currentUser: JSON.parse(window.localStorage.getItem(Constants.Auth))
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STUDENT_SIGNUP:
      return {
        ...state,
        studentSignupResponse: action.payload
      };
    case EMPLOYER_SIGNUP:
      return {
        ...state,
        employerSignupResponse: action.payload
      };
    case LOGIN:
      return {
        ...state,
        currentUser: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null
      };
    default:
      return state;
  }
}
