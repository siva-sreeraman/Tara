import React from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import * as firebase from "firebase/app";
import { Redirect } from "react-router";

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

import CrewListing from "./components/projectOverview/ProjectContacts";
import CompanyUsers from "./components/CompanyUsers";
import CompanyCostumes from "./components/CompanyCostumes";
import Costume from "./components/projectOverview/CostumePage";
import UserGroups from "./components/projectOverview/UserGroups";
import CompanyLocation from "./components/CompanyLocations";

import Allevents from "./components/Allevents";
import Alltasks from "./components/Alltasks";
import MiniDrawer from "./components/MiniDrawer";

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: window.localStorage.getItem("auth"),
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log("onAuthStateChanged - Login success");
        console.log(JSON.stringify(user));
        await this.setState({ auth: user });
        // this.routeChange("usergroups");
      } else {
        // User is signed out.
        await this.setState({ auth: null });
        console.log("onAuthStateChanged - Signed Out");
        // this.routeChange("login");
      }
    });
  }

  routeChange = (path) => {
    let history = useHistory();
    history.push(path);
  };

  render() {
    let redirectTo = null;
    if (!!this.state?.auth) {
      redirectTo = <Redirect to="/usergroups" />;
    } else {
      redirectTo = <Redirect to="/login" />;
    }

    console.log("Routes props: ", JSON.stringify(this.props));
    return (
      <div>
        <Router>
          {redirectTo}
          {/* {!!this.state.auth ? (
            <Redirect to="/usergroups" />
          ) : (
            <Redirect to="/login" />
          )} */}

          {!!this.state.auth ? <MiniDrawer auth={this.state.auth} /> : ""}
          {/* {redirectTo} */}
          <Route path="/Registration" component={Registration} />
          <Route path="/login" component={Login} />
          {/* <div className="route-container">
            <Route path="/" component={Navbarpage} />
            <Route path="/su-dashboard" component={SuDashboard} />
            
            <Route path="/my-projects" component={MyProjects} />
            <Route path="/admin-dashboard" component={AdminDashboard} />
            <Route path="/project-overview/:id" component={ProjectOverview} />
            <Route path="/company-db" component={CompanyDB} />
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
            <Route path="/usergroups" component={UserGroups} />
            <Route path="/Projectmainpage/:id" component={Projectmainpage} />
            <Route path="/Adminprofilepage" component={Adminprofilepage} />
            <Route path="/ProjectEvent/:id" component={ProjectEvent} />
            <Route path="/ProjectTasks/:id" component={ProjectTasks} />
            <Route path="/contactspage" component={CrewListing} />
            <Route path="/Companyuserspage" component={CompanyUsers} />
            <Route path="/companyCostumes" component={CompanyCostumes} />
            <Route path="/Costumepage" component={Costume} />
            <Route path="/companylocations" component={CompanyLocation} />
            <Route path="/Allevents" component={Allevents} />
            <Route path="/Alltasks" component={Alltasks} />
          </div> */}
        </Router>
      </div>
    );
  }
}

export default Routes;
