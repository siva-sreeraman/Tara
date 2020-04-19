import { SIGNUP, LOGIN, LOGOUT } from "../actions/types";
import Constants from "../helpers/Constants";

const initialState = {
  signupResponse: {},
  currentUser: JSON.parse(window.localStorage.getItem(Constants.Auth))
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        signupResponse: action.payload
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
