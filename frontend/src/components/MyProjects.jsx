import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";

// import TabPanel from "./TabPanel";
import Env from "../helpers/Env";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Constants from "../helpers/Constants";

// const primary = red[500]; // #F44336
const accent = purple.A200; // #E040FB
class MyProjects extends React.Component {
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
      productionType: "",
      productionTypes: "",
      allprojects: [],
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

    axios.get(Env.host + "/project-create/allprojects").then((response) => {
      console.log("response from all projects", response);
      this.setState({
        allprojects: this.state.allprojects.concat(response.data),
      });
      console.log("all projects", this.state.allprojects);
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
    let deptFunIds = this.state.deptFunIds;
    deptFunIds.push(data.id);
    this.setState({ deptFunIds: deptFunIds });
  };

  handleOnChange = async (event) => {
    await this.setState({
      [event.target.name]: event.target.value,
    });
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
    console.log("templateData:::::", templateData);
  };

  render() {
    let projects = this.state.allprojects.map((project) => {
      return (
        <ul>
          <Link className="links" to={"/project-overview/" + project.id}>
            {project.name}
          </Link>
        </ul>
      );
    });
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <NavigationPanel />
          </div>
          <div className="col">
            <section>
              <h3></h3>
              <Link className="btn btn-outline-primary" to="/create-project">
                Create Project
              </Link>
              <Link
                className="btn btn-outline-primary ml-3"
                to="/create-project-template"
              >
                Create Project Template
              </Link>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default MyProjects;
