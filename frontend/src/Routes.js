import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import MyProjects from "./components/MyProjects";
import AdminDashboard from "./components/AdminDashboard";
import ProjectOverview from "./components/ProjectOverview";
import SuDashboard from "./su/components/su-dashboard";

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
          <Route path="/su-dashboard" component={SuDashboard} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/project-overview" component={ProjectOverview} />
        </Router>
      </div>
    );
  }
}

export default Routes;
