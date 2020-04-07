const columns = [
  { id: "index", label: "Index", minWidth: 170 },
  { id: "character", label: "Character", minWidth: 170 },
  { id: "actor", label: "Actor", minWidth: 100 },
];

const createData = (index, character, actor) => {
  // const density = population / size;
  return { index, character, actor };
};

const Characters = [
  createData(1, "Thanos", "Josh Brolin"),
  createData(2, "Black Panther", "Chadwick"),
  createData(3, "Iron Man", "Robert Downy"),
  createData(4, "Spider Man", "Chris Evans"),
  createData(5, "Doctor Strange", "Tom Holland"),
  createData(6, "Black Widow", "Bennedict"),
  createData(7, "Hulk", "Scarllet Johanson"),
  createData(8, "Wanda Maximoff", "Mark Ruffalo"),
  createData(9, "Red Skull", "Elizabeth"),
  createData(10, "Vision", "Ross"),
  createData(11, "Loki", "Tom Hiddles"),
  createData(12, "Groot", "Vin Diesel"),
  createData(13, "Gamora", "Zoe Saldana"),
  createData(14, "Bucky Barnes", "Sebastian"),
  createData(15, "Proxima Midnight", "Carrie Coon"),
];

export default Characters;
