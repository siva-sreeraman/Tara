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
    axios.get(Env.host + "/project-create/allprojects").then((response) => {
      console.log("response from all projects", response);
      this.setState({
        allprojects: response.data,
      });
      console.log("all projects", this.state.allprojects);
    });
  }

  render() {
    let projects = this.state.allprojects.map((project) => {
      return (
        <div
          class="card"
          style={{
            display: "block",
            "border-radius": "4px",
            "margin-top": "20px",
            height: "100px",
          }}
        >
          <div class="col-md-2">
            <div id="container" style={{ marginTop: "10px" }}>
              <div style={{ "font-size": "50px" }} id="name">
                {project.name.charAt(0)}
              </div>
            </div>
          </div>
          <div class="col-md-9" style={{ marginTop: "10px" }}>
            <div style={{ "font-size": "15px", padding: "30px" }}>
              {" "}
              <Link
                to={"/Projectmainpage/" + project.id}
                style={{ color: "black" }}
              >
                {project.name}
              </Link>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div></div>
        <div className="amazon-body container-fluid">
          <div class="row">
            <div style={{ marginRight: "0px" }}>
              <div>
                <Card style={{ width: "30em", height: "7em" }}>
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body style={{ backgroundColor: "pink" }}>
                    <h1>My Projects</h1>
                    <Card.Title align="center"></Card.Title>
                    {/* <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text> */}
                    {/* <Button variant="primary">Go somewhere</Button> */}
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
          <div class="row" style={{}}>
            <div class="col-md-6">{projects}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projectpage;
