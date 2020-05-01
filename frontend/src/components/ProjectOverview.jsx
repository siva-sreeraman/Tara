import React from "react";
import { Link } from "react-router-dom";

// import TabPanel from "./TabPanel";
import CrewListing from "./projectOverview/CrewListing";
import Character from "./projectOverview/Character";
import Actors from "./projectOverview/Actors";
import Units from "./projectOverview/Units";
import UserGroups from "./projectOverview/UserGroups";
import ProjectBasic from "./projectOverview/ProjectBasic";
import Documents from "./Documents";

class MyProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCreateProject: true,
      isShowCreateProjectTemplate: false,
      projectTypes: ["Type1", "Type2"],
      view: "",
    };
  }

  // showCreateProjectTemplate = () => {
  //   this.setState({ isShowCreateProject });
  // };

  // handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  renderSwitch = (param) => {
    switch (param) {
      case "crew":
        return <CrewListing />;
      case "actor":
        return <Actors />;
      case "character":
        return <Character />;
      case "unit":
        return <Units />;
      case "userGroup":
        return <UserGroups />;
      case "documents":
        return <Documents />;
      default:
        return <ProjectBasic />;
    }
  };

  render() {
    return (
      // <div className="row">
      //   <h1>Project Overview</h1>
      //   <div className="col-4">
      <article className="app-project-overview">
        <div className="row">
          <div className="col-3">
            <section className="card">
              <nav className="nav-panel card-body">
                {/* <h5>Features</h5> */}
                <button
                  className="btn btn-link btn-logout"
                  onClick={this.handleLogout}
                >
                  Project Details
                </button>
                <button
                  className="btn btn-link btn-logout"
                  onClick={() => {
                    this.setState({ view: "crew" });
                  }}
                >
                  Crew List
                </button>
                <button
                  className="btn btn-link btn-logout"
                  onClick={() => {
                    this.setState({ view: "actor" });
                  }}
                >
                  Actors
                </button>
                <button
                  className="btn btn-link btn-logout"
                  onClick={() => {
                    this.setState({ view: "character" });
                  }}
                >
                  Characters
                </button>
                <button
                  className="btn btn-link btn-logout"
                  onClick={() => {
                    this.setState({ view: "userGroup" });
                  }}
                >
                  User Groups
                </button>
                <button
                  className="btn btn-link btn-logout"
                  onClick={() => {
                    this.setState({ view: "unit" });
                  }}
                >
                  Units
                </button>
                <button
                  className="btn btn-link btn-logout"
                  onClick={() => {
                    this.setState({ view: "documents" });
                  }}
                >
                  Documents
                </button>
                {/* <Link className="btn btn-link btn-logout" to="/documents">
                  Documents
                </Link> */}

                {/* <ul>
                  <li>
                    <button
                      className="btn btn-sm btn-outline-primary btn-logout"
                      onClick={this.handleLogout}
                    >
                      Tasks
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn btn-sm btn-outline-primary btn-logout"
                      onClick={this.handleLogout}
                    >
                      Crew List
                    </button>
                  </li>
                  <li>
                    <Link to="/">User Groups</Link>
                  </li>
                  <li>
                    <Link to="/">Characters</Link>
                  </li>
                  <li>
                    <Link to="/">Locations</Link>
                  </li>
                  <li>
                    <Link to="/">Contumes</Link>
                  </li>
                  <li>
                    <Link to="/">Props</Link>
                  </li>
                  <li>
                    <Link to="/">Files & Documents</Link>
                  </li>
                  <li>
                    <Link to="/">Contracts</Link>
                  </li>
                  <li>
                    <Link to="/">Project Settings</Link>
                  </li>
                </ul> */}
              </nav>
            </section>
          </div>
          <div className="col">
            <section>
              <h3></h3>
              <div className="row">
                <section>{this.renderSwitch(this.state.view)}</section>
              </div>
            </section>
          </div>
        </div>
      </article>
      //   </div>
      //   <div className="col">
      //     Show Something
      //     {/* <CrewListing /> */}
      //   </div>
      // </div>
    );
  }
}

export default MyProjects;
