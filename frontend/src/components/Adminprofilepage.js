
import React, { Component } from 'react';
import axios from "axios";
import "../components/css/projectpage.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Env from "../helpers/Env";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
import EditIcon from '@material-ui/icons/Edit';





class Adminprofilepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            projectshow: false,
            openimage: false,
            name: "",
            email: "",
            phone_number: "",

        }
        this.uploadpic = this.uploadpic.bind(this)
        this.getdata=this.getdata.bind(this)


    }
    componentDidMount() {
        // let id=sessionStorage.getItem('id')
       this.getdata();
    }
    getdata=()=>
    {
        if(sessionStorage.getItem('persona')=="admin")
        {
          axios.get(Env.host+"/profile/admin/"+sessionStorage.getItem('uid')).then((response) => {
            console.log(response.data);
            this.setState({
                profile: response.data
            })
            if (this.state.profile.length > 0) {
                this.setState({

                    name: response.data[0].name,
                    email: response.data[0].email,
                    phone_number: response.data[0].phone_number,
                    profile_pic: response.data[0].profile_pic,


                });
            }
          })

        }
        else
        {
            axios.get(Env.host+"/profile/user/"+sessionStorage.getItem('uid')).then((response) => {
              console.log(response.data);
              this.setState({
                  profile: response.data
              })
              if (this.state.profile.length > 0) {
                  this.setState({
  
                      name: response.data[0].name,
                      email: response.data[0].email,
                      phone_number: response.data[0].phone_number,
                      profile_pic: response.data[0].profile_pic,
  
  
                  });
              }
            })
  

        }
        
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangepic = (e) => {
        this.setState({ file: e.target.files[0] });
    }


    handleedit = (e) => {

        this.setState({
            projectshow: true
        })
    }

    handleprojectclosemodal = () => {
        this.setState({
            projectshow: false
        })
    }
    closeimage = () => {
        this.setState({
            openimage: false
        })
    }

    openmodal = () => {
        this.setState({
            openimage: !this.state.openimage
        })
    }

    handleprojectclose = () => {
        this.setState({
            projectshow: false
        })
        const data = {

            name: this.state.name,
            email: this.state.email,
            phone_number: this.state.phone_number

        }
        if(sessionStorage.getItem('persona')=="admin")
        {
          axios.post(Env.host+"/profile/admin/"+sessionStorage.getItem('uid'), data)

        }
        else{
          axios.post(Env.host+"/profile/user/"+sessionStorage.getItem('uid'), data)
        }
        this.getdata();

    }
    uploadpic = (e) => {
        e.preventDefault();
        console.log("hi")
        const formData = new FormData();
        formData.append('profilepic', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        if(sessionStorage.getItem('persona')=="admin")
        {
          axios.post(Env.host + '/profile/uploadpic/admin/'+sessionStorage.getItem('uid'), formData, config)
            .then((response) => {
                this.getdata();

                this.setState({
                    openimage: false,
                    file: null
                })
            }).catch((error) => {
            });

        }
        else
        {
          axios.post(Env.host + '/profile/uploadpic/user/'+sessionStorage.getItem('uid'), formData, config)
          .then((response) => {
              this.getdata();

              this.setState({
                  openimage: false,
                  file: null
              })
          }).catch((error) => {
          });

        }
     
       
    }

    render() {
        let pic = <Card>
            <Dialog open={this.state.openimage} onClose={this.closeimage} >
                <DialogTitle id="form-dialog-title"><h4>Edit Profile pic</h4></DialogTitle>
                <form onSubmit={this.uploadpic}>
                    <DialogContent>

                        <div class="form-group">
                            <input type="file" class="form-control-file" name="image"
                                id="exampleFormControlFile1" onChange={this.onChangepic} />
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeimage}>
                            Cancel
            </Button>
                        <button type="submit" class="btn btn-primary" onClick={this.uploadpic}>Save</button>
                    </DialogActions>
                </form>
            </Dialog>

        </Card>
        let projectmodel = <Modal show={this.state.projectshow} onHide={this.handleprojectclosemodal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit profile details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form >
                    <label for="name"> Name:</label>
                    <input type="text" name="name" id="name1" value={this.state.name} onChange={this.onChange} class="form-control" required />
                    <br></br> <label for="email"> Mail Id:</label>
                    <input type="email" name="email" id="email" value={this.state.email} onChange={this.onChange} class="form-control" required />
                    <br></br>
                    <br></br><label for="phone_number"> Phonenumber</label>
                    <input type="number" name="phone_number" id="phone_number" value={this.state.phone_number} onChange={this.onChange} class="form-control" required />
                    <br></br>

                </form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleprojectclosemodal}>
                    Close
  </Button>
                <Button variant="primary" onClick={this.handleprojectclose}>
                    Save Changes
  </Button>
            </Modal.Footer>
        </Modal>
        let projects = this.state.profile?this.state.profile.map((project) => {
            return (
                <div>
                    <div class="card" style={{
                        "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "margin-top": "20px",
                        "background-color": "#fff", height: "525px",
                    }}>
                    <div class="nam4" style={{ "paddingLeft": "550px","paddingTop": "5px", fontSize: "20px" }}><button class="btn" style={{ color: "black" }} onClick={() => this.handleedit()}><EditIcon></EditIcon></button></div>


                        <div class="col-md-9">

                            <div class="colm" style={{ "paddingTop": "50px", "paddingLeft": "200px", fontSize: "15px" }}>
                                {this.state.profile.profile_pic === null ? (
                                    <Avatar className="changePhoto" title="Upload profile pic" onClick={this.openmodal} variant="circle" >
                                        <h1>{this.state.name.charAt(0)}</h1>
                                    </Avatar>
                                ) : (
                                        <Avatar className="changePhoto" title="Change profile pic" onClick={this.openmodal} variant="circle" src={this.state.profile_pic} style={{ cursor: "pointer", width: "200px", height: "200px", margin: "15px", border: "0.5px solid" }} />
                                    )}
                            </div>

                            <div class="nam" style={{ "paddingTop": "50px", "paddingLeft": "250px", fontSize: "20px" }}><PersonOutlineIcon></PersonOutlineIcon>&nbsp;&nbsp;&nbsp;{this.state.name}</div>
                            <div class="nam2" style={{ "paddingTop": "20px", "paddingLeft": "250px", fontSize: "20px" }}><MailIcon></MailIcon>&nbsp;&nbsp;&nbsp;{this.state.email}</div>
                            <div class="nam3" style={{ "paddingTop": "20px", "paddingLeft": "250px", fontSize: "20px" }}><CallIcon></CallIcon>&nbsp;&nbsp;&nbsp;{this.state.phone_number}</div>
                           
                        </div>
                        

                    </div>
                </div>

            )
        }):""
        


        return (
            <div>
                <div class="row">
                    <div class="col-md-1"></div>

                    <div style={{ marginTop: "20px","marginLeft":"450px" }}
                    ><h1 > MY PROFILE</h1></div>
                </div>
                <div class="row" style={{}}>
                    <div class="col-md-3"></div>
                    <div class="col-md-6">

                        {projects}
                        {projectmodel}
                        {pic}

                    </div>
                    <div class="col-md-3"></div>
                </div>
            </div>

        );
    }
}


export default Adminprofilepage;