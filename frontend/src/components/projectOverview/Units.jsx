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
  { id: "unit", label: "Unit", minWidth: 170 },
  { id: "location", label: "Location", minWidth: 100 },
];

function createData(index, unit, location) {
  return { index, unit, location };
}

const rows = [
  createData(1, "Unit 1", "Italy", "Fight Scene 1"),
  createData(2, "Unit 2", "Paris", "Song 5"),
  // createData(3, "Robert Downy", "456789678"),
  // createData(4, "Chris Evans", "456789678"),
  // createData(5, "Tom Holland", "456789909"),
  // createData(6, "Bennedict", "567890"),
  // createData(7, "Scarllet Johanson", "456789789"),
  // createData(8, "Mark Ruffalo", "4567890"),
  // createData(9, "Elizabeth", "567890789"),
  // createData(10, "Ross", "567890"),
  // createData(11, "Tom Hiddles", "4567890"),
  // createData(12, "Vin Diesel", "4567890"),
  // createData(13, "Zoe Saldana", "3456789"),
  // createData(14, "Sebastian", "3456789"),
  // createData(15, "Carrie Coon", "456789"),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function Units() {
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

  // const handleOnChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });
  // };

  return (
    <div>
      <button className="btn btn-outline-primary">Add Unit</button>
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
