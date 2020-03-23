import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import MyProjects from "./components/MyProjects";

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("Routes props: ", JSON.stringify(this.props));
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <Route path="/login" component={Login} />
          <Route path="/my-projects" component={MyProjects} />
        </Router>
      </div>
    );
  }
}

export default Routes;
