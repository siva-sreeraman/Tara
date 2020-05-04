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
      companyId: window.sessionStorage.getItem("companyId"),
      folders: ["Costumes", "Contracts", "Financing"],
      persona: sessionStorage.getItem("persona"),
      projectid: window.sessionStorage.getItem("projectid"),
      userid: sessionStorage.getItem("userid"),
      foldersWithAccessRight: [],
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
    this.setFolderByAccessRights();
  }

  checkAccessRights = async (value) => {
    if (this.state.persona == "admin") {
      this.setState({
        access: true,
      });
      return true;
    } else {
      const data = {
        projectid: this.state.projectid,
        accessright: value,
        userid: this.state.userid,
      };
      await axios
        .post(Env.host + "/accessright/user/", data)
        .then((response) => {
          console.log("is it true", response.data);
          if (response.data) {
            this.setState({
              access: true,
            });
            return true;
          } else {
            this.setState({
              access: false,
            });
            return false;
          }
        });
    }
  };

  setFolderByAccessRights = async () => {
    let foldersWithAccessRight = [];
    let x = this.state.folders.map((folder) => {
      if (this.checkAccessRights(folder)) {
        console.log(
          "this.checkAccessRights(folder) for folder",
          folder,
          this.checkAccessRights(folder)
        );
        foldersWithAccessRight.push(folder);
      }
    });
    await this.setState({
      foldersWithAccessRight: foldersWithAccessRight,
    });
    console.log("foldersWithAccessRight:::", foldersWithAccessRight);
  };

  render() {
    const roomKey =
      "companies/" + this.state.companyId + "/projects/" + this.state.projectid;
    console.log("roomKey:::", roomKey);
    return (
      <div className="rooms container">
        <h2>Documents</h2>
        <article className="d-flex flext-wrap">
          {this.state?.foldersWithAccessRight?.map((folder) => (
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
