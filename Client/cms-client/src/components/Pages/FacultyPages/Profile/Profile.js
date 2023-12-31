import "./Profilef.css";
import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  Button,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FacultyProfileApi,
  FacultyProfileUpdateApi,
  FacultySubmitpassApi,
  FacultyVerifyMail,
  ApiViewDepartment,
} from "../../../api/FacultyApi";
import SideBarFaculty from "../SideBar/SideBarFaculty";
import { Container } from "react-bootstrap";
export default function Profile() {
  const [FacultyData, setFacultyData] = useState({});
  const ApiHelper = async () => {
    let data = await FacultyProfileApi();
    localStorage.setItem("fid", data._id);
    localStorage.setItem("fname", data.name);
    setFacultyData(data);
  };
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    ApiHelper();
  }, [refresh]);

  // =====>MODAL<=======
  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobNumber, setmobNumber] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [admYear, setAdmyear] = React.useState("");
  const [qualifications, setqualifications] = React.useState("");
  const [teachingArea, setteachingArea] = React.useState("");
  const [address, setaddress] = React.useState("");
  const [department, setdepartment] = React.useState("");
  const [gender, setgender] = React.useState("");

  const [pic, setPic] = useState("");

  const HandleClickOpen = async () => {
    setOpen(true);
    setName(FacultyData.name);
    setEmail(FacultyData.email);
    setmobNumber(FacultyData.mobNumber);
    setDob(FacultyData.DOB);
    setAdmyear(FacultyData.admYear);
    setqualifications(FacultyData.qualifications);
    setteachingArea(FacultyData.teachingArea);
    setaddress(FacultyData.address);
    setdepartment(FacultyData.department);
    setgender(FacultyData.gender);

    GetDept();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [totalDepartment, setDep] = React.useState([]);
  const GetDept = async () => {
    let data = await ApiViewDepartment();
    setDep(data);
  };
  
  const [errmsg, setErrmsg] = useState("");
  const HandlSave = () => {
    if (
      name.trim() &&
      email.trim() &&
      mobNumber.trim() &&
      dob.trim() &&
      admYear.trim() &&
      qualifications.trim() &&
      teachingArea.trim() &&
      address.trim() &&
      department.trim() &&
      gender.trim()
    ) {
      FacultyProfileUpdateApi(
        name,
        email,
        mobNumber,
        dob,
        admYear,
        qualifications,
        teachingArea,
        address,
        department,
        gender,
        pic
      );
      setRefresh(!refresh);
      setOpen(false);
    } else {
      setErrmsg("Fill the form prperly");
    }
  };
  // ===================

  //   ===========>PASSWORD MODAL<============
  const [openPas, setOpenPas] = React.useState(false);
  const [emailOrPhone, setEmailOrPhone] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [text, setText] = useState(
    " Enter your Registered email or phone number "
  );
  const [label1, setLabel1] = useState("Email or Phone");
  const [btnText, setBtnText] = useState("Send OTP");
  const [errMsg, setErrMsg] = useState("");
  const [cameOtp, setcameOtp] = useState(0);
  const handleClickOpenPas = () => {
    setOpenPas(true);
  };

  const handleClosepas = () => {
    setOpenPas(false);
  };

  const handleVerify = async () => {
    let data = await FacultyVerifyMail(emailOrPhone);
    if (data.otp === false) {
      setErrMsg(data.text);
    } else {
      setcameOtp(data.otp);
      setText("Enter your OTP");
      setLabel1("Enter OTP");
      setBtnText("Verify");
      setErrMsg("");
    }
  };
  const VerifyOtp = async () => {
    if (otp === cameOtp) {
      handleClosepas();
      handleClickOpenPas1();
      setErrMsg("");
    } else {
      setErrMsg("Enter Currect OTP");
    }
  };
  // ================================================

  // =============================password change==========================
  const [open1, setOpenPas1] = React.useState(false);

  const handleClickOpenPas1 = () => {
    setOpenPas1(true);
  };

  const handleClosepas1 = () => {
    setOpenPas1(false);
  };

  const [newpass, SetNewpass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const SubmitPass = async () => {
    if (newpass === confirmPass && newpass.trim() && confirmPass.trim()) {
      await FacultySubmitpassApi(newpass);
      handleClosepas1();
    } else {
      setErrMsg("password not match");
    }
  };
  // ======================================================================
  return (
    <div style={{ backgroundColor: "gray", height: "100vh " }}>
      <SideBarFaculty />

      {/* ========================>CONFIRM PASSWORD MODAL<=============================== */}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open1}
          onClose={handleClosepas1}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"OTP Verification"}
          </DialogTitle>
          <p style={{ color: "red", marginLeft: "10px" }}>{errMsg}</p>
          <DialogContent>
            <DialogContentText>Change Password</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Enter New password"
              type="text"
              value={newpass}
              onChange={(e) => SetNewpass(e.target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="Enter Confirm password"
              type="text"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={SubmitPass} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* ================================================================================================== */}

      {/* ===================>MODAL OTP=================*/}

      <div>
        <Dialog
          fullScreen={fullScreen}
          open={openPas}
          onClose={handleClosepas}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"OTP Verification"}
          </DialogTitle>
          <p style={{ color: "red", marginLeft: "10px" }}>{errMsg}</p>
          <DialogContent>
            <DialogContentText>{text}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label={label1}
              type="text"
              value={btnText === "Verify" ? otp : emailOrPhone}
              onChange={
                btnText === "Verify"
                  ? (e) => setOtp(e.target.value)
                  : (e) => setEmailOrPhone(e.target.value)
              }
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={btnText === "Verify" ? VerifyOtp : handleVerify}
              autoFocus
            >
              {btnText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* ======================================== */}
      {/* =======>MODAL<======= */}
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update Student Details</DialogTitle>
          <DialogContent>
            <p style={{ color: "red" }}>{errmsg}</p>
            <TextField
              autoFocus
              margin="dense"
              id="fullname"
              label="Full Name"
              type="text"
              fullWidth
              variant="standard"
              name="names"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="dense"
              id="phonenumber"
              label="Phone Number"
              type="tel"
              fullWidth
              variant="standard"
              name="mobNumber"
              value={mobNumber}
              onChange={(event) => setmobNumber(event.target.value)}
            />
            <TextField
              margin="dense"
              id="dob"
              label="Date of Birth"
              type="date"
              fullWidth
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              name="dob"
              value={dob}
              onChange={(event) => setDob(event.target.value)}
            />
            <TextField
              margin="dense"
              id="admissionyear"
              label="Admission Year"
              type="number"
              fullWidth
              variant="standard"
              name="admYear"
              value={admYear}
              onChange={(event) => setAdmyear(event.target.value)}
            />
            <FormControl margin="dense" fullWidth>
              <InputLabel id="department-label">Select Department</InputLabel>
              <Select
                labelId="department-label"
                id="department"
                variant="standard"
                fullWidth
                value={department}
                onChange={(event) => setdepartment(event.target.value)}
              >
                <MenuItem hidden value={department}>
                  {department}
                </MenuItem>
                {totalDepartment?.length > 0
                  ? totalDepartment.map((data, index) => (
                      <MenuItem key={index} value={data.name}>
                        {data.name}
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl>
            <FormControl margin="dense" fullWidth>
              <InputLabel id="gender-label">Select Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                variant="standard"
                fullWidth
                value={gender}
                onChange={(event) => setgender(event.target.value)}
              >
                <MenuItem hidden value={gender}>
                  {gender}
                </MenuItem>
                <MenuItem value="m">Male</MenuItem>
                <MenuItem value="f">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="qualifications"
              label="Qualification"
              type="text"
              fullWidth
              variant="standard"
              name="qualifications"
              value={qualifications}
              onChange={(event) => setqualifications(event.target.value)}
            />
            <TextField
              margin="dense"
              id="guardiannumber"
              label="TeachingArea"
              type="tel"
              fullWidth
              variant="standard"
              name="teachingArea"
              value={teachingArea}
              onChange={(event) => setteachingArea(event.target.value)}
            />
            <TextField
              margin="dense"
              id="address"
              label="Full Address"
              type="text"
              fullWidth
              variant="standard"
              multiline
              rows={4}
              name="address"
              value={address}
              onChange={(event) => setaddress(event.target.value)}
            />
            <TextField
              margin="dense"
              id="address"
              label="Change Profile Photo"
              type="file"
              fullWidth
              variant="standard"
              onChange={(event) => setPic(event.target.files[0])}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="button" onClick={HandlSave}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* ======================= */}
      <Container>
        <section className="" style={{ backgroundColor: "gray" }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100 leftarrange">
              <MDBCol lg="6" className="mb-4 mb-lg-0 leftarrange1">
                <MDBCard className="mb-3" style={{ borderRadius: ".5rem"  }}>
                  <MDBRow className="g-0">
                    <MDBCol
                      md="4"
                      className="gradient-custom text-center text-black ProfileStyle"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                        backgroundColor:"rgba(96, 67, 67, 0.93)"
                      }}
                    >
                      <MDBCardImage
                        src={
                          FacultyData?.image === "noImg"
                            ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            :FacultyData?.image===undefined ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            : `${process.env.REACT_APP_IMG_URL+FacultyData?.image}`
                        }
                        alt="Avatar"
                        className="my-5"
                        style={{ width: "80px",height:"80px",borderRadius:'40px' }}
                        fluid
                      />
                      <MDBTypography tag="h5">{FacultyData?.name}</MDBTypography>
                      {/* <MDBCardText>Web Designer</MDBCardText> */}
                      <Button onClick={HandleClickOpen}>
                        <MDBIcon style={{color:"#1e0f0f"}} icon="edit mb-5" />
                      </Button>{" "}
                      <br />
                      <Button
                        onClick={handleClickOpenPas}
                        className="text-blue psBtn"
                      >
                        Change password?
                      </Button>
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">
                              {FacultyData.email}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Phone</MDBTypography>
                            <MDBCardText className="text-muted">
                              {FacultyData.mobNumber}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">D-O-B</MDBTypography>
                            <MDBCardText className="text-muted">
                              {new Date(FacultyData.DOB).toLocaleDateString()}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Gender</MDBTypography>
                            <MDBCardText className="text-muted">
                              {FacultyData.gender}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">
                              Admission Year
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {FacultyData.admYear}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Department</MDBTypography>
                            <MDBCardText className="text-muted">
                              {FacultyData.department}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>

                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">
                              Guardian Name
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {FacultyData.qualifications}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">
                              Guardian Number
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {FacultyData.teachingArea}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">address</MDBTypography>
                            <MDBCardText className="text-muted">
                              {FacultyData.address}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </Container>
    </div>
  );
}
