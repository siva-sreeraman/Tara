import React from "react";
import axios from "axios";
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
import Env from "../helpers/Env";
// import SimpleMap from "../components/SimpleMap";
// import "./CompanyDB.css";
// import UserCharacter from "./UserCharacter";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class CompanyDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actorcheck: false,
      usercheck: false,
      costumecheck: false,
      locationcheck: false,
      actordetails: [],
      userdetails: [],
      costumedetails: [],
      locationdetails: [],
    };
    this.handleUsers = this.handleUsers.bind(this);
    this.getactors = this.getactors.bind(this);
    this.getlocations = this.getlocations.bind(this);
    this.getusers = this.getusers.bind(this);
    this.getcostumes = this.getcostumes.bind(this);
  }

  componentDidMount() {}
  getusers = () => {
    axios.get(Env.host + "/companydb/allusers").then((response) => {
      console.log(response);

      this.setState({
        userdetails: response.data,
      });
    });
  };
  getactors = () => {
    axios.get(Env.host + "/companydb/allactors").then((response) => {
      console.log(response);

      this.setState({
        actordetails: response.data,
      });
    });
  };
  getlocations = () => {
    axios.get(Env.host + "/companydb/alllocations").then((response) => {
      console.log(response);

      this.setState({
        locationdetails: response.data,
      });
    });
  };
  getcostumes = () => {
    axios.get(Env.host + "/companydb/allcostumes").then((response) => {
      console.log(response);

      this.setState({
        costumedetails: response.data,
      });
    });
  };

  handleUsers = () => {
    this.setState({
      usercheck: !this.state.usercheck,
      costumecheck: false,
      locationcheck: false,
      actorcheck: false,
    });
    this.getusers();
  };
  handleActors = () => {
    this.setState({
      usercheck: false,
      costumecheck: false,
      locationcheck: false,
      actorcheck: !this.state.actorcheck,
    });
    this.getactors();
  };
  handleLocations = () => {
    this.setState({
      usercheck: false,
      costumecheck: false,
      locationcheck: !this.state.locationcheck,
      actorcheck: false,
    });
    this.getlocations();
  };
  handleCostumes = () => {
    this.setState({
      usercheck: false,
      costumecheck: !this.state.costumecheck,
      locationcheck: false,
      actorcheck: false,
    });
    this.getcostumes();
  };

  render() {
    let displaydetails = null;

    if (this.state.usercheck) {
      const formdetails = this.state.userdetails.map((userdetails) => {
        return (
          <TableBody>
            <TableRow>
              <StyledTableCell>{userdetails.name}</StyledTableCell>
              <StyledTableCell>{userdetails.address}</StyledTableCell>
              <StyledTableCell>{userdetails.phonenumber}</StyledTableCell>
              <StyledTableCell>{userdetails.mail}</StyledTableCell>
            </TableRow>
          </TableBody>
        );
      });

      displaydetails = (
        <div>
          <div class="paddingleft15">
            <div class="form-group row" paddingleft>
              <div class="col-lg-12">
                {" "}
                <h2></h2>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>User Name</StyledTableCell>
                        <StyledTableCell>User address</StyledTableCell>
                        <StyledTableCell>Phone Number</StyledTableCell>
                        <StyledTableCell>Mail Id</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {formdetails}
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.actorcheck) {
      const formdetails = this.state.actordetails.map((userdetails) => {
        return (
          <TableBody>
            <TableRow>
              <StyledTableCell>{userdetails.castid}</StyledTableCell>
              <StyledTableCell>{userdetails.name}</StyledTableCell>
              <StyledTableCell>{userdetails.projectid}</StyledTableCell>
            </TableRow>
          </TableBody>
        );
      });
      displaydetails = (
        <div>
          <div class="paddingleft15">
            <div class="form-group row" paddingleft>
              <div class="col-lg-12">
                {" "}
                <h2></h2>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Actor Id</StyledTableCell>
                        <StyledTableCell>Actor Name</StyledTableCell>
                        <StyledTableCell>Project Id</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {formdetails}
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.locationcheck) {
      const formdetails = this.state.locationdetails.map((userdetails) => {
        return (
          <TableBody>
            <TableRow>
              <StyledTableCell>{userdetails.name}</StyledTableCell>
              <StyledTableCell>{userdetails.address}</StyledTableCell>
              <StyledTableCell>{userdetails.longitude}</StyledTableCell>
              <StyledTableCell>{userdetails.latitude}</StyledTableCell>
              <StyledTableCell>
                <Link
                  to="/SimpleMap"
                  longitude={userdetails.longitude}
                  latitude={userdetails.latitude}
                >
                  View Location
                </Link>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        );
      });
      displaydetails = (
        <div>
          <div class="paddingleft15">
            <div class="form-group row" paddingleft>
              <div class="col-lg-12">
                {" "}
                <h2></h2>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Location</StyledTableCell>
                        <StyledTableCell>location address</StyledTableCell>
                        <StyledTableCell>Latitude</StyledTableCell>
                        <StyledTableCell>Longitude</StyledTableCell>
                        <StyledTableCell>Map</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {formdetails}
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.costumecheck) {
      console.log(this.state.formdetails);
      const formdetails = this.state.costumedetails.map((userdetails) => {
        return (
          <TableBody>
            <TableRow>
              <StyledTableCell> {userdetails.costumename}</StyledTableCell>
              <StyledTableCell> {userdetails.source}</StyledTableCell>
              <StyledTableCell> {userdetails.description}</StyledTableCell>
            </TableRow>
          </TableBody>
        );
      });
      displaydetails = (
        <div>
          <div class="paddingleft15">
            <div class="form-group row" paddingleft>
              <div class="col-lg-12">
                {" "}
                <h2></h2>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell> Name</StyledTableCell>
                        <StyledTableCell>Source</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell>image</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {formdetails}
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <button
            class="btn btn-outline-dark mr-1"
            onClick={() => this.handleUsers()}
          >
            Users
          </button>
          <button
            class="btn btn-outline-dark mr-1"
            onClick={() => this.handleActors()}
          >
            Actors
          </button>
          <button
            class="btn btn-outline-dark mr-1"
            onClick={() => this.handleLocations()}
          >
            Locations
          </button>
          <button
            class="btn btn-outline-dark mr-1"
            onClick={() => this.handleCostumes()}
          >
            Costumes
          </button>
        </div>
        <div id="textdisplay" class="tabcontent">
          {displaydetails}
        </div>
      </div>
    );
  }
}

export default CompanyDB;
