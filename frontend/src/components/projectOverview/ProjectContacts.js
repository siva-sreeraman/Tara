import React from "react";
import axios from "axios";
// import Modal from 'react-bootstrap/Modal';
import { Button, Modal } from "react-bootstrap";
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
import FormControl from "@material-ui/core/FormControl";
import "../css/projectcontacts.css";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import appStyles from "./appStyles.css";
import Env from "../../helpers/Env";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";

const accent = purple.A200; // #E040FB (alternative method)

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#272E42",
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
      textAlign: "center",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const classes = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 600,
    textAlign: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

var usersdata = [];

var dummydata = [];
class CrewListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crewlist: [],
      users: [],
      displaycrewform: false,
      projectid: localStorage.getItem("projectid"),
      show: false,
      usersval: [],
      rolesdata: [],
      selectedrolesdata: [],
      showroles: false,
      curentuserid: 0,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleusers = this.handleusers.bind(this);
    this.handleclosemodal = this.handleclosemodal.bind(this);
    this.handleroleshow = this.handleroleshow.bind(this);
    this.handleroleclose = this.handleroleclose.bind(this);
    this.handlerolechanges = this.handlerolechanges.bind(this);
  }

  handleOnChange() {
    console.log("in crew form handlechange");
    this.setState({
      displaycrewform: true,
    });
  }

  handleroleclose() {
    this.setState({
      showroles: false,
    });
  }

  handlerolechanges() {
    var users = [];
    console.log("user role", this.state.selectedrolesdata);
    console.log("user id", this.state.curentuserid);

    const data = {
      role: this.state.selectedrolesdata,
      userid: this.state.curentuserid,
      project_id: this.state.projectid,
    };

    console.log("inside handleclosedata is ", data);
    axios
      .post(Env.host + "/project-overview/add_rolesto_project", data)
      .then((response) => {
        //  rolesdata = response.data;
      });

    this.setState({
      showroles: false,
    });
  }

  handleroleshow(val, val1, val2, val3, val4) {
    console.log("in handle role show");
    this.setState({
      curentuserid: val,
    });
    console.log(val, val1, val2, val3, val4);
    this.setState({
      rolesdata: [
        {
          val1,
          val2,
          val3,
          val4,
        },
      ],
    });
    dummydata[0] = {
      role: val1 ? val1 : " ",
    };
    dummydata[1] = {
      role: val2 ? val2 : " ",
    };
    dummydata[2] = {
      role: val3 ? val3 : " ",
    };
    dummydata[3] = {
      role: val4 ? val4 : " ",
    };

    console.log("roles data is", dummydata);
    this.setState({
      showroles: true,
    });
  }

  handleusers = (event, values, props) => {
    console.log("in handle on users");
    console.log("the values are", values);
    this.setState(
      {
        usersval: values,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.usersval);
      }
    );
    // this.props.userdetails.roles = values;
  };

  handleroles = (event, values, props) => {
    console.log("in handle on users");
    console.log("the values are", values);
    this.setState(
      {
        selectedrolesdata: values,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.selectedrolesdata);
      }
    );
  };

  handleShow = (e) => {
    this.setState({
      show: true,
    });
  };

  handleClose = (e) => {
    var users = [];
    console.log("size is", this.state.usersval.length);
    console.log("userval are", this.state.usersval);
    for (var i = 0; i < this.state.usersval.length; i++) {
      console.log("inside push");
      users.push(this.state.usersval[i].userid);
    }
    const data = {
      project_id: this.state.projectid,
      usernames: users,
    };

    console.log("inside handleclosedata is ", data);
    axios
      .post(Env.host + "/companydb/assigntoproject", data)
      .then((response) => {
        //  rolesdata = response.data;
      });

    this.setState({
      show: false,
    });
  };

  handleClose = (e) => {
    var users = [];
    console.log("size is", this.state.usersval.length);
    console.log("userval are", this.state.usersval);
    for (var i = 0; i < this.state.usersval.length; i++) {
      console.log("inside push");
      users.push(this.state.usersval[i].userid);
    }
    const data = {
      project_id: this.state.projectid,
      usernames: users,
    };

    console.log("inside handleclosedata is ", data);
    axios
      .post(Env.host + "/companydb/assigntoproject", data)
      .then((response) => {
        //  rolesdata = response.data;
      });

    this.setState({
      show: false,
    });
  };

  handleclosemodal = () => {
    this.setState({
      show: false,
    });
  };

  submitForm() {}

  componentDidMount() {
    axios
      .get(
        Env.host +
          "/project-overview/getcrewlist?projectid=" +
          this.state.projectid
      )
      .then((response) => {
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

    axios.get(Env.host + "/companydb/allusers").then((response) => {
      console.log(response);

      usersdata = response.data;
    });
  }

  render() {
    let modelui = null;
    let rolemodel = null;

    modelui = (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Crew</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl className={classes.formControl}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={usersdata}
              getOptionLabel={(each) => each.name}
              onChange={this.handleusers}
              // defaultValue={this.props?.studentSkills}
              renderInput={(params) => (
                <TextField
                  size="500"
                  {...params}
                  variant="standard"
                  label="Users"
                  placeholder="Enter User"
                  style={{ width: "120px" }}
                />
              )}
            />
            {/* <section className="skills-chips">
            {this.props?.studentSkills?.map(skill => (
              <Chip className="skill-chip" label={skill.skill} />
            ))}
          </section> */}
          </FormControl>
          {/* Enter Role: <TextField>Enter Role</TextField> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleclosemodal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );

    rolemodel = (
      <Modal show={this.state.showroles} onHide={this.handleroleclose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Roles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl className={classes.formControl}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={dummydata}
              getOptionLabel={(each) => each.role}
              onChange={this.handleroles}
              // defaultValue={this.props?.studentSkills}
              renderInput={(params) => (
                <TextField
                  size="500"
                  {...params}
                  variant="standard"
                  label="Roles"
                  placeholder="Enter User"
                  style={{ width: "120px" }}
                />
              )}
            />
            {/* <section className="skills-chips">
            {this.props?.studentSkills?.map(skill => (
              <Chip className="skill-chip" label={skill.skill} />
            ))}
          </section> */}
          </FormControl>
          {/* Enter Role: <TextField>Enter Role</TextField> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleroleclose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handlerolechanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const displayform = this.state.crewlist.map((crew) => {
      return (
        <TableRow>
          <StyledTableCell align="center">{crew.userid}</StyledTableCell>
          <StyledTableCell align="center">{crew.name}</StyledTableCell>
          <StyledTableCell align="center">{crew.phonenumber}</StyledTableCell>
          <StyledTableCell align="center">
            {crew.role}
            <Link
              onClick={(e) =>
                this.handleroleshow(
                  crew.userid,
                  crew.role1,
                  crew.role2,
                  crew.role3,
                  crew.role4
                )
              }
            >
              Add/Edit role
            </Link>
          </StyledTableCell>
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
              <a
                className="btn btn-primary"
                style={{ padding: "10px 30px 10px 30px" }}
                onClick={(e) => this.handleShow(e)}
              >
                <h5>Add Crew</h5>
              </a>{" "}
            </div>
          </div>

          <div class="form-group row" paddingleft>
            <div class="col-lg-2"></div>
            <div class="col-lg-9" style={{ maxwidth: "100%" }}>
              {" "}
              <h2>Contacts</h2>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead style={{ backgroundColor: "#272E42" }}>
                    <TableRow>
                      <StyledTableCell align="center">Crew Id</StyledTableCell>
                      <StyledTableCell align="center"> Name</StyledTableCell>
                      <StyledTableCell align="center">
                        Phone Number
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Add Roles
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{displayform}</TableBody>
                </Table>
              </TableContainer>
              <br></br>
              <div>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableBody>{modelui}</TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableBody>{rolemodel}</TableBody>
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
