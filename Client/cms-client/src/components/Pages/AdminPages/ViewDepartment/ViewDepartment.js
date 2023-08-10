import "./ViewDepartment.css";
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
} from "@mui/material";
import {
  ApiAddDepartment,
  ApiDeleteDepartment,
  ApiViewDepartment,
} from "../../../api/AdminApi";
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

export default function ViewDepartment() {
  // ======>modal<=====
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState("");
  const [add, useAdd] = React.useState(false);

  const HandleAdd = async () => {
    await ApiAddDepartment(value);
    setOpen(false);
    useAdd(!add);
  };
  const [departments, setDepartment] = React.useState([]);
  // ===================
  const [deleted, useDeleted] = React.useState(false);

  const [search, setSearch] = React.useState("");
  const [pageNo, setPageNo] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const PaginationHelp = (event, page) => {
    setPageNo(page);
  };
  React.useEffect(() => {
    const FeatchData = async () => {
      let data = await ApiViewDepartment(search, pageNo);
      setDepartment(data.allDepartments);
      setTotal(data.total);
    };
    FeatchData();
  }, [deleted, add, search, pageNo]);

  const REfreshHelper = () => {
    useDeleted(!deleted);
  };
  const DeleteDepartment = async (id) => {
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
        let data = await ApiDeleteDepartment(id);
        if (data === true) {
          Swal.fire({
            icon: "success",
            text: "Deleted Successfully",
          });
          REfreshHelper();
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
          <React.Fragment>
            <div>
              <Row style={{ marginLeft: "72px", paddingTop: "18px" }}>
                <Col xs={12} md={12} lg={12}>
                  <h1 style={{ fontWeight: "bold" }}>VIEW DEPARTMENT</h1>
                </Col>
              </Row>
              <div className="addbtn">
                <Button
                  variant="outlined"
                  className="departmentAddBtn"
                  onClick={handleClickOpen}
                >
                  Add Department
                </Button>
              </div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Enter Department Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={HandleAdd}>Add</Button>
                </DialogActions>
              </Dialog>
            </div>

            <TableContainer
              component={Paper}
              className="tableContainer"
              style={{ backgroundColor: "gray" }}
            >
              {/* ================>SEARCH<==================== */}
              <div
                style={{ display: "grid", marginLeft: "72px", width: "100%" }}
              >
                <TextField
                  margin="dense"
                  label="Search by Department Name"
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
                    <StyledTableCell className="rowWidth">
                      Department
                    </StyledTableCell>
                    <StyledTableCell align="left">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {departments.length > 0 ? (
                    departments.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Button onClick={() => DeleteDepartment(row._id)}>
                            <DeleteForeverSharp />
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    // Render a message or placeholder when the array is empty
                    <StyledTableRow>
                    <StyledTableCell>
                    <div>There is no Department Found</div>
                    </StyledTableCell>
                  </StyledTableRow>
                  )}
                </TableBody>
              </Table>
              <Stack style={{ marginLeft: "72px" }} spacing={2}>
                <Pagination
                  count={total}
                  color="primary"
                  page={pageNo}
                  onChange={PaginationHelp}
                />
              </Stack>
              <br />
            </TableContainer>
          </React.Fragment>
        </Container>
      </div>
    </>
  );
}
