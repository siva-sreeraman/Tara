import React from "react";
import axios from "axios";
import { Form, Col } from "react-bootstrap";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import appStyles from "./appStyles.css";
import Env from "../../helpers/Env";

import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";

const primary = red.A700; // #F44336
const accent = purple.A200; // #E040FB (alternative method)

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: primary,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

class CrewListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crewlist: [],
      users: [],
      displaycrewform: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange() {
    console.log("in crew form handlechange");
    this.setState({
      displaycrewform: true,
    });
  }

  submitForm() {}

  componentDidMount() {
    axios.get(Env.host + "/project-overview/getcrewlist").then((response) => {
      console.log(response);

      this.setState({
        crewlist: this.state.crewlist.concat(response.data),
      });
    });

    axios.get(Env.host + "/project-overview/getusers").then((response) => {
      console.log(response);

      this.setState({
        users: this.state.users.concat(response.data),
      });
    });
  }

  render() {
    const displayform = this.state.crewlist.map((crew) => {
      return (
        <TableRow>
          <StyledTableCell align="right">{crew.crewid}</StyledTableCell>
          <StyledTableCell align="right">{crew.name}</StyledTableCell>
          <StyledTableCell align="right">{crew.phonenumber}</StyledTableCell>
        </TableRow>
      );
    });
    var crewform;
    if (this.state.displaycrewform) {
      crewform = (
        <div className="student-profile-form">
          <Form>
            {/* <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Crew </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={this.handleNameChange}
                    />
                  </Form.Group> */}
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Project Id</Form.Label>
              <Form.Control
                type="select"
                placeholder="password"
                name="actor"
                // onKeyDown={this.onKeyUp}
                onChange={this.handleprojectchange}
              />
            </Form.Group>

            <Form.Group>
              <label>Is an Actor</label>
              <select class="form-control" onSelect={this.handleactorchange}>
                <option>True</option>
                <option>False</option>
              </select>
            </Form.Group>
          </Form>
          <button
            onClick={this.submitForm}
            className="btn btn-primary btn-login"
          >
            Login
          </button>
        </div>
      );
    }

    return (
      <div>
        <div class="paddingleft15">
          <div class="form-group row" paddingleft>
            <div class="col-lg-10"> </div>
            <div class="col-lg-1">
              <a className="btn btn-primary" onClick={this.handleOnChange}>
                Add Crew
              </a>{" "}
            </div>
          </div>

          <div class="form-group row" paddingleft>
            <div class="col-lg-2"></div>
            <div class="col-lg-9" style={{ maxwidth: "100%" }}>
              {" "}
              <h2></h2>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Crew Id</StyledTableCell>
                      <StyledTableCell> Name</StyledTableCell>
                      <StyledTableCell>Phone Number</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{displayform}</TableBody>
                </Table>
              </TableContainer>
              <br></br>
              <div>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableBody>{crewform}</TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CrewListing;
