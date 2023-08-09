import * as React from "react";
import "./Result.css";
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button } from "@mui/material";
import { ApiViewSemester, StudentResultGetApi } from "../../../api/StudentApi";
import SideBarStudent from "../SideBar/SideBarStudent";

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

export default function Result() {
  const [semwise, setSemWise] = React.useState("");
  const [semester, setSemester] = React.useState([]);
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    const ApiHelper = async () => {
      let data = await StudentResultGetApi(semwise);
      let sem = await ApiViewSemester("", "sem");
 
      setSemester(sem);
      setResult(data);
    };
    ApiHelper();
  }, [semwise]);
  // =======================>TABLE<============================
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - result?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ================>DROP DOWN MENU<=================
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // =================================================

  return (
    <div
      style={{ backgroundColor: "gray", height: "100vh", overflow: "hidden " }}
    >
      <SideBarStudent />
      <Container>
        <h1 className="clubReqTitle">Result</h1>
        {/* ===========================DROP DOWN======================
         */}

        <div>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            value={semwise}
          >
            {semester?.map((val, index) => (
              <MenuItem key={index} onClick={() => setSemWise(val.semester)}>
                Sem {val.semester}
              </MenuItem>
            ))}
          </Menu>
        </div>

        {/* ========================================================== */}

        <TableContainer component={Paper} className="StudentResultTable">
          {/* ====================DROP DOWN bUTTON================ */}
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{color:"#206a3d "}}
          >
            sort by semester <ArrowDropDownIcon />
          </Button>
          {/* ===================================================== */}

          <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
            <TableBody>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  Subject
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  Semester
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  Mark
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  Grade
                </TableCell>
              </TableRow>
              {result?.length > 0 ? (
                (rowsPerPage > 0
                  ? result.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : result
                ).map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.subject}</TableCell>
                    <TableCell align="center">{row.semester}</TableCell>
                    <TableCell align="center">{row.mark}</TableCell>
                    <TableCell align="center">{row.grade}</TableCell>
                  </TableRow>
                ))
              ) : (
                <div>Result not found</div>
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
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={result?.length}
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
  );
}
