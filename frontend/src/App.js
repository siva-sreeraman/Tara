import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
