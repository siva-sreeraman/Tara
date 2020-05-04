import React, { Component } from "react";
import axios from "axios";
import "../components/css/projectmainpage.css";
import { Link } from "react-router-dom";
import ProjectFuncCardView from "./ProjectFunctionCard";
// import red from "@material-ui/core/colors/red";

// import TabPanel from "./TabPanel";
import Env from "../helpers/Env";

class Projectmainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectid: this.props.match.params.id,
      projectdetails: "",
    };
  }
  async componentDidMount() {
    console.log("the project_id is", this.state.projectid);
    sessionStorage.setItem("projectid", this.state.projectid);

    await axios
      .get(
        Env.host +
        "/project-create/project_by_id/?projectid=" +
        this.state.projectid
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          projectdetails: response.data,
        });
      });

    sessionStorage.setItem("projectname", this.state.projectdetails[0].name);
    console.log(sessionStorage.getItem("projectname"));
  }

  render() {
    const projectFunctions = [
      { name: "Contacts", path: "/Contactspage" },
      { name: "User Groups", path: "/usergroups" },
      { name: "My Calender", path: "/Mycalender" },

      { name: "Tasks", path: "/ProjectTasks" },
      { name: "Events", path: "/ProjectEvent" },
      { name: "Costumes", path: "/Costumepage" },
      { name: "Documents", path: "/documents" },
    ];

    return (
      <article>
        <div className="project-functions d-flex flex-wrap">
          {projectFunctions?.map((func) => (
            <ProjectFuncCardView
              projectId={this.state.projectid}
              funcName={func.name}
              funcPath={func.path}
            />
          ))}
        </div>
      </article>
    );
  }
}

export default Projectmainpage;
