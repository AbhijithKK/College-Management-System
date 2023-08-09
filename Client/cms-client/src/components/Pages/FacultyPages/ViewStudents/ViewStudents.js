import "./ViewStudents.css";

import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Container } from "react-bootstrap";
import { FacultyGetDepStudents } from "../../../api/FacultyApi";
import SideBarFaculty from "../SideBar/SideBarFaculty";
import { TextField } from "@mui/material";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function ViewStudents() {
  const [AllStudents, SetAllStudents] = React.useState([]);

  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    const HandleApi = async () => {
      let data = await FacultyGetDepStudents(search);
      SetAllStudents(data);
    };
    HandleApi();
  }, [search]);

  //         ======================>TABLE<===============================
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - AllStudents?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // ============================================================================

  return (
    <>
      <div style={{ backgroundColor: "gray", height: "100vh" }}>
        <SideBarFaculty />
        <Container>
          <h1 className="clubReqTitle">All Students</h1>
          <TableContainer component={Paper} className="StudentResultTablests">
            {/* ==================================== */}
            <div style={{ display: "grid" }}>
              <TextField
                margin="dense"
                label="Search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* ==================================== */}
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Semester</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    guardian Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    guardian Number
                  </TableCell>
                </TableRow>
                {AllStudents?.length > 0 ? (
                  (rowsPerPage > 0
                    ? AllStudents.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : AllStudents
                  ).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ width: 160 }}>{row.name}</TableCell>
                      <TableCell style={{ width: 160 }}>{row.email}</TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row.semester}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row.guardianName}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row.guardianNo}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div>Students Not Found</div>
                )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={3} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      10,
                      25,
                      50,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={AllStudents.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </>
  );
}
