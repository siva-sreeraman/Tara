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
      <article>
        <h1>Project Overview</h1>
        <div className="row">
          <div className="col-3">
            <section className="card">
              <div className="card-body">
                <h5>Features</h5>
                <ul>
                  <li>
                    <Link to="/">Tasks</Link>
                  </li>
                  <li>
                    <Link to="/">Crew List</Link>
                  </li>
                  <li>
                    <Link to="/">User Groups</Link>
                  </li>
                  <li>
                    <Link to="/">Characters</Link>
                  </li>
                  <li>
                    <Link to="/">Locations</Link>
                  </li>
                  <li>
                    <Link to="/">Contumes</Link>
                  </li>
                  <li>
                    <Link to="/">Props</Link>
                  </li>
                  <li>
                    <Link to="/">Files & Documents</Link>
                  </li>
                  <li>
                    <Link to="/">Contracts</Link>
                  </li>
                  <li>
                    <Link to="/">Project Settings</Link>
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div className="col">
            <section>
              <h3></h3>
              <div className="row">
                <section></section>
              </div>
            </section>
          </div>
        </div>
      </article>
    );
  }
}

export default MyProjects;
