import React from "react";
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Component } from "react";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';




const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);





  
class Taskdetails extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
    {
        userdetails : [],   
    
    }
    } 
    componentDidMount(){
        const { match: { params } } = this.props
        const data = {
            id: params.id

        }

      axios.get('http://localhost:4000/project-overview/gettaskusers/'+data.id)
            .then((response) => {
                        console.log(response.data)
                       
                    this.setState({
                        userdetails : response.data
                    });
                });
              
    }
    
        

  render() 
  {
    let displayform=null;
    let details=null;
    if(this.state.userdetails.length>0)
    {
        details=(  


            this.state.userdetails.map(ud=> {
          return(
            
              
          
               <TableRow>
                  <StyledTableCell>
                    {ud.name}
                  </StyledTableCell>
                  <StyledTableCell >{ud.address}</StyledTableCell>
                  <StyledTableCell >{ud.phonenumber}</StyledTableCell>
                  <StyledTableCell >{ud.mail}</StyledTableCell>
                
                </TableRow>
              
          
      )
    }));
        


        displayform=  (<div class="paddingleft15">
        <div class="form-group row" paddingleft>

        <div class="col-lg-10"><h2> USERS ASSIGNED TO THIS TASK</h2> </div>
    
        </div>
          
        <div class="form-group row" paddingleft>
            <div class="col-lg-2"></div>
            <div class="col-lg-9">
            <TableContainer component={Paper}>
     <Table  aria-label="customized table">
       <TableHead>
         <TableRow>
           <StyledTableCell> Name</StyledTableCell>
           <StyledTableCell> address</StyledTableCell>
           <StyledTableCell >phonenumber</StyledTableCell>
           <StyledTableCell >mail</StyledTableCell>
          
         </TableRow>
       </TableHead>
       <TableBody>
        {details}
       </TableBody>
     </Table>
   </TableContainer>
            </div>
            
            </div>

</div>
)
        

    }
    else{
        displayform =  ( <div style={{"marginTop":"20px"}}><h1>NO USERS ASSIGNED TO THIS TASK</h1></div>)

    }

     
return (
  <div  style={{"marginTop":"20px","paddingLeft":"150px"}}>

     
       {displayform}      
           

 </div>

        
        
      
      );
    }
    
  }



export default Taskdetails;
