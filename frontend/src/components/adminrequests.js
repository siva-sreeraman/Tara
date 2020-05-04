import React, { Fragment } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// import Modal from 'react-bootstrap/Modal';
import { Modal } from "react-bootstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GroupIcon from "@material-ui/icons/Group";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Env from "../helpers/Env";
import { TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Form, Col } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";

import JwPagination from "jw-react-pagination";

// import SimpleMap from "../components/SimpleMap";
// import "./CompanyDB.css";
// import UserCharacter from "./UserCharacter";

const StyledTableCell = withStyles((theme) => ({}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const classes = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 600,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

const customStyles = {
  li: {
    first: {
      display: "none",
    },
    last: {
      display: "none",
    },
  },
};

var rolesdata = [];
var projectsdata = [];

class AdminRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdetails: [],
      costumedetails: [],
      userrequests: [],
      adminrequests: [],
      roles: [],
      show: false,
      pageOfItems: [],
      showmodal: false,
      name: "",
      source: "",
      description: "",
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.editstatus = this.editstatus.bind(this);
  }

  getpendingrequests = () => {
    var companyid = window.sessionStorage.getItem("companyId");
    console.log(companyid);
    axios
      .get(Env.host + "/admin/pending-requests/" + companyid)
      .then((response) => {
        console.log(response.data["userRequests"]);
        console.log(response.data["adminRequests"]);

        this.setState({
          userrequests: response.data["userRequests"],
          adminrequests: response.data["adminRequests"],
        });
      });
  };

  componentDidMount() {
    console.log("inside componentDidMount");

    this.getpendingrequests();
  }

  onChangePage(pageOfItems) {
    // update local state with new page of items
    this.setState({ pageOfItems });
  }

  editstatus = (e, userdetails) => {
    console.log("in dleete", userdetails);

    const data = {
      uid: userdetails,
    };
    axios.put(Env.host + "/admin/approve-requests", data).then((response) => {
      console.log(response);
    });

    this.getpendingrequests();
  };

  handleModelClose = () => {
    this.setState({
      showmodal: false,
    });
  };

  showCostumeModal = () => {
    this.setState({
      showmodal: true,
    });
  };

  handleCostumes = () => {
    this.getcostumes();
  };

  render() {
    let displaydetails = null;
    let costumemodal = null;

    costumemodal = (
      <Modal show={this.state.showmodal} onHide={this.handleprojectclose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Costume Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Costume Name"
              name="name"
              // onKeyDown={this.onKeyUp}
              onChange={this.handlenamechange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Costume Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Costume Source"
              name="source"
              // onKeyDown={this.onKeyUp}
              onChange={this.handlesourcechange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label> Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Costume Description"
              name="description"
              // onKeyDown={this.onKeyUp}
              onChange={this.handledescriptionchange}
            />
          </Form.Group>
          {/* Enter Role: <TextField>Enter Role</TextField> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleModelClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.SubmitCostumes}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );

    console.log(this.state.formdetails);
    const formdetails = this.state.pageOfItems.map((userdetails) => {
      return (
        <TableBody>
          <TableRow>
            <StyledTableCell> {userdetails.name}</StyledTableCell>
            <StyledTableCell>
              <Link
                className="remove-link-style"
                onClick={(e) => this.editstatus(e, userdetails.uid)}
              >
                <ListItem button key="Groups">
                  <ListItemIcon>
                    <CheckCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="" />
                </ListItem>
              </Link>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      );
    });

    const adminformdetails = this.state.adminrequests.map((userdetails) => {
      return (
        <TableBody>
          <TableRow>
            <StyledTableCell> {userdetails.name}</StyledTableCell>
            <StyledTableCell>
              {/* <Button
                  variant="contained"
                  color="secondary"
                
                >
                 Update Status
                </Button> */}
              <Link
                className="remove-link-style"
                onClick={(e) => this.editstatus(e, userdetails.uid)}
              >
                <ListItem button key="Groups">
                  <ListItemIcon>
                    <CheckCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="" />
                </ListItem>
              </Link>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      );
    });

    displaydetails = (
      <div>
        <div class="paddingleft15">
          <div className="form-group">
            <div className="">
              <div className="form-group d-flex justify-content-between">
                <h2>Pending Requests</h2>

                {/* <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.showCostumeModal}
                >
                 Add New Location
                </Button> */}
              </div>
            </div>
            <br></br>

            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell> Name</StyledTableCell>
                    <StyledTableCell> Update Status </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <h5>User Requests</h5>
                  </TableRow>
                </TableHead>
                {formdetails}
                <TableHead>
                  <TableRow>
                    <h5>Admin Requests</h5>
                  </TableRow>
                </TableHead>
                {adminformdetails}
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <div id="textdisplay" class="tabcontent">
          {displaydetails}
          <div align="center">
            <JwPagination
              items={this.state.userrequests}
              onChangePage={this.onChangePage}
              styles={customStyles}
            />
          </div>
          {costumemodal}
        </div>
      </div>
    );
  }
}

export default AdminRequests;
