import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";

// import TabPanel from "./TabPanel";
import Env from "../helpers/Env";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Constants from "../helpers/Constants";

const primary = red[500]; // #F44336
const accent = purple.A200; // #E040FB
class MyProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // classes: this.useStyles(),
      isShowCreateProject: false,
      isShowCreateProjectTemplate: false,
      isShowCreateTemplate: false,
      projectTypes: ["Type1", "Type2"],
      coreFunctions: null,
      deptFunctions: null,
      projectName: "",
      projectTemplate: "",
      productionType: "",
      productionTypes: "",
      allprojects : []
    };
  }

  // showCreateProjectTemplate = () => {
  //   this.setState({ isShowCreateProject });
  // };

  showProjectCreationForm = () => {
    this.setState({ isShowCreateProject: true });
  };

  showTemplateCreationForm = () => {
    this.setState({ isShowCreateTemplate: true });
  };

  useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 600,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
  }));

  // classes = this.useStyles();

  // handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  handleOnCoreFunctionsChange = (event, data) => {
    this.setState({ CoreFunctions: JSON.stringify(data) });
  };

  handleOnDeptFunctionsChange = (event, data) => {
    this.setState({ CoreFunctions: JSON.stringify(data) });
  };

  handleOnChange = async (event) => {
    await this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount() {
    axios.get(Env.host + "/project-create/product-types").then((response) => {
      console.log("response /project-create/product-types:::", response);

      this.setState({
        productionTypes: this.state.productionTypes.concat(response.data),
      });
      console.log("productionTypes:::", this.state.productionTypes);
    });

    axios.get(Env.host + "/project-create/allprojects").then((response) =>
    {
      console.log("response from all projects",response);
      this.setState({
        allprojects : this.state.allprojects.concat(response.data)
      })
      console.log("all projects",this.state.allprojects);
    }
    )
  }

  createProject = () => {
    const projectData = {
      coreFunctions: this.state.coreFunctions,
      deptFunctions: this.state.deptFunctions,
      projectName: this.state.projectName,
      projectTemplate: this.state.projectTemplate,
      productionType: this.state.productionType,
    };
    axios
      .post(Env.host + "/admin/create-project", projectData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const newData = response.data;
        console.log("newData", newData);
      });
  };

  render() {
   
      let projects = this.state.allprojects.map((project) => {
        return(
                  
                    <ul>
                      <Link className="links" to={"/project-overview/"+ project.id}>
                      {project.name}
                      </Link>
                    </ul>
                  
              )
            }
           )
 return (
      <div>
        <div className="row">
          <div className="col-3">
            <section className="card projects">
              <div className="card-body">
     <section>
    <h5>My Projects</h5>
                {projects}
                </section>
                <section>
                  <h6>Hidden Projects</h6>
                  <ul>
                    <li>
                      <Link to="/project">Project 5</Link>
                    </li>
                    <li>
                      <Link to="/project">Project 6</Link>
                    </li>
                  </ul>
                </section>
                <section>
                  <h5>Features</h5>
                  <ul>
                    <li>
                      <Link to="/project">Address book</Link>
                    </li>
                    <li>
                      <Link to="/project">Actors</Link>
                    </li>
                    <li>
                      <Link to="/project">Search (users)</Link>
                    </li>
                    <li>
                      <Link to="/project">Costumes</Link>
                    </li>
                    <li>
                      <Link to="/project">Props</Link>
                    </li>
                    <li>
                      <Link to="/project">My Notifications</Link>
                    </li>
                    <li>
                      <Link to="/project">My Profile</Link>
                    </li>
                    <li>
                      <Link to="/project">Terms of Use</Link>
                    </li>
                    <li>
                      <Link to="/project">Privacy Agreement</Link>
                    </li>
                  </ul>
                </section>
              </div>
            </section>
          </div>
          <div className="col">
            <section>
              <h3></h3>
              <div className="row">
                <div>
                  <button
                    className="btn btn-outline-dark mr-3"
                    onClick={this.showProjectCreationForm}
                  >
                    create project
                  </button>
                  <button
                    className="btn btn-outline-dark mr-3"
                    onClick={this.showTemplateCreationForm}
                  >
                    create project template
                  </button>
                </div>
                {/* <TabPanel projectTypes={this.state.projectTypes} /> */}
              </div>
              <br />
              <div className="row">
                {!!this.state.isShowCreateProject ? (
                  <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Project Name"
                        name="projectName"
                        onChange={this.handleOnChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Project Template</Form.Label>
                      <Form.Control
                        as="select"
                        name="projectTemplate"
                        onChange={this.handleOnChange}
                      >
                        {Constants.ProjectTypes.map((type) => (
                          <option value={type.value}>{type.value}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Production Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="productionType"
                        onChange={this.handleOnChange}
                      >
                        {Constants.ProjectTypes.map((type) => (
                          <option value={type.value}>{type.value}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={Constants.CoreFunctions}
                      getOptionLabel={(each) => each.value}
                      onChange={this.handleOnCoreFunctionsChange}
                      // onChange={this.handleOnChangeSkills}
                      // defaultValue={this.props?.studentSkills}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Core Functions"
                          placeholder="Enter functions"
                        />
                      )}
                    />{" "}
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={Constants.DeptFunctions}
                      getOptionLabel={(each) => each.value}
                      onChange={this.handleOnDeptFunctionsChange}
                      // onChange={this.handleOnChangeSkills}
                      // defaultValue={this.props?.studentSkills}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Department Functions"
                          placeholder="Enter functions"
                        />
                      )}
                    />
                    <br />
                    <div>
                      <button
                        onClick={this.createProject}
                        className="btn btn-dark"
                      >
                        Create Project
                      </button>
                    </div>
                  </Form>
                ) : (
                  ""
                )}
                {!!this.state.isShowCreateTemplate ? (
                  <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Project Name"
                        name="templateName"
                        onChange={this.handleOnChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Project Name"
                        name="description"
                        onChange={this.handleOnChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Production Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="productionType"
                        onChange={this.handleOnChange}
                      >
                        {Constants.ProjectTypes.map((type) => (
                          <option value={type.value}>{type.value}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={Constants.CoreFunctions}
                      getOptionLabel={(each) => each.value}
                      onChange={this.handleOnCoreFunctionsChange}
                      // onChange={this.handleOnChangeSkills}
                      // defaultValue={this.props?.studentSkills}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Core Functions"
                          placeholder="Enter functions"
                        />
                      )}
                    />{" "}
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={Constants.DeptFunctions}
                      getOptionLabel={(each) => each.value}
                      onChange={this.handleOnDeptFunctionsChange}
                      // onChange={this.handleOnChangeSkills}
                      // defaultValue={this.props?.studentSkills}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Department Functions"
                          placeholder="Enter functions"
                        />
                      )}
                    />
                    <br />
                    <div>
                      <button
                        onClick={this.createProject}
                        className="btn btn-dark"
                      >
                        Create Template
                      </button>
                    </div>
                  </Form>
                ) : (
                  ""
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
                
  }
}

export default MyProjects;
