import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/Card";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Env from "../helpers/Env";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/core/Icon';
import {Edit, ContactlessOutlined} from '@material-ui/icons';
import {Delete} from '@material-ui/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';


    




class Allevents extends Component {
    constructor(props) {
        super(props);
        this.state = {
           allprojects:[],

        }
  

    }
    componentDidMount() {
        if(sessionStorage.getItem('persona')=="admin")
        {
         
        
            axios.get(Env.host+"/calender/admin/allevents/"+sessionStorage.getItem('companyId')).then((response) => {
                this.setState({
                      userdetails: response.data
                    })
                })

        }
        else
        {
            let id=sessionStorage.getItem('uid')
            axios.get(Env.host+"/calender/allevents/"+id).then((response) => {
                this.setState({
                      userdetails: response.data
                    })
                })

            }   
   
}
      
    render() {
        let projects = this.state.userdetails? this.state.userdetails.map((el) => {
          console.log(this.state.userdetails)
            return(
                <div>
                     <Card style={{ width: '50rem' ,"marginTop":"20PX"}}>
                   <Card.Body>
                   <div class="col-md-1"></div>
        <div class="col-md-12">
        <div class="row">
        <div class="col-md-10">
        <div style={{"margin-top":"10px","margin-bottom":"10px","fontSize":"25px"}}><Link to ={"/Eventdetails/"+el.eventid} style={{color:"black"}} >{el.title}</Link></div>

        </div>
        <div class="col-md-1">
        {this.state.access?<div>
        <IconButton  onClick={()=>this.handleedit(el.eventid)}><Edit/></IconButton>
        <IconButton  onClick={()=>this.handledelete(el.eventid)}><Delete/></IconButton></div>:""}

        
        </div>
        </div>

        
        <div class="row" >
        <div class="col-md-2">
        <div style={{"fontSize":" 15px"}}> <LocationOnIcon></LocationOnIcon>{el.eventlocation}</div>

        </div>
        <div class="col-md-2">
        <div style={{"fontSize":"15px"}}> <ScheduleIcon></ScheduleIcon>{el.time}</div>
        </div>
        <div class="col-md-3">
        <div style={{"fontSize":"15px"}}>   <DateRangeIcon></DateRangeIcon>{el.date.substr(0,10)} </div>
        </div>
       
        <div class="col-md-2">
        <div style={{"fontSize":"15px"}}> <Link to={"/Eventdetails/"+el.eventid}  style={{color:"black"}}>View Users</Link></div>
       
        </div>
        </div>
      
       
   
        <div  style={{"fontSize":"15px","margin-top":"20px"}}>{el.eventdescription}</div>
    
        </div>
      
        <div class="col-md-1">
      
     
       
        </div>

  
                  </Card.Body>
                     </Card>
                     
                       </div>
     
                  )
                }
               ):""
       
                              
        return (
        <div>
         <div class="row">
         <div class="col-md-3">    <h3> MY EVENTS</h3></div>

    
              
         </div>
               <div class="row">
                   <div class="col-md-1"></div>
                   <div class="col-md-8">
                   
                          {projects}
                    
                   </div>
                   <div class="col-md-1"></div>
               </div>
        </div>

        );
    }
}

export default Allevents;
