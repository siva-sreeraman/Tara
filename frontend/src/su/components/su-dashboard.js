import React from "react";
import { Link } from "react-router-dom";

class SuDashboard extends React.Component {
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
        <h1>Super User Dashboard</h1>
        <div className="row">
          <div className="col-3">
            <section className="card projects">
              <div className="card-body">
                <section>
                  <h5></h5>
                  <ul>
                    <li>
                      <Link to="/project">Onboard Members</Link>
                    </li>
                    <li>
                      <Link to="/project">Approvals</Link>
                    </li>
                  </ul>
                </section>
              </div>
            </section>
          </div>
          <div className="col">
            <section>
              <h3></h3>
              <div className="row"></div>
              <div className="row"></div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default SuDashboard;
