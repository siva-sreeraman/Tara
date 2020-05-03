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
import { Button, Modal } from "react-bootstrap";
import { TextField } from "@material-ui/core";
// import Modal from 'react-bootstrap/Modal';
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Env from "../../helpers/Env";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Form, Col } from "react-bootstrap";

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
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 900,
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
var allcostumes = [];
class Costume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: [],
      projectid: localStorage.getItem("projectid"),
      costumeshow: false,
      selectedcostumes: [],
      showmodal: false,
      name: "",
      source: "",
      description: "",
    };
  }

  componentDidMount() {
    this.getcostumes();

    axios.get(Env.host + "/companydb/allcostumes").then((response) => {
      console.log(response);

      allcostumes = response.data;
    });
  }

  getcostumes = () => {
    axios
      .get(
        Env.host +
          "/project-overview/getprojectcostumes/" +
          this.state.projectid
      )
      .then((response) => {
        console.log(response);

        this.setState({
          character: response.data,
        });
      });
  };

  handleModelClose = () => {
    this.setState({
      showmodal: false,
    });
  };

  SubmitCostumes = () => {
    const data = {
      name: this.state.name,
      source: this.state.source,
      description: this.state.description,
    };
    console.log(data);
    axios
      .post(Env.host + "/companydb/submitnewcostume", data)
      .then((response) => {
        console.log(response);
      });

    this.setState({
      showmodal: false,
    });
    this.getcostumes();
  };

  showCostumeModal = (e) => {
    this.setState({
      costumeshow: true,
    });
  };

  showcreateCostumeModal = (e) => {
    this.setState({
      showmodal: true,
    });
  };

  handlenamechange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handlesourcechange = (e) => {
    this.setState({
      source: e.target.value,
    });
  };

  handledescriptionchange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  handledescriptionchange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleModelClose = () => {
    this.setState({
      costumeshow: false,
    });
  };

  SubmitCreateCostumes = () => {
    const data = {
      name: this.state.name,
      source: this.state.source,
      description: this.state.description,
      projectid: this.state.projectid,
    };
    console.log(data);
    axios
      .post(Env.host + "/companydb/submitnewcostumebyproject/", data)
      .then((response) => {
        console.log(response);
      });

    this.setState({
      showmodal: false,
    });
    this.getcostumes();
  };

  handleCreateModelClose = () => {
    this.setState({
      showmodal: false,
    });
  };

  SubmitCostumes = async () => {
    var temp = [];
    console.log(this.state.selectedcostumes.length);
    this.state.selectedcostumes.forEach(logMapElements);

    function logMapElements(value) {
      console.log(value.costumename);
      if (value.costumeid) {
        temp.push(value.costumeid);
      }
    }
    const data = {
      costumes: temp,
      projectid: this.state.projectid,
    };
    console.log(data.costumes);

    await axios
      .post(Env.host + "/project-overview/addcostumes_toproject", data)
      .then((response) => {
        console.log(response);
      });

    this.setState({
      costumeshow: false,
    });
  };
  handlecostumes = (event, values, props) => {
    console.log("in handle on users");
    console.log("the values are", values);
    this.setState(
      {
        selectedcostumes: values,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.selectedcostumes);
      }
    );
  };

  render() {
    let displaydetails = null;
    let costumecreate = null;

    costumecreate = (
      <Modal show={this.state.showmodal} onHide={this.handleprojectclose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Costumes</Modal.Title>
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
            <Form.Label>Costume Source</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Costume Source"
              name="source"
              // onKeyDown={this.onKeyUp}
              onChange={this.handlesourcechange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Costume Description</Form.Label>
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
          <Button variant="secondary" onClick={this.handleCreateModelClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.SubmitCreateCostumes}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );

    let costumemodal = null;

    costumemodal = (
      <Modal show={this.state.costumeshow} onHide={this.handleprojectclose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Costumes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl className={classes.formControl}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={allcostumes}
              getOptionLabel={(each) => each.costumename}
              onChange={this.handlecostumes}
              // defaultValue={this.props?.studentSkills}
              renderInput={(params) => (
                <TextField
                  size="500"
                  {...params}
                  variant="standard"
                  label="Costumes"
                  placeholder="Enter Costume"
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
          <Button variant="secondary" onClick={this.handleModelClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.SubmitCostumes}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );

    // console.log(this.state.formdetails);
    const formdetails = this.state.character.map((userdetails) => {
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
            <div class="col-lg-12" style={{ maxWidth: "90%" }}>
              {" "}
              <div align="right">
                <button
                  align="right"
                  className="btn btn-outline-primary"
                  onClick={this.showCostumeModal}
                >
                  Add Costume
                </button>

                <button
                  align="right"
                  className="btn btn-outline-primary"
                  onClick={this.showcreateCostumeModal}
                >
                  Add New Costume
                </button>
              </div>
              <br></br>
              <h1>Costumes</h1>
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
    return (
      <div>
        <div id="textdisplay" class="tabcontent">
          {displaydetails}
          {costumemodal}
          {costumecreate}
        </div>
      </div>
    );
  }
}

export default Costume;
