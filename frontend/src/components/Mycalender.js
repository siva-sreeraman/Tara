import React from "react";
import axios from 'axios';
import { Component } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../App.css';
import Env from "../helpers/Env";

class Mycalender extends Component {
    constructor(props) {
        super(props);


        this.state =
        {
            events: "",
            projectid: sessionStorage.getItem('projectid')
        }
    }

    componentDidMount() {

        axios.get(Env.host + "/project-overview/getevents_fromproject/" + this.state.projectid).then((response) => {
            console.log(response);
            this.setState({
                events: response.data,
            });
        });

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
                <div className="paddingleft15">
                    <div>{this.state.sucessmsg}</div>
                    <div className="form-group">
                        <div className="">
                            <div className="form-group d-flex justify-content-between">
                                <h2>My Calendar</h2>

                            </div>
                            <div class="col-md-3"></div>
                            <div class="col-md-6" style={{ "marginTop": "80px" }}>

                                <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]}
                                    events={this.state.events} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }

}



export default Mycalender;
