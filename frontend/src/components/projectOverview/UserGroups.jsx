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
import Env from "../../helpers/Env";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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

class UserGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usergroups: [],
      ugname: "",
      displaycrewform: false,
      sucessmsg: "",
    };
    this.submitForm = this.submitForm.bind(this);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handlenamechange = this.handlenamechange.bind(this);
  }

  handlenamechange(e) {
    console.log("in handle name change");
    console.log("the value is", e.target.value);
    this.setState({
      ugname: e.target.value,
    });
  }

  handleOnChange() {
    console.log("in crew form handlechange");
    this.setState({
      displaycrewform: true,
    });
  }

  componentDidMount() {
    axios.get(Env.host + "/project-overview/getusergroups").then((response) => {
      console.log(response);

      this.setState({
        usergroups: this.state.usergroups.concat(response.data),
      });
    });
  }

  async submitForm(e) {
    const data = {
      ugname: this.state.ugname,
    };
    await axios
      .post(Env.host + "/project-overview/addusergroup", data)
      .then((response) => {
        console.log(response);
        console.log("data", data);
        this.setState({
          usergroups: this.state.usergroups.concat(response.data),
          sucessmsg: response.data,
        });
      });
  }

  render() {
    var ugform;

    if (this.state.displaycrewform) {
      ugform = (
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
              <Form.Label>UserGroup Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Usergroup Name"
                name="ugname"
                // onKeyDown={this.onKeyUp}
                onChange={this.handlenamechange}
              />
            </Form.Group>
          </Form>
          <button
            onClick={this.submitForm}
            className="btn btn-primary btn-login"
          >
            Add UserGroup
          </button>
        </div>
      );
    }

    const displayform = this.state.usergroups.map((crew) => {
      return (
        <TableRow>
          <StyledTableCell>{crew.UserGroupId}</StyledTableCell>

          <StyledTableCell align="right">{crew.UserGroup}</StyledTableCell>
          {/* <StyledTableCell align="right">{crew.is_actor}</StyledTableCell> */}
        </TableRow>
      );
    });
    return (
      <div>
        <div class="paddingleft15">
          <div class="form-group row" paddingleft>
            <div class="col-lg-10"> </div>
            <div class="col-lg-1">
              <a className="btn btn-primary" onClick={this.handleOnChange}>
                Add UserGroup
              </a>{" "}
            </div>
          </div>
          <div>{this.state.sucessmsg}</div>

          <div class="form-group row" paddingleft>
            <div class="col-lg-2"></div>
            <div class="col-lg-9">
              {" "}
              <h2></h2>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>UserGroupId</StyledTableCell>
                      <StyledTableCell>UserGroup</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{displayform}</TableBody>
                </Table>
              </TableContainer>
              <br></br>
              <div>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableBody>{ugform}</TableBody>
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

export default UserGroups;
