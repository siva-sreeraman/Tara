import React from "react";
import { Link } from "react-router-dom";

import TabPanel from "./TabPanel";

class MyProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCreateProject: true,
      isShowCreateProjectTemplate: false,
      projectTypes: ["Type1", "Type2"]
    };
  }

  // showCreateProjectTemplate = () => {
  //   this.setState({ isShowCreateProject });
  // };

  // handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <section className="card projects">
              <div className="card-body">
                <section>
                  <h5>My Projects</h5>
                  <ul>
                    <li>
                      <Link to="/project">Project 1</Link>
                    </li>
                    <li>
                      <Link to="/project">Project 2</Link>
                    </li>
                    <li>
                      <Link to="/project">Project 3</Link>
                    </li>
                  </ul>
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
              </div>
            </section>
          </div>
          <div className="col">
            <section>
              <h3></h3>
              <div className="row">
                <TabPanel projectTypes={this.state.projectTypes} />
              </div>
              {/* <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-outline-primary"
                    onClick={this.showCreateProject}
                  >
                    Create new project
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-outline-primary"
                    onClick={this.showCreateProjectTemplate}
                  >
                    Create project template
                  </button>
                </div>
              </div> */}
              <div className="row"></div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default MyProjects;
