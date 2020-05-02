import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import MyProjects from "./components/MyProjects";
import AdminDashboard from "./components/AdminDashboard";
import ProjectOverview from "./components/ProjectOverview";
import SuDashboard from "./su/components/su-dashboard";
import CompanyDB from "./components/companyDB";
// import Calendar from "./components/Calendar";
import FileUpload from "./components/FileUpload";
import CreateProject from "./components/CreateProject";
import CreateProjectTemplate from "./components/CreateProjectTemplate";
import Documents from "./components/Documents";
import Example from "./components/samplepopup";
import Navbarpage from "./components/Navbarpage";
import Eventdetails from "./components/Eventdetails";
import Taskdetails from "./components/Taskdetails";
import Mycalender from "./components/Mycalender";
import Registration from "./components/Registration";
import Projectpage from "./components/Projectpage";
import Projectmainpage from "./components/Projectmainpage";
import Costumepage from "./components/Costumepage";
import Adminprofilepage from "./components/Adminprofilepage";
import ProjectEvent from "./components/ProjectEvent";
import ProjectTasks from "./components/ProjectTasks";

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
          <Navbarpage></Navbarpage>
          <Route path="/Registration" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/my-projects" component={MyProjects} />
          <Route path="/su-dashboard" component={SuDashboard} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/project-overview/:id" component={ProjectOverview} />
          <Route path="/company-db" component={CompanyDB} />
          {/* <Route path="/calendar" component={Calendar} /> */}
          <Route path="/file-upload" component={FileUpload} />
          <Route path="/create-project" component={CreateProject} />
          <Route
            path="/create-project-template"
            component={CreateProjectTemplate}
          />
          <Route path="/documents" component={Documents} />
          <Route path="/samplepopup" component={Example} />
          <Route path="/eventdetails/:id" component={Eventdetails} />
          <Route path="/taskdetails/:id" component={Taskdetails} />
          <Route path="/mycalender" component={Mycalender} />
          <Route path="/navbarpage" component={Navbarpage} />
          <Route path="/Projectpage" component={Projectpage} />
          <Route path="/Projectmainpage/:id" component={Projectmainpage} />
          <Route path="/Costumepage" component={Costumepage} />
          <Route path="/Adminprofilepage" component={Adminprofilepage} />
          <Route path="/ProjectEvent/:id" component={ProjectEvent} />
          <Route path="/ProjectTasks/:id" component={ProjectTasks} />
        </Router>
      </div>
    );
  }
}

export default Routes;
