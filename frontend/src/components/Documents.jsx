import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import FolderOpenOutlinedIcon from "@material-ui/icons/FolderOpenOutlined";

import Env from "../helpers/Env";

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyId: 2,
      projectId: 2,
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
        <h2>Documents</h2>
        <article className="d-flex flext-wrap">
          {this.state.folders.map((folder) => (
            // <DocumentCard
            // folder={folder}
            // pathname="/file-upload"
            // projectFolder={roomKey + "/" + folder}
            // room={folder} />
            <div class="card document mr-3 m-b3">
              <div class="card-body">
                <h5 class="card-title text-capitalize">
                  <FolderOpenOutlinedIcon
                    color="primary"
                    fontSize="large"
                    className="folder-icon"
                  />{" "}
                  {folder}
                </h5>
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
                  <Button size="small" variant="outlined" color="primary">
                    {folder}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </article>
      </div>
    );
  }
}

export default Documents;
