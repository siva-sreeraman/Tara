import React, {Component} from "react";
import axios from 'axios';
import {Form,Col} from 'react-bootstrap';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Radio } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {  useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

var userdata = [];
var accessrightsdata = [];
// var edit_userdata = [];
// var edit_accessrightsdata = [];
// const deptFunctions = [
//   { value: "Locations and sets" },
//   { value: "Cast " },
//   { value: "Costumes" },
//   { value: "Hair and makeup" },
//   { value: "Production design (cars, props etc)" },
//   { value: "Stunts" },
//   { value: "Choreography" },
//   { value: "Visual Effects" },
//   { value: "Marketing" }
// ];



const useStyles2 = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 600
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300
  }
}));

class UserGroups extends Component
{
    constructor(props)
    {

        super(props);
        this.state = 
    {
        usergroups : [],
         ugname : "",
        displaycrewform:false,
        sucessmsg:"",
        userstougs : [],
        accessdata :[],
        users : [],
        accessrights :[],
        displaycrewform : false,
     projectid : this.props.projectid,
     ugdescription:"",
     showeditug:false,
     editugdes : "",
     editugname:"",
     edit_userdata:[],
     edit_accessrightsdata:[],
     ugid : 0

         
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handlenamechange = this.handlenamechange.bind(this);
    this.handleOnChangeSkills = this.handleOnChangeSkills.bind(this);
    this.handleugformClose = this.handleugformClose.bind(this);
this.submitugform = this.submitugform.bind(this);
    this.handleAccessrightSkills = this.handleAccessrightSkills.bind(this);
    this.handledeschange = this.handledeschange.bind(this);
    this.submiteditugform = this.submiteditugform.bind(this);
    this.showeditugs = this.showeditugs.bind(this);
    this.closeeditugs = this.closeeditugs.bind(this);
    this.showeditugform = this.showeditugform.bind(this);
    this.handleeditnamechange = this.handleeditnamechange.bind(this);
    this.handleeditdeschange = this.handleeditdeschange.bind(this);
    }

    showeditugform()
    {
      this.setState({
        showeditug : true
       })
    }
    
    handlenamechange(e)
    {
      console.log("in handle name change");
      console.log("the value is",e.target.value);
      this.setState({
        ugname : e.target.value
      })
    }

    handleeditnamechange(e)
    {
      console.log("in handle name change");
      console.log("the value is",e.target.value);
      this.setState({
        editugname : e.target.value
      })
    }

     showeditugs = async (value)=>    {
      console.log("value is",value.UserGroup)
      await this.setState({
        editugname : value.UserGroup,
        editugdes : value.description,
       ugid : value.UserGroupId
      })
      console.log("editugname",this.state.editugname)
      console.log("editugdes",this.state.editugdes)


      await axios.get('http://localhost:4000/project-overview/get_project_usergroup_details?projectid='+this.state.projectid+'&ugid='+value.UserGroupId)
      .then((response) => {
                  console.log("in subresponse",response.data)
                  
                    this.setState(prevState => ({  edit_userdata : prevState.edit_userdata = response.data["userdetails"],
                    edit_accessrightsdata : prevState. edit_accessrightsdata = response.data["accessrights"]
                   }));                 
                  
          }); 
    }


       async  submiteditugform()
        {
          this.setState({
           showeditug : false
          })

       const   data = {
            ugname : this.state.editugname,
            ugdescription : this.state.editugdes,
            usernames : this.state.edit_userdata,
            accessdata : this.state.edit_accessrightsdata,
            ugid : this.state.ugid
          }
          
      await axios.post('http://localhost:4000/project-overview/update_project_usergroup_details?projectid='+this.state.projectid,data)
      .then((response) => {
                  console.log("in subresponse",response.data)
                  
                    this.setState(prevState => ({  edit_userdata : prevState.edit_userdata = response.data["userdetails"],
                    edit_accessrightsdata : prevState. edit_accessrightsdata = response.data["accessrights"]
                   }));                 
                  
          }); 


        }

        closeeditugs(e)
         {
      this.setState({
        showeditug : false
         }) 
         }

    handledeschange(e)
    {
      this.setState({
        ugdescription : e.target.value
      })
    }
    

    handleeditdeschange(e)
    {
      this.setState({
        editugdes : e.target.value
      })
    }
    

    handleAccessrightSkills = async (event,values) =>
    {
      console.log("in handle on change skills");

      await this.setState({
        edit_accessrightsdata: values
      }, () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.edit_accessrightsdata);
      });
    }

    handleOnChangeSkills = async (event,values) =>
    {
    console.log("in handle on change skills");
     await this.setState({
      edit_userdata: values
      }, () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.edit_userdata);
      });
    }


    handleOnChange()
    {
      console.log("in crew form handlechange");
      this.setState({
        displaycrewform : true
      })
    }


    handleugformClose()
    {
      this.setState({
        displaycrewform : false
      })
    }


    async submitugform()
    {

      const data ={
        ugname : this.state.ugname,
        usernames : this.state.userstougs,
        accessdata : this.state.accessdata,
        ugdescription : this.state.ugdescription
      }
      await axios.post('http://localhost:4000/project-overview/create_new_usergroup?projectid='+this.state.projectid,data)
      .then((response) => {
                  console.log("in subresponse",response.data)
          });

          this.setState({
            displaycrewform : false
          })
    
    }


    async componentDidMount(){

      await axios.get('http://localhost:4000/project-overview/getusergroups_project?projectid='+this.state.projectid)
            .then((response) => {
                        console.log(response)
                       
                    this.setState({
                      usergroups : this.state.usergroups.concat(response.data) 
                    });
                });
              
    
    

    await axios.get('http://localhost:4000/project-overview/getusers_fromproject?projectid='+this.state.projectid)
            .then((response) => {
                        console.log(response)
                       
                    this.setState({
                      users : this.state.users.concat(response.data) 
                    });
                    console.log(this.state.users);
                });

                userdata = this.state.users;



                await axios.get('http://localhost:4000/project-overview/getaccessrights_forproject?projectid='+this.state.projectid)
            .then((response) => {
                        console.log(response)
                       
                    this.setState({
                      accessrights : this.state.accessrights.concat(response.data) 
                    });
                    console.log(this.state.accessrights);
                });

                accessrightsdata = this.state.accessrights;
  }        

  render() 
  {

    var ugform;
    var editugform;

    ugform =  <Modal show={this.state.displaycrewform} onHide={this.handleugformClose}>
    <Modal.Header closeButton>
      <Modal.Title>Create New UserGroup</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    
    <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>UserGroup Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Usergroup Name"
                      name="ugname"
                      // onKeyDown={this.onKeyUp}
                      onChange={this.handlenamechange}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>UserGroup Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Description"
                      name="ugdescription"
                      // onKeyDown={this.onKeyUp}
                      onChange={this.handledeschange}
                    />
                  </Form.Group>
                  <FormControl>
              <Autocomplete
                multiple
                id="tags-standard"
                options={userdata}
                style={{ width: 300 }}

                getOptionLabel={each => each.name}
                // defaultValue={[userdata[0]]}
                onChange={this.handleOnChangeSkills}
                // defaultValue={this.props?.studentSkills}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Users"
                    placeholder="Enter Users"
                  />
                )}
              />
              {/* <section className="skills-chips">
                {this.props?.studentSkills?.map(skill => (
                  <Chip className="skill-chip" label={skill.skill} />
                ))}
              </section> */}
            </FormControl>

            <FormControl>
              <Autocomplete
                multiple
                id="tags-standard"
                options={accessrightsdata}
                style={{ width: 300 }}

                getOptionLabel={each => each.accessRight}
                onChange={this.handleAccessrightSkills}
                // defaultValue={this.props?.studentSkills}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="AccessRights"
                    placeholder="Enter Access Rights"
                  />
                )}
              />
              {/* <section className="skills-chips">
                {this.props?.studentSkills?.map(skill => (
                  <Chip className="skill-chip" label={skill.skill} />
                ))}
              </section> */}
            </FormControl>
     {/* Enter Role: <TextField>Enter Role</TextField> */}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={this.handleugformClose}>
        Close
      </Button>
      <Button variant="primary" onClick={this.submitugform}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>



editugform =  <Modal show={this.state.showeditug} onHide={this.closeeditugs}>
    <Modal.Header closeButton>
      <Modal.Title>UserGroup Form</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    
    <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>UserGroup Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Usergroup Name"
                      name="editugname"
                      defaultValue = {this.state.editugname}
                      // onKeyDown={this.onKeyUp}
                      onChange={this.handleeditnamechange}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>UserGroup Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Description"
                      name="editugdes"
                      defaultValue = {this.state.editugdes}

                      // onKeyDown={this.onKeyUp}
                      onChange={this.handleeditdeschange}
                    />
                  </Form.Group>
                  <Form.Group>
                  {/* <Form.Label>UserGroup Users</Form.Label> */}

                  <FormControl>
              <Autocomplete
                multiple
                id="tags-standard"
                options={userdata}
                style={{ width: 300 }}
                getOptionLabel={each => each.name}
                defaultValue={this.state.edit_userdata}
                onChange={this.handleOnChangeSkills}
                // defaultValue={this.props?.studentSkills}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Users"
                    placeholder="Enter Users"
                  />
                )}
              />
              {/* <section className="skills-chips">
                {this.props?.studentSkills?.map(skill => (
                  <Chip className="skill-chip" label={skill.skill} />
                ))}
              </section> */}
            </FormControl>
             </Form.Group>
             <Form.Group>
             {/* <Form.Label>UserGroup AccessRights</Form.Label> */}

            <FormControl>
              <Autocomplete
                multiple
                id="tags-standard"
                options={accessrightsdata}
                style={{ width: 300 }}
                getOptionLabel={each => each.accessRight}
                defaultValue={this.state.edit_accessrightsdata}
                onChange={this.handleAccessrightSkills}
                // defaultValue={this.props?.studentSkills}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="AccessRights"
                    placeholder="Enter Access Rights"
                  />
                )}
              />
              {/* <section className="skills-chips">
                {this.props?.studentSkills?.map(skill => (
                  <Chip className="skill-chip" label={skill.skill} />
                ))}
              </section> */}
            </FormControl>
            </Form.Group>
     {/* Enter Role: <TextField>Enter Role</TextField> */}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={this.closeeditugs}>
        Close
      </Button>
      <Button variant="primary" onClick={this.submiteditugform}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>


      const displayform =  (  


        this.state.usergroups.map(crew=> {
      return(      
           <TableRow>
                         <StyledTableCell><Checkbox name={crew.UserGroupId} onChange={e => this.showeditugs(crew)} /></StyledTableCell>
                   
              <StyledTableCell>
                {crew.UserGroupId}
              </StyledTableCell>
      
              <StyledTableCell align="right">{crew.UserGroup}</StyledTableCell>
              <StyledTableCell align="right">{crew.description}</StyledTableCell>
       
              <StyledTableCell align="right">
    
              <Link onClick={this.showeditugform}>Edit Usergroup</Link></StyledTableCell>

            </TableRow>
          
      
  )
}))
return (
  <div>

     <div class="paddingleft15">
         <div class="form-group row" paddingleft>

         <div class="col-lg-10"> </div>
         <div class="col-lg-1"><a className="btn btn-primary" onClick={this.handleOnChange}>Add UserGroup</a> </div>

         </div>
         <div>
           {this.state.sucessmsg}
         </div>
           
         <div class="form-group row" paddingleft>
             <div class="col-lg-2"></div>
             <div class="col-lg-9">  <h2></h2>
             <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell></StyledTableCell>
            <StyledTableCell>UserGroupId</StyledTableCell>
            <StyledTableCell>UserGroup</StyledTableCell>
          <StyledTableCell>Description</StyledTableCell>
          <StyledTableCell>Edit Usergroup</StyledTableCell>
        

          </TableRow>
        </TableHead>
        <TableBody>
        {displayform}
        </TableBody>
      </Table>
    </TableContainer>
             
             
    <br></br>
<div>
       <TableContainer component={Paper}>
      <Table  aria-label="customized table">
      <TableBody>
        {ugform}
      </TableBody>
      </Table>
      </TableContainer>
      </div>
      <div>
       <TableContainer component={Paper}>
      <Table  aria-label="customized table">
      <TableBody>
        {editugform}
      </TableBody>
      </Table>
      </TableContainer>
      </div>
             </div>
             
             </div>
 
 </div>
 </div>

        
        
      
      );
    }
    
  }



export default UserGroups;
