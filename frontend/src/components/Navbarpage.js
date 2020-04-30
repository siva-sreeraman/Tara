import React, { Component } from 'react';
import '../components/css/projectlandingpage.css';
import { Link } from "react-router-dom";



class Navbarpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
      

        }
  

    }
    componentDidMount() {
    }
    
     
    render() {
        
                              
        return (
        <div>
           
                <div class="nav" style={{paddingLeft:"0px"}}>
                    <div class="sidebar" style={{"margin-top":"0px",textAlign:"center"}}>
                        <header>TARA</header>
                        <ul>
                            <div><Link to="/Projectpage"><span class="glyphicon glyphicon-briefcase"  style={{fontSize:15,color:"white"}}></span></Link></div>
                            <div><Link to="/Companyuserspage"><span class="glyphicon glyphicon-book" style={{fontSize:15,color:"white"}}></span></Link></div>
                            <div><Link to="/Adminprofilepage"><span class="glyphicon glyphicon-user" style={{fontSize:15,color:"white"}}></span></Link></div>
                            <div><Link to="/Admincalenderpage"><span class="glyphicon glyphicon-calendar"  style={{fontSize:15,color:"white"}}></span></Link></div>
         
                        </ul>
                    </div>

                </div>
                
             
           
        </div>

        );
    }
}


export default Navbarpage;