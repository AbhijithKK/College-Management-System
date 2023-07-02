import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./login.css";
import admin from '../../assets/admin.png'
import student from '../../assets/student.png'
import faculty from '../../assets/faculty.png'
import { Link, useNavigate } from "react-router-dom";
import axios from "../Axios/Axios";
import { useDispatch } from "react-redux";
import { StudentLoginApi } from "../api/StudentApi";

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

    }
  };
  const ErrMsg=(data)=>{
    useErrmsg(data)
  }

  console.log(password);

  return (
    <div className="mainpage">
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
