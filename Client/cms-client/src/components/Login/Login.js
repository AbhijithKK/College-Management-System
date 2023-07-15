import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./login.css";
import admin from '../../assets/admin.png'
import student from '../../assets/student.png'
import faculty from '../../assets/faculty.png'
import { Link, useNavigate } from "react-router-dom";
import axios from "../Axios/Axios";
import { useDispatch } from "react-redux";
import { StudentChangePassword, StudentForgotPassword, StudentLoginApi } from "../api/StudentApi";
import { FacultyLoginApi } from "../api/FacultyApi";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useMediaQuery, useTheme } from "@mui/material";


const LoginForm = (props) => {
  const [mail, useMail] = useState('');
  const [password, usePassword] = useState('');
  const [errMsg, useErrmsg] = useState('');
  const history = useNavigate();
  const dispatch = useDispatch()
  const HandleEmailChange = (value) => {
    useMail(value);
  };

  const HandlePasswordChange = (value) => {
    usePassword(value);
  };

  const HandleErrmsg = () => {
    useErrmsg('Enter correct username and password');
  };

  const HandleSend = async() => {
    if (props.img === 'admin') {


      console.log(mail, password);
      axios.post('/admin/adminLogin', { mail, password }, {
        Headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then((e) => {
        if (e.data === true) {
          history('/admin/dashboard');

          dispatch({ type: 'refresh' })
        } else {
          HandleErrmsg();
        }
      });
    } else if (props.img === 'student') {
    let data=await StudentLoginApi(mail, password)
      if (data===false) {
        
        ErrMsg('Invalid username or password')
      }else{
        history('/student/profile');

        dispatch({ type: 'refresh' })
      }
    } else if (props.img === 'faculty') {
      let data =await FacultyLoginApi(mail,password)
      if (data===false) {
        
        ErrMsg('Invalid username or password')
      }else{
        history('/faculty/profile');

        dispatch({ type: 'refresh' })
      }
    }
  };
  const ErrMsg=(data)=>{
    useErrmsg(data)
  }

 const ForgotPass=()=>{
  handleClickOpenPas()
 }




//   ===========>PASSWORD MODAL<============
const [openPas, setOpenPas] = React.useState(false);
const [emailOrPhone, setEmailOrPhone] = React.useState('');
const [otp, setOtp] = React.useState('');
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
const [text, setText] = useState(' Enter your Registered Email ')
const [label1, setLabel1] = useState("Email ")
const [btnText, setBtnText] = useState("Send OTP")
const [errMsgs, setErrMsg] = useState('')
const [cameOtp, setcameOtp] = useState(0)
const handleClickOpenPas = () => {
  setOpenPas(true);
};

const handleClosepas = () => {
  setOpenPas(false);
};

const handleVerify = async () => {
  if (emailOrPhone.trim()) {
    
  
  let data = await StudentForgotPassword(emailOrPhone)
  console.log(data,'ll');
  if (data.otp === false) {
    setErrMsg(data.text)
  } else {
    setcameOtp(data.otp)
    setText('Enter your OTP')
    setLabel1('Enter OTP')
    setBtnText('Verify')
    setErrMsg('')
  }
}else{
  setErrMsg('Enter Your Email Address')
}
}
const VerifyOtp = async() => {
  
  if (otp === cameOtp) {
    
    handleClosepas()
    handleClickOpenPas1()
    setErrMsg('')
    
  } else {

    setErrMsg('Enter Currect OTP')
  }

}
// ================================================

// =============================password change==========================
const [open1, setOpenPas1] = React.useState(false);

const handleClickOpenPas1 = () => {
  setOpenPas1(true);
};

const handleClosepas1 = () => {
  setOpenPas1(false);
};

const [newpass, SetNewpass] = useState('')
const [confirmPass, setConfirmPass] = useState('')
const SubmitPass = async () => {
  if (newpass === confirmPass &&newpass.trim() && confirmPass.trim()) {
    await StudentChangePassword(emailOrPhone,newpass)
   
    handleClosepas1()

  } else {
    setErrMsg('password not match')
  }
}
// ======================================================================




  return (
    <div className="mainpage">

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
  <p style={{ color: 'red',marginLeft:'10px' }}>{errMsgs}</p>
    <DialogContentText>
      Change Password
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      label='Enter New password'
      type="text"
      value={newpass}
      onChange={(e) => SetNewpass(e.target.value)}
      fullWidth
    />
    <TextField
      autoFocus
      margin="dense"
      label='Enter Confirm password'
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
  <p style={{ color: 'red',marginLeft:'10px' }}>{errMsgs}</p>
    <DialogContentText>
      {text}
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      label={label1}
      type="email"
      value={btnText === 'Verify' ? otp : emailOrPhone}
      onChange={btnText === 'Verify' ? (e) => setOtp(e.target.value) : (e) => setEmailOrPhone(e.target.value)}
      fullWidth
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={btnText === 'Verify' ? VerifyOtp : handleVerify} autoFocus>
      {btnText}
    </Button>
  </DialogActions>

</Dialog>
</div>

{/* ======================================== */}





      <Container>
        <Row>
          <Col sm={12}>
            <Link to='/' style={{ textDecoration: "none" }}>
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
                    props.img === 'faculty' ? faculty :
                      props.img === 'student' ? student :
                        props.img === 'admin' ? admin : ''
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
                <p style={{ color: 'red', fontWeight: 'bold' }}>{errMsg}</p>
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
                <p onClick={ForgotPass} className="forgotPass">Forgot Password?</p>
                <Button
                  className="button1"
                  type="button"
                  onClick={HandleSend}
                >
                  login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;
