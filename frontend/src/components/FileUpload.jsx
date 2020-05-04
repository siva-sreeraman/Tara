import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Env from "../helpers/Env";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presignedUrlMap: {},
      uploadedFileUrl: null,
      files: [],
    };
  }

  getFilesInFolder() {
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
      this.getPresignedUrls();
      console.log("files are::::", this.state.files);
    });
  }

  getPresignedUrls = () => {
    const temp = this.state?.files?.map((file, index) => {
      this.getPresignedUrl(file.Key, index);
    });
  };

  componentDidMount() {
    this.getFilesInFolder();
  }

  uploadFile(formData, key) {
    const fileInput = formData.get("file");
    const filename = fileInput.name;
    console.log("filename: " + filename);
    axios
      .get(
        Env.host + `/admin/create-upload-url?s3Key=${key}&filename=${filename}`
      )
      .then((result) => {
        this.setState({ createPresignedPostRes: result });
        const fields = result.data.fields;
        const _formData = new FormData();
        for (const field in fields) {
          // console.log(`${field}: ${fields[field]}`);
          _formData.set(field, fields[field]);
        }
        _formData.set("file", fileInput);
        axios.post(result.data.url, _formData).then((result) => {
          this.getFilesInFolder();
          console.log("uploadFile result: " + JSON.stringify(result.data));
          this.setState({ uploadedFileUrl: result.data.imageUrl });
        });
      });
  }

  createUrl(data) {
    const formData = new FormData();
    for (const field in formData) {
      formData.set(field, formData[field]);
    }
  }

  fileUploadHandler = () => {
    const formData = new FormData();
    console.log(this.state.selectedFile);
    // formData.set("type", Constants.UploadType.PROFILE_PIC);
    formData.set("type", "profilePhoto");
    // formData.set("role", this.props.role);
    // formData.set("studentID", this.props.studentID);

    formData.append("file", this.state.selectedFile);
    console.log("formData: ", formData);
    this.uploadFile(formData, this.props?.location?.folder);
  };

  onChangeHandlerFileUpload = (event) => {
    var file = event.target.files[0];
    console.log(file);
    console.log(this.validateSize(event));
    if (this.validateSize(event)) {
      console.log(file);
      this.setState({
        selectedFile: file,
      });
    }
  };

  validateSize = (event) => {
    let file = event.target.files[0];
    let size = 1024 * 1024 * 1; // MB
    let err = "";
    console.log(file.size);
    if (file.size > size) {
      err = file.type + "is too large, please pick a smaller file\n";
      console.error(err);
    }
    return true;
  };

  handleOnChange = async (event) => {
    await this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getFileFromS3(fileKey) {
    this.getPresignedUrl(fileKey);
  }

  getPresignedUrl = (fileKey, index) => {
    // if (!this.state.key) {
    //   console.error("invalid S3 Key");
    //   return;
    // }
    console.log("entered signed URL:::: index: " + index);
    axios
      .get(Env.host + "/admin/get-presigned-url?key=" + fileKey)
      .then(async (result) => {
        let urlMap = this.state.presignedUrlMap;
        urlMap[index] = result;
        await this.setState({ presignedUrlMap: urlMap });
      })
      .catch((err) => {
        console.error("getPresignedUrl err: " + err);
      });
  };

  render() {
    // this.state?.files;
    return (
      <article>
        <h2 className="text-capitalize">{this.props?.location?.room}</h2>
        {/* "this.props.location"{" "}
        <pre>{JSON.stringify(this.props?.location, null, 2)}</pre> */}
        <article className="d-flex flex-wrap">
          {this.state?.files?.map((file, index) => (
            <section class="card document mr-3 mb-3">
              {!!this.state?.presignedUrlMap &&
              !!this.state?.presignedUrlMap[index] ? (
                <React.Fragment>
                  {"pdf" ===
                  file.Key.split(this.props?.location?.room + "/")
                    .pop()
                    .split(".")[1] ? (
                    <div className="img-placeholder"></div>
                  ) : (
                    // <a
                    //   target="_blank"
                    //   href={this.state?.presignedUrlMap[index].data}
                    // >
                    //   {file.Key.split(this.props?.location?.room + "/").pop()}
                    // </a>
                    <a
                      target="_blank"
                      href={this.state?.presignedUrlMap[index].data}
                    >
                      <img
                        className="document img"
                        src={this.state?.presignedUrlMap[index].data}
                      />
                    </a>
                  )}
                </React.Fragment>
              ) : (
                ""
              )}

              {/* <Button
                variant="outline"
                color="primary"
                onClick={() => {
                  this.getPresignedUrl(file.Key, index);
                }}
              >
                <GetAppIcon />
              </Button> */}
              <div class="card-body">
                <h5 class="card-title">
                  {file.Key.split(this.props?.location?.room + "/").pop()}
                </h5>
                <a
                  target="_blank"
                  href={this.state?.presignedUrlMap[index]?.data}
                  class="btn btn-outline-primary"
                >
                  View
                </a>
              </div>
            </section>
          ))}
        </article>
        <h2>File Upload</h2>
        <section>
          <React.Fragment>
            <Button variant="contained" color="secondary" component="label">
              Choose File
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                name="filetoupload"
                style={{ display: "none" }}
                onChange={this.onChangeHandlerFileUpload}
              />
            </Button>
            <Button
              className="ml-3"
              variant="contained"
              color="secondary"
              onClick={this.fileUploadHandler}
            >
              Upload
            </Button>
          </React.Fragment>
        </section>
        {/* {!!this.state?.uploadedFileUrl ? (
          <a href={this.state?.uploadedFileUrl} target="_blank">
            Uploaded File URL: {this.state?.uploadedFileUrl}
          </a>
        ) : (
          ""
        )} */}
        Heres the download link
        {!!this.state?.presignedUrl?.data ? (
          <React.Fragment>
            <figure>
              <img src={this.state?.presignedUrl?.data} alt="S3 image" />
            </figure>
            <a href={this.state?.presignedUrl?.data}>
              {this.state?.presignedUrl?.data}
            </a>
          </React.Fragment>
        ) : (
          ""
        )}
      </article>
    );
  }
}

export default FileUpload;
