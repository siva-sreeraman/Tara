import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to="/">
            TARA
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav w-100">
              <Link className="nav-item nav-link" to="/">
                Calendar
              </Link>
              <Link className="nav-item nav-link" to="/my-projects">
                Projects
              </Link>

              <Link className="nav-item nav-link" to="/">
                {" "}
                Events
              </Link>
              <Link className="nav-item nav-link" to="/">
                {" "}
                Tasks
              </Link>
              <Link className="nav-item nav-link" to="/su-dashboard">
                SU
              </Link>
              <Link className="nav-item nav-link" to="/admin-dashboard">
                Admin
              </Link>
            </div>
          </div>

          <Link
            className="pull-right btn btn-sm btn-outline-primary"
            to="/login"
          >
            Login
          </Link>
        </nav>
      </div>
    );
  }
}

export default Navbar;
