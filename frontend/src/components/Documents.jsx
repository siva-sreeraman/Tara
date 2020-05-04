import React from "react";
import { Link } from "react-router-dom";
import Env from "../helpers/Env";
import axios from "axios";
import Button from "@material-ui/core/Button";

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyId: 2,
      projectId: this.props?.location?.projectId,
      folders: ["costumes", "contracts", "finances"],
    };
  }

  getUserAccessRights() {
    const url =
      Env.host +
      "/admin/get-files?s3Key=" +
      this.props?.location?.projectFolder;
    console.log("URL:::::", url);
    axios.get(url).then(async (response) => {
      console.log(response);
      response.data.Contents.shift();
      await this.setState({
        files: response.data.Contents,
      });
      console.log("files are::::", this.state.files);
    });
  }

  componentDidMount() {
    this.getUserAccessRights();
  }

  render() {
    const roomKey =
      "companies/" + this.state.companyId + "/projects/" + this.state.projectId;
    return (
      <div className="rooms container">
        <h1>Project ID{this.state?.projectId}}</h1>>
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
                // className="btn btn-sm btn-outline-primary"
                to={{
                  pathname: `/file-upload`,
                  projectFolder: roomKey + "/" + folder,
                  room: folder,
                }}
              >
                <Button size="small" color="primary">
                  {folder}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Documents;
