import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Form } from "react-bootstrap";

const columns = [
  { id: "index", label: "Index", minWidth: 170 },
  { id: "character", label: "Character", minWidth: 170 },
  { id: "actor", label: "Actor", minWidth: 100 },
];

function createData(index, character, actor) {
  return { index, character, actor };
}

const rows = [
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

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function CharacterListing() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
