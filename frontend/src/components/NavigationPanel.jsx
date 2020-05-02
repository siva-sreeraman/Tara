import React from "react";
import { Link } from "react-router-dom";

function NavigationPanel() {
  return (
    <section className="card projects">
      <div className="card-body">
        <section>
          <h5>My Projects</h5>
          <ul>
            <li>
              <Link className="links" to="/project-overview">
                Project 1
              </Link>
            </li>
            <li>
              <Link to="/project-overview">Project 2</Link>
            </li>
            <li>
              <Link to="/project-overview">Project 3</Link>
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
  );
}

export default NavigationPanel;
