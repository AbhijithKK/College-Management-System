import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import { Paper } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import axios from "../../../../Utils/Axios/Axios";
import SideBar from "../SideBar/SideBar";
const DashBoard = () => {
  const [data, useData] = useState({});
  useEffect(() => {
    axios
      .get("/admin/home", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        DataHandle(data.data);
      });
  }, []);
  function DataHandle(data) {
    useData(data);
  }

  return (
    <div>
      <SideBar />
      <div
        style={{ backgroundColor: "gray", marginTop: "-65px", height: "100vh" }}
      >
        <Container fluid>
          <Row style={{ marginLeft: "80px" }}>
            <div className="mainpaperdiv">
              <Col sm={12} md={4}>
                <Paper elevation={24} className="paper">
                  <h3>Total Students</h3>
                  <h1>{data.student}</h1>
                </Paper>
              </Col>
              <Col sm={12} md={4}>
                <Paper elevation={24} className="paper">
                  <h3>Total Faculty</h3>
                  <h1>{data.faculty}</h1>
                </Paper>
              </Col>
              <Col sm={12} md={4}>
                <Paper elevation={24} className="paper">
                  <h3>Total Clubs</h3>
                  <h1>{data.clubs}</h1>
                </Paper>
              </Col>
              <Col sm={12} md={4}>
                <Paper elevation={0} className="paper1">
                  <h3> </h3>
                  <h1> </h1>
                </Paper>
              </Col>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DashBoard;
