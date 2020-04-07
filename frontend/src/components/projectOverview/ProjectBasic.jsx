import React from "react";

class ProjectBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      showForm: false,
      character: "",
      actor: "",
    };
  }

  columns = [
    { id: "index", label: "Index", minWidth: 170 },
    { id: "character", label: "Character", minWidth: 170 },
    { id: "actor", label: "Actor", minWidth: 100 },
  ];

  createData = (index, character, actor) => {
    // const density = population / size;
    return { index, character, actor };
  };

  componentDidMount() {
    this.setState({
      rows: [
        this.createData(1, "Thanos", "Josh Brolin"),
        this.createData(2, "Black Panther", "Chadwick"),
        this.createData(3, "Iron Man", "Robert Downy"),
        this.createData(4, "Spider Man", "Chris Evans"),
        this.createData(5, "Doctor Strange", "Tom Holland"),
        this.createData(6, "Black Widow", "Bennedict"),
        this.createData(7, "Hulk", "Scarllet Johanson"),
        this.createData(8, "Wanda Maximoff", "Mark Ruffalo"),
        this.createData(9, "Red Skull", "Elizabeth"),
        this.createData(10, "Vision", "Ross"),
        this.createData(11, "Loki", "Tom Hiddles"),
        this.createData(12, "Groot", "Vin Diesel"),
        this.createData(13, "Gamora", "Zoe Saldana"),
        this.createData(14, "Bucky Barnes", "Sebastian"),
        this.createData(15, "Proxima Midnight", "Carrie Coon"),
      ],
    });
  }

  submitForm = () => {
    this.setState({
      rows: [
        ...this.state.rows,
        this.createData(this.state.character, this.state.actor),
      ],
    });
  };

  addCharacter = () => {
    this.setState({
      showForm: true,
    });
  };
  cancelForm = () => {
    this.setState({
      showForm: false,
    });
  };

  render() {
    return (
      <div>
        <h1>Infinity War</h1>
        <div>
          <p>Project type: Movie</p>
        </div>
        <div>
          <p>Core Fucntions</p>
        </div>
        <div>
          <p>Department Fucntions</p>
        </div>
      </div>
    );
  }
}

export default ProjectBasic;
