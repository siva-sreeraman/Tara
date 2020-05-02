import React from "react";
import axios from 'axios';
import { Component } from "react";
import FullCalendar from '@fullcalendar/react';
import Env from "../helpers/Env";
import dayGridPlugin from '@fullcalendar/daygrid';
import '../App.css'

class Fullcalender extends Component {
    constructor(props) {

        super(props);
        this.state =
        {
            events: "",
        }
    }
    componentDidMount() {
        if(sessionStorage.getItem('persona')=="admin")
        {
            let id=sessionStorage.getItem('companyid')
            axios.get(Env.host+"/calender/admin/allevents/"+id).then((response) => {
                this.setState({
                       events: response.data
                    })
                })

        }
        else
        {
            let id=sessionStorage.getItem('id')
            axios.get(Env.host+"/calender/allevents/"+id).then((response) => {
                this.setState({
                       events: response.data
                    })
                })

            }   
   
}



  
    eventdateChangeHandler(e) {
        this.setState({ eventdate: e.target.value });
    }
    eventnameChangeHandler(e) {
        this.setState({ eventname: e.target.value });
    }
   

 

    render() {
        
         
        console.log(this.state.events)
        return (
            <div>
                <div class="col-md-3"></div>
                <div class="col-md-6" style={{"marginTop":"80px"}}>

                    <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} 
                        events={this.state.events} />
                </div>
             
                
            </div>

        );
    }

}



export default Fullcalender;
