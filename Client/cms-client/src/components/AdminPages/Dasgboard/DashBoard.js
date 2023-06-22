import React from "react";
import "./DashBoard.css";
import { Paper } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
const DashBoard = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <div className="mainpaperdiv">
            <Col sm={12} md={4}>
              <Paper elevation={24} className="paper">
              <h3>Total Students</h3>
              <h1>1000</h1>
              </Paper>
            </Col>
            <Col sm={12} md={4}>
              <Paper elevation={24} className="paper">
              <h3>Total Facultys</h3>
              <h1>50</h1>
              </Paper>
            </Col>
            <Col sm={12} md={4}>
              <Paper elevation={24} className="paper">
              <h3>Total Clubs</h3>
              <h1>20</h1>
              </Paper>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default DashBoard;
