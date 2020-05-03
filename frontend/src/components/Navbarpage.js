import React, { Component } from "react";
import "../components/css/projectlandingpage.css";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Row, Col } from "react-bootstrap";
import { Container } from "@material-ui/core";
import Card from "react-bootstrap/Card";
import { Button, Form, FormControl } from "react-bootstrap";
import { Nav, Navbar } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (makeStyles) =>
  createStyles({
    customWidth: {
      minWidth: "100px",
    },
    noMaxWidth: {
      maxWidth: "none",
    },
  });

const styles = {
  tooltip: {
    minWidth: "60px",
    height: "26px",
    borderRadius: "18px",
    boxShadow: "0 20px 80px 0",
    backgroundColor: "black",

    color: "white",
    fontSize: "12px",
    textAlign: "center",
  },
};

class Navbarpage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const classes = useStyles();
    var headers = null;

    const CustomTooltip = withStyles(styles)(Tooltip);

    headers = (
      <ul>
        <CustomTooltip
          title="Home"
          classes={{ tooltip: classes.customWidth }}
          placement="right"
          arrow
        >
          <Link style={{ color: "white" }} to="/Projectpage"></Link>
        </CustomTooltip>
        <br></br>

        <CustomTooltip
          title="Home"
          classes={{ tooltip: classes.customWidth }}
          placement="right"
          arrow
        >
          <Link style={{ color: "white" }} to="/Projectpage">
            <span className="glyphicon glyphicon-briefcase"></span>
          </Link>
        </CustomTooltip>
        <br></br>
        <CustomTooltip
          title="Company Users"
          classes={{ tooltip: classes.customWidth }}
          placement="right"
          arrow
        >
          <Link to="/Companyuserspage">
            <span
              className="glyphicon glyphicon-book"
              style={{ color: "white" }}
            ></span>
          </Link>
        </CustomTooltip>
        <br></br>
        <CustomTooltip
          title="Admin Profile"
          classes={{ tooltip: classes.customWidth }}
          placement="right"
          arrow
        >
          <Link to="/Adminprofilepage">
            <span
              className="glyphicon glyphicon-user"
              style={{ color: "white" }}
            ></span>
          </Link>
        </CustomTooltip>
        <br></br>
        <CustomTooltip
          title="Calendar"
          classes={{ tooltip: classes.customWidth }}
          placement="right"
          arrow
        >
          <Link to="/Admincalenderpage">
            <span
              className="glyphicon glyphicon-calendar"
              style={{ color: "white" }}
            ></span>
          </Link>
        </CustomTooltip>
        <br></br>
        <CustomTooltip
          title="Company Costumes"
          classes={{ tooltip: classes.customWidth }}
          placement="right"
          arrow
        >
          <Link to="/companycostumes">
            <span
              className="glyphicon glyphicon-queen"
              style={{ color: "white" }}
            ></span>
          </Link>
        </CustomTooltip>
        <br></br>
        <CustomTooltip
          title="Location"
          classes={{ tooltip: classes.customWidth }}
          placement="right"
          arrow
        >
          <Link to="/companylocations">
            <span
              className="glyphicon glyphicon-map-marker"
              style={{ color: "white" }}
            ></span>
          </Link>
        </CustomTooltip>
        <br></br>
      </ul>
    );

    return (
      <div class="nav" style={{ paddingLeft: "0px" }}>
        <div
          class="sidebar"
          style={{ "margin-top": "0px", textAlign: "center" }}
        >
          <nav>{headers}</nav>
        </div>
        <div style={{ marginLeft: "10em", width: "100%" }}>
          <Navbar bg="dark" variant="dark" style={{ width: "100%" }}>
            {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
            <h2 style={{ color: "white" }}>TARA</h2>

            <Nav className="mr-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link> */}
              {/* <Nav.Link href="#features">Features</Nav.Link> */}
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default Navbarpage;
