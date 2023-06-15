import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Adminlogin.css";
const Adminlogin = () => {
  return (
    <div className="mainpage">
      <Container>
        <Row>
          <Col sm={12}>
            <h1 className="title">COLLEGE MANAGEMENT SYSTEM</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div>
              <Form>
                <Form.Group>
                  <Form.Control type="email" className="emailInput" />
                  <p className="emailText">Email</p>
                </Form.Group>
                <Form.Group>
                  <Form.Control type="email" className="emailInput" />
                  <p className="emailText">Email</p>
                </Form.Group>
                <Button type="submit">login</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Adminlogin;
