import React from "react";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <article>
        <h2>Calendar</h2>
        <div>
          <iframe
            src={
              "https://calendar.google.com/calendar/embed?src=tsmndja228aqctiars3asb0glo%40group.calendar.google.com&ctz=America%2FLos_Angeles"
            }
            style={{ border: 0 }}
            width="800"
            height="600"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>
      </article>
    );
  }
}

export default Calendar;
