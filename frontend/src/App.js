import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import Routes from "./Routes";
import store from "./store";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Provider store={store}>
          <Routes />
        </Provider>
      </div>
    </div>
  );
}

export default App;
