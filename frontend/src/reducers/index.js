import { combineReducers } from "redux";
import reducers from "./reducers";
import auth from "./auth.reducer";

export default combineReducers({
  schools: reducers,
  auth: auth
});
