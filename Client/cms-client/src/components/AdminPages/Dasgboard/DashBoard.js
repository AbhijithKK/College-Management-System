import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import { Paper } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import axios from '../../Axios/Axios'
import SideBar from '../SideBar/SideBar';
const DashBoard = () => {
  const [data,useData]=useState({})
  useEffect(()=>{
    axios.get('/admin/home',{
      headers:{
        'Content-Type':'application/json'
      }
    }).then((data)=>{
     
     DataHandle(data.data)
    })
  },[])
function  DataHandle(data){
  useData(data)
}

  return (
    <div>
      <SideBar />
      <Container fluid>
        <Row>
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
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default DashBoard;
