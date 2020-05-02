import React from "react";
import axios from "axios";
import { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../App.css";

class Mycalender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/companydb/allevents")
      .then((response) => {
        this.setState({
          events: response.data,
        });
      })
      .catch((error) => {});
  }

  eventdateChangeHandler(e) {
    this.setState({ eventdate: e.target.value });
  }
  eventnameChangeHandler(e) {
    this.setState({ eventname: e.target.value });
  }

  render() {
    console.log(this.state.events);
    return (
      <div>
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={this.state.events}
          />
        </div>
      </div>
    );
  }
}

export default Mycalender;
