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




class Projectpage extends Component {
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
      
    render() {
        let projects = this.state.allprojects.map((project) => {
            return(
                <div>
                     <div class="card" style={{"display": "block","border-radius": "4px", "border": "1px #ddd solid","margin-top":"20px", 
                     "background-color": "#fff", height:"100px", }}>
                     <div class="col-md-2">
                     <div id="container" style={{marginTop:"10px"}}>
                  <div style={{"font-size":"50px"}}id="name">
                          {project.name.charAt(0)}
                            </div>
                         </div>
                   
                     </div>
                     <div class="col-md-9" style={{marginTop:"10px"}}>
                     <div style={{ "font-size": "15px", paddingTop: "10px"}}> <Link to={"/Projectmainpage/"+ project.id} style={{ color: "black" }}>
                     {project.name}</Link></div>
                     
                       </div>
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
              ><h1> MY PROJECTS</h1></div>
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


export default Projectpage;