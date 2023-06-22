import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./login.css";
import admin from '../../assets/admin.png'
import student from '../../assets/student.png'
import faculty from '../../assets/faculty.png'
import { Link } from "react-router-dom";
const LoginForm = (props) => {
  return (
    <div className="mainpage">
      <Container>
        <Row>
          <Col sm={12}>
            <Link to='/' style={{textDecoration:"none"}}><h1 className="title">COLLEGE MANAGEMENT SYSTEM</h1></Link>
          </Col>
        </Row>
        <Row>


          <Col sm={12}>
            <div className="roundedContainer">
              <div className="rounded">
                <img src={
                  props.img === 'faculty' ? faculty :
                    props.img === 'student' ? student :
                      props.img === 'admin' ? admin : ''
                } alt="" />
                <h6>{props.data}</h6>
              </div>
            </div>
          </Col>
          <Col sm={12}>
            <div className="formContainer">

              <Form>
                <Form.Group>
                  <Form.Control type="email" className="emailInput" required />
                  <p className="emailText ">Email</p>
                </Form.Group>
                <Form.Group>
                  <Form.Control type="password" className="emailInput" required />
                  <p className="emailText" >Password</p>
                </Form.Group>
                <Button className="button1" type="submit"  >login</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;
