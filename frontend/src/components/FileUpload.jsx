import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Env from "../helpers/Env";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileUrl: null,
      files: [],
    };
  }

  componentDidMount() {
    const url =
      Env.host + "/admin/get-files?s3Key=" + this.props?.location?.folder;
    console.log("URL:::::", url);
    axios.get(url).then(async (response) => {
      console.log(response);
      await this.setState({
        files: response.data.Contents,
      });
      console.log("files are::::", this.state.files);
    });
  }

  uploadFile(formData) {
    const fileInput = formData.get("file");
    const filename = fileInput.name;
    console.log("filename: " + filename);
    axios
      .get(Env.host + `/admin/create-upload-url?filename=${filename}`)
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
    this.uploadFile(formData);
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

  getPresignedUrl = () => {
    if (!this.state.key) {
      console.error("invalid S3 Key");
      return;
    }
    axios
      .get(
        Env.host + "/admin/get-presigned-url?key=" + encodeURI(this.state.key)
      )
      .then((result) => {
        this.setState({ presignedUrl: result });
      })
      .catch((err) => {
        console.error("getPresignedUrl err: " + err);
      });
  };

  render() {
    return (
      <article>
        {this.state?.files?.map((file) => (
          <div class="card w-50">
            <div class="card-body">
              <h5 class="card-title">{file.Key}</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              {/* <a href="#" class="btn btn-primary">
                {file}
              </a> */}
              <Link
                className="btn btn-sm btn-outline-primary"
                to={{
                  pathname: `/file-upload`,
                  file: file,
                }}
              >
                {file.Key}
              </Link>
            </div>
          </div>
        ))}
        <h2>File Upload</h2>
        <section>
          <React.Fragment>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              name="filetoupload"
              className="btn btn-outline-default"
              onChange={this.onChangeHandlerFileUpload}
            />
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={this.fileUploadHandler}
            >
              Upload
            </button>
          </React.Fragment>
        </section>
        {!!this.state?.uploadedFileUrl ? (
          <a href={this.state?.uploadedFileUrl} target="_blank">
            Uploaded File URL: {this.state?.uploadedFileUrl}
          </a>
        ) : (
          ""
        )}
        <pre>
          {JSON.stringify(this.state?.createPresignedPostRes?.data, null, 2)}
        </pre>
        <section>
          <React.Fragment>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="key"
                placeholder="Enter S3 key"
                onChange={this.handleOnChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={this.getPresignedUrl}
            >
              Get Presigned URL
            </button>
          </React.Fragment>
        </section>
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
