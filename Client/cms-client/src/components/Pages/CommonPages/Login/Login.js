import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./login.css";
import admin from "../../../../assets/admin.png";
import student from "../../../../assets/student.png";
import faculty from "../../../../assets/faculty.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../../Utils/Axios/Axios";
import { useDispatch } from "react-redux";
import MainpageJpg from "../../../../assets/mainPage.jpg";
import {
  StudentChangePassword,
  StudentForgotPassword,
  StudentLoginApi,
} from "../../../api/StudentApi";
import {
  FacultyChangePassword,
  FacultyForgotPassword,
  FacultyLoginApi,
} from "../../../api/FacultyApi";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LoaderPage from "../LoaderPage";

const LoginForm = (props) => {
  const [mail, useMail] = useState("");
  const [password, usePassword] = useState("");
  const [errMsg, useErrmsg] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleEmailChange = (value) => {
    useMail(value);
  };

  const HandlePasswordChange = (value) => {
    usePassword(value);
  };

  const HandleErrmsg = () => {
    useErrmsg("Enter correct username and password");
  };

  const HandleSend = async () => {
    if (props.img === "admin") {
      axios
        .post(
          "/admin/adminLogin",
          { mail, password },
          {
            Headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((e) => {
          if (e.data === true) {
            Navigate("/admin/dashboard");

            dispatch({ type: "refresh" });
          } else {
            HandleErrmsg();
          }
        });
    } else if (props.img === "student") {
      let data = await StudentLoginApi(mail, password);
      if (data === false) {
        ErrMsg("Invalid username or password");
      } else {
        Navigate("/student/profile");

        dispatch({ type: "refresh" });
      }
    } else if (props.img === "faculty") {
      let data = await FacultyLoginApi(mail, password);
      if (data === false) {
        ErrMsg("Invalid username or password");
      } else {
        Navigate("/faculty/profile");

        dispatch({ type: "refresh" });
      }
    }
  };
  const ErrMsg = (data) => {
    useErrmsg(data);
  };

  const ForgotPass = () => {
    handleClickOpenPas();
  };

  //   ===========>PASSWORD MODAL<============
  const [openPas, setOpenPas] = React.useState(false);
  const [emailOrPhone, setEmailOrPhone] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [text, setText] = useState(" Enter your Registered Email ");
  const [label1, setLabel1] = useState("Email ");
  const [btnText, setBtnText] = useState("Send OTP");
  const [errMsgs, setErrMsg] = useState("");
  const [cameOtp, setcameOtp] = useState(0);
  const handleClickOpenPas = () => {
    setOpenPas(true);
  };

  const handleClosepas = () => {
    setOpenPas(false);
  };

  const handleVerify = async () => {
    if (emailOrPhone.trim()) {
      let data;
      if (props.img === "student") {
        data = await StudentForgotPassword(emailOrPhone);
      } else if (props.img === "faculty") {
        data = await FacultyForgotPassword(emailOrPhone);
      }
      if (data.otp === false) {
        setErrMsg(data.text);
      } else {
        count = count + 1;
        setCounts(count);
        startTimer();
        setcameOtp(data.otp);
        setText("Enter your OTP");
        setLabel1("Enter OTP");
        setBtnText("Verify");
        setErrMsg("");
      }
    } else {
      setErrMsg("Enter Your Email Address");
    }
  };

  let [count, setCounts] = useState(1);
  const ResendOtp = () => {
    if (count < 3) {
      handleVerify();
    } else {
      setErrMsg("time is up Start again");
    }
  };
  const [timer, setCount] = useState(50);
  let intervalId;

  const startTimer = () => {
    let start = 50;
    let count = 1;
    intervalId = setInterval(() => {
      if (start - count >= 0) {
        setCount(start - count);
        count++;
      } else {
        setcameOtp(undefined);
        clearInterval(intervalId);
      }
    }, 1000);
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
      if (props.img === "student") {
        await StudentChangePassword(emailOrPhone, newpass);
      } else if (props.img === "faculty") {
        await FacultyChangePassword(emailOrPhone, newpass);
      }

      handleClosepas1();
    } else {
      setErrMsg("password not match");
    }
  };
  // =====================================================================
  const [loader, setLoader] = useState(true);

  const handleImageLoad = () => {
    setLoader(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  return (
    <>
    {loader === true ? (
      <>
        <LoaderPage />
        
      </>
    ) : (
    <div className="mainpage" onLoad={handleImageLoad} style={{ backgroundImage:`url(${MainpageJpg})` }}>
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
          <DialogContent>
            <p style={{ color: "red", marginLeft: "10px" }}>{errMsgs}</p>
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
          <DialogContent>
            <p style={{ color: "red", marginLeft: "10px" }}>{errMsgs}</p>
            <DialogContentText>{text}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label={label1}
              type="email"
              value={btnText === "Verify" ? otp : emailOrPhone}
              onChange={
                btnText === "Verify"
                  ? (e) => setOtp(e.target.value)
                  : (e) => setEmailOrPhone(e.target.value)
              }
              fullWidth
            />
            {btnText === "Verify" ? (
              timer === 0 ? (
                <p
                  className="resenOtp"
                  onClick={ResendOtp}
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Resend otp
                </p>
              ) : (
                <p>Resend 00:{timer}</p>
              )
            ) : (
              ""
            )}
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

      <Container>
        <Row>
          <Col sm={12}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1 className="title">COLLEGE MANAGEMENT SYSTEM</h1>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="roundedContainer">
              <div className="rounded">
                <img
                  src={
                    props.img === "faculty"
                      ? faculty
                      : props.img === "student"
                      ? student
                      : props.img === "admin"
                      ? admin
                      : ""
                  }
                  alt=""
                />
                <h6>{props.data}</h6>
              </div>
            </div>
          </Col>
          <Col sm={12}>
            <div className="formContainer">
              <Form>
                <p style={{ color: "red", fontWeight: "bold" }}>{errMsg}</p>
                <Form.Group>
                  <Form.Control
                    type="email"
                    name="email"
                    value={mail}
                    onChange={(e) => HandleEmailChange(e.target.value)}
                    className="emailInput"
                    required
                  />
                  <p className="emailText">Email</p>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => HandlePasswordChange(e.target.value)}
                    className="emailInput"
                    required
                  />
                  <p className="emailText">Password</p>
                </Form.Group>
                {props.img === "admin" ? (
                  ""
                ) : (
                  <p onClick={ForgotPass} className="forgotPass">
                    Forgot Password?
                  </p>
                )}
                <Button className="button1" type="button" onClick={HandleSend}>
                  login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>)}
    </>
  );
};

export default LoginForm;
