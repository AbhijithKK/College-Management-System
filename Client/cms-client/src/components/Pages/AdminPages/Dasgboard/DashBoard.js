import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import { Paper } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import axios from "../../../../Utils/Axios/Axios";
import SideBar from "../SideBar/SideBar";
import { FaUser, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
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
        style={{  marginTop: "-65px", height: "100vh" }}
      >
        <Container fluid>
          <Row style={{ marginLeft: "80px" }}>
            <div className="mainpaperdiv">
              <Col sm={12} md={4}>
                <Paper elevation={24} className="paper">
                  <div className="AlignCenderDash">
                  <div className="card-icon">
                    <FaUser />
                  </div>
                  <h3 className="card-title">Total Students</h3>
                  <h1 className="count-text">{data.student}</h1>
                  </div>
                </Paper>
              </Col>
              <Col sm={12} md={4}>
                <Paper elevation={24} className="paper">
                <div className="AlignCenderDash">
                  <div className="card-icon">
                    <FaChalkboardTeacher />
                  </div>
                  <h3 className="card-title">Total Faculty</h3>
                  <h1 className="count-text">{data.faculty}</h1>
                  </div>
                </Paper>
              </Col>
              <Col sm={12} md={4}>
                <Paper elevation={24} className="paper">
                <div className="AlignCenderDash">
                  <div className="card-icon">
                    <FaUsers />
                  </div>
                  <h3 className="card-title">Total Clubs</h3>
                  <h1 className="count-text">{data.clubs}</h1>
                  </div>
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
