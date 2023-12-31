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
import "./AddAttendance.css";

import {
  FacultyAttendenceApi,
  FacultyAttendencePostApi,
  FacultyPreviousAttendance,
} from "../../../api/FacultyApi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SnackbarProvider, useSnackbar } from "notistack";
import SideBarFaculty from "../SideBar/SideBarFaculty";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

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
function TablePaginationActions1(props) {
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

function AddAttendanceTable() {
  const [page, setPage] = React.useState(0);
  const [page1, setPage1] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowsPerPage1, setRowsPerPage1] = React.useState(5);
  const [studentDetail, setStudentDetail] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event, row) => {
    setStudentDetail(row);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangePage1 = (event, newPage) => {
    setPage1(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };

  const Action = async (status) => {
    studentDetail.status = status;

    FacultyAttendencePostApi(studentDetail);
    if (status === "Present") {
      enqueueSnackbar(`${studentDetail.studentName} is ${status}`, {
        variant: "success",
      });
    } else if (status === "Absent") {
      enqueueSnackbar(`${studentDetail.studentName} is ${status}`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(
        `${studentDetail.studentName} is taiken ${status} leave`,
        { variant: "info" }
      );
    }

    handleClose();
  };

  const [Student, SetAllStudents] = React.useState([]);
  React.useEffect(() => {
    const handleApi = async () => {
      let data = await FacultyAttendenceApi("");
      SetAllStudents(data);
    };
    handleApi();
  }, []);
  const [prevAttendance, setprevAttendance] = React.useState([]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Student?.length) : 0;
  const emptyRows1 =
    page1 > 0
      ? Math.max(0, (1 + page1) * rowsPerPage1 - prevAttendance?.length)
      : 0;

  // ======>modal<=====
  const [openModal, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const handleClickOpenModal = async () => {
    setOpen(true);
  };
  React.useEffect(() => {
    const PrevApi = async () => {
      let prevAttendance = await FacultyPreviousAttendance(search);
      setprevAttendance(prevAttendance);
    };
    PrevApi();
  }, [search]);

  const handleCloseModal = () => {
    setOpen(false);
  };

  // ===================

  return (
    <Container>
      <h1 className="clubReqTitle">Attendance</h1>
      <TableContainer component={Paper} className="facultyResultTable">
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Student Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
            {Student?.length > 0 ? (
              (rowsPerPage > 0
                ? Student.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : Student
              ).map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.studentName}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(e) => handleClick(e, row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          "aria-labelledby": "long-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            width: "20ch",
                          },
                        }}
                      >
                        <MenuItem onClick={() => Action("Present")}>
                          Present
                        </MenuItem>
                        <MenuItem onClick={() => Action("Absent")}>
                          Absent
                        </MenuItem>
                        <MenuItem onClick={() => Action("Half Day")}>
                          Half Day
                        </MenuItem>
                      </Menu>
                    </>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                    <TableCell>
                   Attendance Not Found
                    </TableCell>
                    </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <Button  style={{color:"rgba(60, 34, 34, 0.96)" }} onClick={handleClickOpenModal}>
                  Show Previous days Attendance
                </Button>
              </TableCell>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={4}
                count={Student?.length}
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

      {/* ==================================MODAL============================================= */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Previous Days Attendance </DialogTitle>
        <DialogContent>
          {/* ================>SEARCH<==================== */}
          <div style={{ display: "grid", width: "100%" }}>
            <TextField
              margin="dense"
              label="Search by Name or date(dd/mm/yyyy)"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* ==================================== */}
          {/* =============================================================================================================== */}
          {/* <TableContainer component={Paper} className="facultyResultTable"> */}

          <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
            <TableBody>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Student Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
              {prevAttendance?.length > 0 ? (
                (rowsPerPage1 > 0
                  ? prevAttendance.slice(
                      page1 * rowsPerPage1,
                      page1 * rowsPerPage1 + rowsPerPage1
                    )
                  : prevAttendance
                ).map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.studentName}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                <TableCell>
                Attendance Not Found
                </TableCell>
                </TableRow>
              )}
              {emptyRows1 > 0 && (
                <TableRow style={{ height: 53 * emptyRows1 }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={4}
                  count={prevAttendance?.length}
                  rowsPerPage={rowsPerPage1}
                  page={page1}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage1}
                  onRowsPerPageChange={handleChangeRowsPerPage1}
                  ActionsComponent={TablePaginationActions1}
                />
              </TableRow>
            </TableFooter>
          </Table>
          {/* </TableContainer> */}
          {/* =============================================================================================================== */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* ====================================================================================== */}
    </Container>
  );
}

export default function AddAttendance() {
  return (
    <SnackbarProvider maxSnack={3}>
      <>
        <div style={{ backgroundColor: "gray", height: "100vh",overflow:"hidden" }}>
          <SideBarFaculty />
          <AddAttendanceTable />
        </div>
      </>
    </SnackbarProvider>
  );
}
