import "./ViewClubs.css";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "react-bootstrap";
import { Delete, MoreVert } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Swal from "sweetalert2";
import {
  FacultyClubDeleteMeeting,
  FacultyClubSheduleMeeting,
  FacultyClubStudentMeeting,
  FacultyDeleteClubs,
  FacultyGetClubs,
} from "../../../api/FacultyApi";
import SideBarFaculty from "../SideBar/SideBarFaculty";
// ===========>DATE=======================
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// ===========================================
// ====================TIME===============================
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// ========================================================

export default function ViewClubs() {
  const theme = useTheme();
  const [allClubs, setAllClubs] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const [search, setSearch] = useState("");
  useEffect(() => {
    const ApiHelper = async () => {
      let data = await FacultyGetClubs(search);
      setAllClubs(data);
    };
    ApiHelper();
  }, [refresh, search]);

  // ======>modal<=====
  const [open, setOpen] = React.useState(false);
  const [openStudent, setOpenStudent] = React.useState(false);
  const [openMoreinfo, setOpenMoreinfo] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenMoreinfo = () => {
    setOpenMoreinfo(true);
  };

  const handleCloseMoreInfo = () => {
    setOpenMoreinfo(false);
  };
  const handleClickOpenStudent = () => {
    setOpenStudent(true);
  };

  const handleCloseStudent = () => {
    setOpenStudent(false);
  };
  const [add, useAdd] = React.useState(false);

  // ===================
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [name, setName] = useState("def");
  const [errMsg, setErrmsg] = useState("");

  const SheduleHelper = async () => {
    if (time !== "" && date !== "" && name !== "def" && place.trim()) {
      let dates = new Date(date).toLocaleDateString("en-GB");
      let times = new Date(time).toLocaleTimeString("en-GB", { hour12: true });

      FacultyClubSheduleMeeting(name, times, dates, place);
      setOpen(false);
    } else {
      setErrmsg("Fill All The Fields");
    }
    useAdd(!add);
  };

  // =============================================================================
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event, data) => {
    setAnchorEl(event.currentTarget);
    setMoreInfo(data);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [moreInfo, setMoreInfo] = useState({});
  const handleMoreInfo = () => {
    handleClickOpenMoreinfo();
  };

  // =============================================================================
  const handleDelete = () => {
    handleMenuClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this club!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = await FacultyDeleteClubs(moreInfo._id);
        if (data === true) {
          Swal.fire({
            icon: "success",
            text: "Deleted Successfully",
          });
          setRefresh(!refresh);
        }
      }
    });
  };

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const DeleteSheduledMeetingHelper = (index) => {
    handleMenuClose();
    handleCloseMoreInfo();
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this club!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = await FacultyClubDeleteMeeting(
          moreInfo._id,
          moreInfo.meeting[index].id
        );
        if (data === true) {
          Swal.fire({
            icon: "success",
            text: "Deleted Successfully",
          });
          setRefresh(!refresh);
        }
      }
    });
  };
  const [studentData, useStudent] = useState([]);
  const HandleStudents = async () => {
    let data = await FacultyClubStudentMeeting(moreInfo._id);
    useStudent(data);
    handleClickOpenStudent();
  };
  return (
    <>
      <SideBarFaculty />
      <div
        style={{
          marginLeft: "50px",
          backgroundColor: "gray",
          height: "100vh",
          marginTop: "-65px",
        }}
      >
        <Container>
          {allClubs?.length === 0 ? (
            <h1 style={{ marginTop: "50px" }}>You are Not An Admin of Clubs</h1>
          ) : (
            <div>
              <h1>Your Clubs</h1>
              <br />
            </div>
          )}

          <div className="clubsHeads">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                style={{ width: "95%" }}
                margin="dense"
                label="Search by Name"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* =======================SHEDULE MEETING===================================== */}
              <div className="addbtn">
                <Button
                  variant="outlined"
                  className="departmentAddBtn1"
                  onClick={handleClickOpen}
                >
                  schedule meeting
                </Button>
              </div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogContent>
                  <p style={{ color: "red" }}>{errMsg}</p>
                  <Select
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    variant="standard"
                    label="Select Semester"
                    name="semester"
                    value={name}
                  >
                    <MenuItem hidden value="def">
                      Select Club
                    </MenuItem>
                    {allClubs?.length > 0 &&
                      allClubs.map((val) => (
                        <MenuItem key={val._id} value={val._id}>
                          {val.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {/* ==================DATE============================ */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        onChange={setDate}
                        label="Basic date picker"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {/* =============================================== */}
                  {/* ===========================TIME=================================== */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        onChange={setTime}
                        label="Basic time picker"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {/* ===================================================================== */}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Enter Meeting Place"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setPlace(e.target.value)}
                    value={place}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={SheduleHelper}>Add</Button>
                </DialogActions>
              </Dialog>
              {/* ============================================================================= */}
            </div>
          </div>
          {/* ==================================== */}

          <Grid container spacing={2}>
            {allClubs?.length > 0 ? (
              allClubs.map((data, index) => (
                <Grid item xs={12} sm={12} md={12} key={index}>
                  <Box className="Clubcardk">
                    <Card variant="outlined" className="clubcardk">
                      <CardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h5" component="div">
                            {data.name}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Tooltip title="Menu">
                              <IconButton
                                onClick={(e) => handleMenuOpen(e, data)}
                              >
                                <MoreVert />
                              </IconButton>
                            </Tooltip>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleMenuClose}
                            >
                              <MenuItem onClick={() => handleMoreInfo(data)}>
                                View Meetings
                              </MenuItem>
                              <MenuItem onClick={() => HandleStudents()}>
                                View Students
                              </MenuItem>
                              <MenuItem onClick={() => handleDelete(data._id)}>
                                Delete Club
                              </MenuItem>
                            </Menu>
                          </div>
                        </div>
                        <Typography
                          sx={{ mb: 1.8 }}
                          color="text.secondary"
                        ></Typography>
                        <Typography variant="body2">
                          {data.discription}
                        </Typography>
                      </CardContent>
                      <CardActions></CardActions>
                    </Card>
                    {/* =================================MODAL======================== */}
                    <div key={index}>
                      <Dialog
                        fullScreen={fullScreen}
                        open={openMoreinfo}
                        onClose={handleCloseMoreInfo}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">
                          {"Scheduled Meetings"}
                        </DialogTitle>
                        <DialogContent key={index}>
                          {data.meeting.map((val, index) => (
                            <React.Fragment key={index}>
                              <p>{val.date}</p>
                              <p>{val.time}</p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <p>{val.place}</p>
                                <Tooltip title="Delete Meeting">
                                  <Button
                                    onClick={() =>
                                      DeleteSheduledMeetingHelper(index)
                                    }
                                  >
                                    <Delete  style={{color:"rgba(60, 34, 34, 0.96)" }} />
                                  </Button>
                                </Tooltip>
                              </div>
                              <hr />{" "}
                              {/* Move the <hr> outside of the <p> element */}
                            </React.Fragment>
                          ))}
                        </DialogContent>
                        <DialogActions>
                          <Button  style={{color:"rgba(60, 34, 34, 0.96)" }} onClick={handleCloseMoreInfo} autoFocus>
                            close
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                    {/* ==================================================================== */}
                    {/* =================================MODAL======================== */}
                    <div key={data._id}>
                      <Dialog
                        fullScreen={fullScreen}
                        open={openStudent}
                        onClose={handleCloseStudent}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">
                          {"Joined Students"}
                        </DialogTitle>
                        <DialogContent key={index}>
                          <>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <td style={{ fontWeight: "bold" }}>Name</td>
                                  <td
                                    style={{
                                      fontWeight: "bold",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    Department
                                  </td>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {studentData.map((val) => (
                                  <TableRow key={val._id}>
                                    <td>{val.studentName}</td>
                                    <td style={{ paddingLeft: "10px" }}>
                                      {val.department}
                                    </td>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </>
                        </DialogContent>
                        <DialogActions>
                          <Button  style={{color:"rgba(60, 34, 34, 0.96)" }} onClick={handleCloseStudent} autoFocus>
                            close
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                    {/* ==================================================================== */}
                  </Box>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <div>clubs not Found</div>
              </Grid>
            )}
          </Grid>
        </Container>
      </div>
    </>
  );
}
