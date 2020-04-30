import React, { Component } from 'react';
import axios from "axios";
import "../components/css/projectpage.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";

// import TabPanel from "./TabPanel";
import Env from "../helpers/Env";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Constants from "../helpers/Constants";




class Adminprofilepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           allprojects:[],

        }
  

    }
    componentDidMount() {
         axios.get(Env.host + "/project-create/allprojects").then((response) =>
        {
          console.log("response from all projects",response);
          this.setState({
            allprojects : response.data
          })
          console.log("all projects",this.state.allprojects);
        }
        )
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        let projects = this.state.allprojects.map((project) => {
            return(
                <div>
                     <div class="card" style={{"display": "block","border-radius": "4px", "border": "1px #ddd solid","margin-top":"20px", 
                     "background-color": "#fff", height:"600px", }}>
                     <div class="col-md-9">
                     <div id="container" style={{marginTop:"100px",marginLeft:"300px"}}>
                  <div style={{"font-size":"50px"}}id="name">
                          {}

                            </div>
                         </div>
                        <div class="nam" style={{"paddingTop":"70px","paddingLeft":"250px",fontSize:"15px"}}><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;&nbsp;&nbsp;name</div> 
                        <div class="nam2" style={{"paddingTop":"20px","paddingLeft":"250px",fontSize:"15px"}}><span class="glyphicon glyphicon-envelope"></span>&nbsp;&nbsp;&nbsp;&nbsp;mail</div> 
                        <div class="nam3" style={{"paddingTop":"20px","paddingLeft":"250px",fontSize:"15px"}}><i class='fas fa-tty'></i>&nbsp;&nbsp;&nbsp;&nbsp;Phone number</div> 
 
                        <div>

                <button data-toggle="modal" data-target="#myModal2" style={{
                    "font-size": "13px",
                    "textAlign": "center", 
                }}>

                    Edit  </button>
            </div>
            <div style={{ "width": "200px", "height": "10px" }}>
                <div class="modal fade" id="myModal2" role="dialog" style={{ "height": "500px" }}  >
                    <div class="modal-dialog" style={{ "width": "600px" }}>
                        <div class="modal-content">
                            <div >
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title"><br></br>&nbsp;Edit profile details</h4>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.submitInfo}>
                                    <label for="name"> Name:</label>
                                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.onChange} class="form-control" required />
                                    <label for="name"> Mail Id:</label>
                                    <input type="email" name="email" id="email" value={this.state.email} onChange={this.onChange} class="form-control" required />

                                    <label for="name"> Phonenumber</label>
                                    <input type="number" name="phonenumber" id="phonenumber" value={this.state.phonenumber} onChange={this.onChange} class="form-control" required />
                                    <br></br>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> &nbsp;
            
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>


                     </div>
                    
                     
                      
                     </div>
                     
              
     
                  )
                }
               )
       
                              
        return (
        <div>
         <div class="row">
         <div class="col-md-1"></div>

             <div style={{marginRight:"0px"}}
              ><h1> MY PROFILE</h1></div>
         </div>
               <div class="row" style={{}}>
                   <div class="col-md-3"></div>
                   <div class="col-md-6">
                   
                          {projects}
                    
                   </div>
                   <div class="col-md-3"></div>
               </div>
        </div>

        );
    }
}


export default Adminprofilepage;