import React from "react";
import { Link } from "react-router-dom";

class AdminDashboard extends React.Component {
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
        <h1>Admin Dashboard</h1>
        <div className="row">
          <div className="col-3">
            <section className="card projects">
              <div className="card-body">
                <section>
                  <h5></h5>
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
                  </ul>
                </section>
                <section>
                
                  <ul>
                    <li>
                      <Link to="/project">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/project">My Calendar</Link>
                    </li>
                    <li>
                      <Link to="/project">My Profile</Link>
                    </li>
                    <li>
                      <Link to="/project">My Notifications</Link>
                    </li>
                    <li>
                      <Link to="/my-projects">My Projects</Link>
                    </li>
                  </ul>
                </section>
              </div>
            </section>
          </div>
          <div className="col">
            <section>
              <h3></h3>
              <div className="row">Projects list</div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
