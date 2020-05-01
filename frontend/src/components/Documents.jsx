import React from "react";
import { Link } from "react-router-dom";

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: ["costumes", "contracts", "finances"],
    };
  }
  render() {
    return (
      <div className="rooms container">
        {/* <h1>Documents</h1>> */}
        {this.state.folders.map((folder) => (
          <div class="card w-50">
            <div class="card-body">
              <h5 class="card-title">{folder}</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              {/* <a href="#" class="btn btn-primary">
                {folder}
              </a> */}
              <Link
                className="btn btn-sm btn-outline-primary"
                to={{
                  pathname: `/file-upload`,
                  folder: folder,
                }}
              >
                {folder}
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Documents;
