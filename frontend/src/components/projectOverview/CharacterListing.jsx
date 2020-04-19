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
    minWidth: 900,
  },
});

class CharacterListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: [],
    };
  }

  componentDidMount() {
    axios
      .get(Env.host + "/project-overview/getcharactertable")
      .then((response) => {
        console.log(response);

        this.setState({
          character: this.state.character.concat(response.data),
        });
      });
  }

  render() {
    const displayform = this.state.character.map((cast) => {
      return (
        <TableRow>
          <StyledTableCell>{cast.characterid}</StyledTableCell>

          <StyledTableCell align="right">{cast.name}</StyledTableCell>
          {/* <StyledTableCell align="right">{cast.phonenumber}</StyledTableCell> */}
        </TableRow>
      );
    });
    return (
      <div>
        <div class="paddingleft15">
          <div class="form-group row" paddingleft>
            <div class="col-lg-10"> </div>
            <div class="col-lg-1">
              <Link to="/" className="btn btn-primary">
                Add Character
              </Link>{" "}
            </div>
          </div>

          <div class="form-group row" paddingleft>
            <div class="col-lg-2"></div>
            <div class="col-lg-9">
              {" "}
              <h2></h2>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>CharacterId</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      {/* <StyledTableCell>PhoneNumber</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>{displayform}</TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterListing;
