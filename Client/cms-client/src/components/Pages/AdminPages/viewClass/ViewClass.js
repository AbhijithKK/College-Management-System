import "./ViewClass.css";
// import {Form,Container,Row,Col,Button} from 'react-bootstrap';

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import {
  ApiAddClass,
  ApiDeleteClass,
  ApiViewClass,
  ApiViewDepartment,
  ApiViewSemester,
} from "../../../api/AdminApi";
import { useForm } from "../../../../Utils/useForm/useForm";
import { DeleteForeverSharp } from "@mui/icons-material";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";
import Swal from "sweetalert2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewClass() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, useValue] = React.useState([]);

  const Changeval = (event) => {
    useFormdata(event);
  };
  const [formdata, useFormdata] = useForm({
    className: "",
    department: "hh",
    semester: "hh",
  });
  const [Department, useDepartment] = React.useState([]);
  const [Semester, useSemester] = React.useState([]);
  const [refresh, userefresh] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const [Total, setTotal] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const ChangePage = (event, page) => {
    setCurrentPage(page);
  };
  React.useEffect(() => {
    const ApiDept = async () => {
      let data = await ApiViewDepartment();
      let sem = await ApiViewSemester(formdata.department);
      useDepartment(data.allDepartments);
      useSemester(sem.allSemesters);
    };
    const ApiCall = async () => {
      let val = await ApiViewClass("", "", search, currentPage);
      useValue(val.allClass);
      setTotal(val.total);
    };
    ApiCall();
    ApiDept();
  }, [refresh, formdata.department, search, currentPage]);
  const [errMsg, setErrmsg] = React.useState("");
  const AddClass = () => {
    if (
      formdata.department !== "hh" &&
      formdata.semester !== "hh" &&
      formdata.className.trim()
    ) {
      ApiAddClass(formdata);
      setOpen(false);
      userefresh(!refresh);
    } else {
      setErrmsg("Fill all fields");
    }
  };
  const DeleteClass = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Fculty!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = ApiDeleteClass(id);
        if (data === true) {
          Swal.fire({
            icon: "success",
            text: "Deleted Successfully",
          });
          userefresh(!refresh);
        }
      }
    });
  };
  return (
    <>
      <SideBar />
      <div
        style={{ backgroundColor: "gray", marginTop: "-65px", height: "100vh" }}
      >
        <Container>
          <div>
            <Row style={{ marginLeft: "72px", paddingTop: "18px" }}>
              <Col xs={12} md={12} lg={12}>
                <h1 style={{ fontWeight: "bold" }}>VIEW CLASS</h1>
              </Col>
            </Row>
            <div className="addbtn">
              <Button
                variant="outlined"
                className="departmentAddBtn"
                onClick={handleClickOpen}
              >
                Add Class
              </Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogContent>
                <p style={{ color: "red" }}>{errMsg}</p>

                <Select
                  onChange={Changeval}
                  fullWidth
                  variant="standard"
                  label="Select Department"
                  name="department"
                  value={formdata.department}
                >
                  <MenuItem hidden value={formdata.department}>
                    Select Department
                  </MenuItem>

                  {Department.length > 0
                    ? Department.map((val, index) => (
                        <MenuItem key={index} value={val.name}>
                          {val.name}
                        </MenuItem>
                      ))
                    : ""}
                </Select>
                <Select
                  onChange={Changeval}
                  fullWidth
                  variant="standard"
                  label="Select Semester"
                  name="semester"
                  value={formdata.semester}
                >
                  <MenuItem hidden value={formdata.semester}>
                    Select Semester
                  </MenuItem>

                  {Semester.length > 0
                    ? Semester.map((val, index) => (
                        <MenuItem key={index} value={val.semester}>
                          {val.semester}
                        </MenuItem>
                      ))
                    : ""}
                </Select>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Enter Class Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  name="className"
                  value={formdata.className}
                  onChange={Changeval}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={AddClass}>Add</Button>
              </DialogActions>
            </Dialog>
          </div>

          <TableContainer component={Paper} style={{ backgroundColor: "gray" }}>
            {/* ================>SEARCH<==================== */}
            <div style={{ display: "grid", marginLeft: "72px", width: "100%" }}>
              <TextField
                margin="dense"
                label="Search by Class Name(eg: -E1)"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* ==================================== */}
            <Table
              sx={{ minWidth: 700 }}
              aria-label="customized table"
              className="tables"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Class Name</StyledTableCell>
                  <StyledTableCell>Department</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {value.length > 0 ? (
                  value.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.className}
                      </StyledTableCell>
                      <StyledTableCell>{row.department}</StyledTableCell>
                      <StyledTableCell>
                        <Button onClick={() => DeleteClass(row._id)}>
                          <DeleteForeverSharp />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell>
                    <div>There is no Class Found</div>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
            <br />
            <Stack style={{ marginLeft: "72px" }} spacing={2}>
              <Pagination
                onChange={ChangePage}
                count={Total}
                color="primary"
                page={currentPage}
              />
            </Stack>
            <br />
          </TableContainer>
          <br />
          <h1> </h1>
          <br />
        </Container>
      </div>
    </>
  );
}
