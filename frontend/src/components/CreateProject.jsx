import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// import TabPanel from "./TabPanel";
import Env from "../helpers/Env";
import NavigationPanel from "./NavigationPanel";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // classes: this.useStyles(),
      projectTypes: ["Type1", "Type2"],
      coreFunctions: null,
      deptFunctions: null,
      projectName: "",
      description: "",
      projectTemplate: "",
      productionTypeId: "",
      productionTypes: null,
      templates: null,
      templateCoreFunctions: null,
      templateDeptFunctions: null,
      showTemplateFunctions: false,
      companyId: 1,
      selectedTemplate: {},
      thanmai: null,
      templateName: "",
      description: "",
      coreFunIds: [],
      deptFunIds: [],
    };
  }

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

  getTemplates() {
    axios
      .get(Env.host + "/project-create/all-templates/" + this.state.companyId)
      .then((response) => {
        this.setState({
          templates: response.data,
        });
        console.log("templates are::::", this.state.templates);
      });
  }

  getTemplateFunctions(templateId) {
    axios
      .get(Env.host + "/project-create/template-functions/" + templateId)
      .then((response) => {
        this.setState({
          templateCoreFunctions: response.data.coreFunctions,
          templateDeptFunctions: response.data.deptFunctions,
          showTemplateFunctions: true,
        });
        console.log("showTemplateFunctions", this.state.showTemplateFunctions);
      });
  }

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
    this.getTemplates();
  }

  createProject = () => {
    const projectData = {
      coreFunctions: this.state.coreFunctions,
      deptFunctions: this.state.deptFunctions,
      projectName: this.state.projectName,
      projectTemplate: this.state.projectTemplate,
      productionTypeId: this.state.productionTypeId,
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

  getTemplateCoreFunctions(templateId) {
    axios
      .get(Env.host + "/project-create/template-core-functions/" + templateId)
      .then((response) => {
        this.setState({
          templateCoreFunctions: response.data,
        });
        console.log(
          "templateCoreFunctions::::",
          this.state.templateCoreFunctions
        );
      });
  }

  getTemplateDeptFunctions(templateId) {
    axios
      .get(Env.host + "/project-create/template-dept-functions" + templateId)
      .then((response) => {
        this.setState({
          templateDeptFunctions: response.data,
        });
        console.log(
          "templateCoreFunctions::::",
          this.state.templateDeptFunctions
        );
      });
  }

  handleOnChangeTemplate = (event) => {
    console.log("event value::::", JSON.stringify(event.target.value));
    // this.setState({ selectedTemplate: event.target.value });
    this.getTemplateFunctions(event.target.value);
    const slectedTemplate1 = this.state.templates.map(async (template) => {
      console.log(
        "taget.values and template.id are: ",
        event.target.value,
        template.id,
        typeof event.target.value,
        typeof template.id
      );
      if (+event.target.value === template.id) {
        console.log("template", template);
        console.log("template", template.production_id);
        // return template
        this.setState({ productionTypeId: template.production_id });
        // this.setState({ coreFunIds: data });
        console.log("productionTypeId", this.state.productionTypeId);
      }
    });
  };

  handleOnCoreFunctionsChange = async (event, data) => {
    let coreFunIds = this.state.coreFunIds;
    coreFunIds.push(data.id);
    console.log("Core Function IDs Data::::", JSON.stringify(data));
    // let coreFunIds = this.state.coreFunIds;
    // coreFunIds.push(data.id);
    // this.setState({ coreFunIds: coreFunIds });
    await this.setState({ coreFunIds: data });
    console.log("Core Function IDs::::", this.state.coreFunIds);
  };

  handleOnDeptFunctionsChange = async (event, data) => {
    await this.setState({ deptFunIds: data });
    console.log("Core Function IDs::::", this.state.coreFunIds);
  };

  handleOnChange = async (event) => {
    if (!!event.target.checked) {
      await this.setState({
        [event.target.name]: event.target.checked,
      });
    } else {
      console.log(
        "productionTypeId::::::::",
        event.target.name,
        event.target.value
      );
      await this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };

  createProject = async () => {
    let coreFunIds = [],
      deptFunIds = [];
    if (!!this.state?.templateCoreFunctions) {
      const tempCore = this.state?.templateCoreFunctions?.map((fun) => {
        console.log(fun);
        coreFunIds.push(+fun.id);
      });
      const tempDept = this.state?.templateDeptFunctions?.map((fun) => {
        console.log(fun);
        deptFunIds.push(+fun.id);
      });
    } else {
      const tempCore = this.state?.coreFunIds?.map((fun) => {
        console.log(fun);
        coreFunIds.push(+fun.id);
      });
      const tempDept = this.state?.deptFunIds?.map((fun) => {
        console.log(fun);
        deptFunIds.push(+fun.id);
      });
    }

    await this.setState({ coreFunIds: coreFunIds, deptFunIds: deptFunIds });

    const projectData = {
      project: {
        companyId: this.state.companyId,
        projectName: this.state.projectName,
        description: this.state.description,
        productionTypeId: +this.state.productionTypeId,
      },
      coreFunIds: this.state.coreFunIds,
      deptFunIds: this.state.deptFunIds,
    };
    console.log("projectData::::::::", projectData);
    axios
      .post(Env.host + "/project-create/project", projectData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const newData = response;
        console.log("newData", newData);
      });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <NavigationPanel />
          </div>
          <div className="col">
            <section>
              <h3>Create Project</h3>
              <Form className="create-project-form">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Project Name"
                    name="projectName"
                    onChange={this.handleOnChange}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Describe..."
                    name="description"
                    onChange={this.handleOnChange}
                  />
                </Form.Group>
                <FormControl
                  component="fieldset"
                  // className={classes.formControl}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          // checked={createFromTemplate}
                          onChange={this.handleOnChange}
                          name="createFromTemplate"
                        />
                      }
                      label="Create Project from Template"
                    />
                  </FormGroup>
                </FormControl>
                {!!this.state?.createFromTemplate ? (
                  <div>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Project Template</Form.Label>
                      <Form.Control
                        as="select"
                        name="projectTemplate"
                        onChange={this.handleOnChangeTemplate}
                      >
                        {this.state?.templates?.map((type) => (
                          <option
                            key={type.id}
                            value={type.id}
                            name={type.name}
                          >
                            {type.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>
                ) : (
                  <div>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Production Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="productionTypeId"
                        onChange={this.handleOnChange}
                      >
                        {this.state?.productionTypes?.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.type}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Autocomplete
                      multiple
                      id="core-functions"
                      name="coreFunctions"
                      options={
                        !!this.state?.coreFunctions
                          ? this.state?.coreFunctions
                          : []
                      }
                      getOptionLabel={(each) => each.name}
                      onChange={this.handleOnCoreFunctionsChange}
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
                      options={
                        !!this.state?.deptFunctions
                          ? this.state?.deptFunctions
                          : []
                      }
                      getOptionLabel={(each) => each.name}
                      onChange={this.handleOnDeptFunctionsChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Dept Functions"
                          placeholder="Enter functions"
                        />
                      )}
                    />
                  </div>
                )}
                {!!this.state.showTemplateFunctions ? (
                  <div>
                    {/* <div>Production Type: {this.state.}</div> */}
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Core Functions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state?.templateCoreFunctions?.map((fun) => (
                          <tr>
                            <th scope="row">{fun.id}</th>
                            <td>{fun.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Department Functions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state?.templateDeptFunctions?.map((fun) => (
                          <tr>
                            <th scope="row">{fun.id}</th>
                            <td>{fun.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )}
                <br />
                <div>
                  <button
                    type="button"
                    onClick={this.createProject}
                    className="btn btn-dark"
                  >
                    Create Project
                  </button>
                </div>
              </Form>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProject;
