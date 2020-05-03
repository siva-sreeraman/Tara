import React, { Component } from "react";
import axios from "axios";
import "../components/css/projectpage.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";
import { Alert, Card, Button } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import MediaCard from "./ProjectCardView";
// import TabPanel from "./TabPanel";
import Env from "../helpers/Env";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Constants from "../helpers/Constants";

class Projectpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allprojects: [],
    };
  }
  componentDidMount() {
    axios
      .get(Env.host + "/project-create/allprojects")
      .then(async (response) => {
        console.log("response from all projects", response);
        await this.setState({
          allprojects: response.data,
        });
        console.log("all projects", this.state.allprojects);
      });
  }

  render() {
    return (
      <div className="project-view-card d-flex">
        {/* {this.state.allprojects.map((project) => {
          <MediaCard projectName={project.name}></MediaCard>;
        })} */}
        {this.state?.allprojects?.map((project) => (
          <MediaCard projectName={project.name} projectId={project.id} />
        ))}
      </div>
    );
  }
}

export default Projectpage;
