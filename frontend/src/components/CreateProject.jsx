import React from "react";
class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <form className={classes.root} noValidate>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
      </div>
    );
  }
}

export default CreateProject;
