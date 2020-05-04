import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Env from "../helpers/Env";
import NavigationPanel from "./NavigationPanel";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Constants from "../helpers/Constants";

const primary = red[500]; // #F44336
const accent = purple.A200; // #E040FB

class CreateProjectTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // classes: this.useStyles(),
      isShowCreateProject: true,
      isShowCreateProjectTemplate: false,
      isShowCreateTemplate: false,
      projectTypes: ["Type1", "Type2"],
      coreFunctions: null,
      deptFunctions: null,
      projectName: "",
      projectTemplate: "",
      productionType: null,
      productionTypes: null,
      coreFunctions: null,
      deptFunctions: null,
      companyId: window.sessionStorage.getItem("companyId"),
      templateName: "",
      description: "",
      coreFunIds: [],
      deptFunIds: [],
    };
  }

  // showCreateProjectTemplate = () => {
  //   this.setState({ isShowCreateProject });
  // };

  showProjectCreationForm = () => {
    this.setState({ isShowCreateProject: true });
  };

  showTemplateCreationForm = () => {
    // this.setState({ isShowCreateTemplate: true });
    this.setState({ isShowCreateProject: false });
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

  getProductionTypes() {
    axios
      .get(Env.host + "/project-create/production-types")
      .then((response) => {
        this.setState({
          productionTypes: response.data,
        });
      });
  }

  getCoreFunctions() {
    axios.get(Env.host + "/project-create/core-functions").then((response) => {
      this.setState({
        coreFunctions: response.data,
      });
    });
  }

  getDeptFunctions() {
    axios.get(Env.host + "/project-create/dept-functions").then((response) => {
      this.setState({
        deptFunctions: response.data,
      });
    });
  }

  componentDidMount() {
    this.getProductionTypes();
    this.getCoreFunctions();
    this.getDeptFunctions();
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

  handleOnCoreFunctionsChange = (event, data) => {
    console.log(JSON.stringify(data));
    // let coreFunIds = this.state.coreFunIds;
    // coreFunIds.push(data.id);
    // this.setState({ coreFunIds: coreFunIds });
    this.setState({ coreFunIds: data });
  };

  handleOnDeptFunctionsChange = (event, data) => {
    // let deptFunIds = this.state.deptFunIds;
    // deptFunIds.push(data.id);
    // this.setState({ deptFunIds: deptFunIds });
    this.setState({ deptFunIds: data });
  };

  handleOnChange = async (event) => {
    if (!!event.target.checked) {
      await this.setState({
        [event.target.name]: event.target.checked,
      });
    } else {
      await this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };

  createTemplate = () => {
    const templateData = {
      template: {
        companyId: this.state.companyId,
        templateName: this.state.templateName,
        description: this.state.description,
        productionId: this.state.productionType,
      },
      coreFunIds: this.state.coreFunIds,
      deptFunIds: this.state.deptFunIds,
    };
    axios
      .post(Env.host + "/project-create/template", templateData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const newData = response.data;
        console.log("newData", newData);
      });
  };

  // createTemplate = () => {
  //   const templateData = {
  //     coreFunctions: this.state.coreFunctions,
  //     deptFunctions: this.state.deptFunctions,
  //     templateName: this.state.templateName,
  //     productionType: this.state.productionType,
  //   };
  //   axios
  //     .post(Env.host + "/admin/create-project", projectData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       const newData = response.data;
  //       console.log("newData", newData);
  //     });
  // };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-1">{/* <NavigationPanel /> */}</div>
          <div className="col">
            <section>
              <h3>Create Project Template</h3>
              <CreateTemplateForm
                productionTypes={this.state?.productionTypes}
                handleOnChange={this.handleOnChange}
                coreFunctions={this.state?.coreFunctions}
                handleOnCoreFunctionsChange={this.handleOnCoreFunctionsChange}
                deptFunctions={this.state?.deptFunctions}
                handleOnDeptFunctionsChange={this.handleOnDeptFunctionsChange}
                createTemplate={this.createTemplate}
              />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProjectTemplate;

function CreateTemplateForm(props) {
  return (
    <Form className="create-project-form">
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Template Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Project Name"
          name="templateName"
          onChange={props.handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Describe this template..."
          name="description"
          onChange={props.handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Production Type</Form.Label>
        <Form.Control
          as="select"
          name="productionType"
          onChange={props.handleOnChange}
        >
          {props?.productionTypes?.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <pre></pre>
      <Autocomplete
        multiple
        id="core-functions"
        name="coreFunctions"
        options={!!props?.coreFunctions ? props?.coreFunctions : []}
        getOptionLabel={(each) => each.name}
        onChange={props.handleOnCoreFunctionsChange}
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
        id="dept-functions"
        name="deptFunctions"
        options={!!props?.deptFunctions ? props?.deptFunctions : []}
        getOptionLabel={(each) => each.name}
        onChange={props.handleOnDeptFunctionsChange}
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
        {/* <button
          type="button"
          onClick={props.createTemplate}
          className="btn btn-dark"
        >
          Create Template
        </button> */}
         <Button type="button" variant="outlined" color="primary"
        
          onClick={props.createTemplate}
       
          onClick={props.createTemplate}
        >
          Create Template
        </Button>
      </div>
    </Form>
  );
}
