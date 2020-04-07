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

const columns = [
  { id: "name", label: "Crew\u00a0Member", minWidth: 170 },
  { id: "contact", label: "Contact", minWidth: 100 },
  // {
  //   id: "population",
  //   label: "Population",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value) => value.toLocaleString(),
  // },
  // {
  //   id: "size",
  //   label: "Size\u00a0(km\u00b2)",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value) => value.toLocaleString(),
  // },
  // {
  //   id: "density",
  //   label: "Density",
  //   minWidth: 100,
  //   align: "right",
  //   // format: (value) => value.toFixed(2),
  // },
];

function createData(name, contact) {
  // const density = population / size;
  return { name, contact };
}

const rows = [
  createData("India", "9908678761"),
  createData("China", "9908678762"),
  createData("Italy", "9908678763"),
  createData("United States", "9908678764"),
  createData("Canada", "9908678765", 37602103, 9984670),
  createData("Australia", "9908678766", 25475400, 7692024),
  createData("Germany", "9908678767", 83019200, 357578),
  createData("Ireland", "9908678768", 4857000, 70273),
  createData("Mexico", "9908678769", 126577691, 1972550),
  createData("Japan", "9908678711", 126317000, 377973),
  createData("France", "9908678721", 67022000, 640679),
  createData("United Kingdom", "9908678731", 67545757, 242495),
  createData("Russia", "9908678741", 146793744, 17098246),
  createData("Nigeria", "9908678751", 200962417, 923768),
  createData("Brazil", "9908678761", 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function CrewListing() {
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

  return (
    <div>
      <button className="btn btn-outline-primary">Add Crew</button>
      <br />
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
