import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";

import Env from "../helpers/Env";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      console.log("files are::::", this.state.files);
    });
  }

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

  getPresignedUrl = (fileKey) => {
    // if (!this.state.key) {
    //   console.error("invalid S3 Key");
    //   return;
    // }
    console.log("entered signed URL::::");
    axios
      .get(Env.host + "/admin/get-presigned-url?key=" + fileKey)
      .then((result) => {
        this.setState({ presignedUrl: result });
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
        {this.state?.files?.map((file) => (
          <div class="card w-50">
            <div class="card-body">
              <h5 class="card-title">
                {file.Key.split(this.props?.location?.room + "/").pop()}
              </h5>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  this.getPresignedUrl(file.Key);
                }}
              >
                <GetAppIcon />
              </Button>
            </div>
          </div>
        ))}
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
            </Button>{" "}
            <Button
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
