import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import MyProjects from "./components/MyProjects";
import AdminDashboard from "./components/AdminDashboard";
import ProjectOverview from "./components/ProjectOverview";
import SuDashboard from "./su/components/su-dashboard";
import CompanyDB from "./components/companyDB";
import Calendar from "./components/Calendar";
import FileUpload from "./components/FileUpload";
import CreateProject from "./components/CreateProject";
import CreateProjectTemplate from "./components/CreateProjectTemplate";
import Documents from "./components/Documents";

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
          <Route path="/company-db" component={CompanyDB} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/file-upload" component={FileUpload} />
          <Route path="/create-project" component={CreateProject} />
          <Route
            path="/create-project-template"
            component={CreateProjectTemplate}
          />
          <Route path="/documents" component={Documents} />
        </Router>
      </div>
    );
  }
}

export default Routes;
