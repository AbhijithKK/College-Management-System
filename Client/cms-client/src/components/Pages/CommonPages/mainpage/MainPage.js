import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./MainPage.css";
import admin from "../../../../assets/admin.png";
import student from "../../../../assets/student.png";
import faculty from "../../../../assets/faculty.png";
import { Link } from "react-router-dom";
import LoaderPage from "../LoaderPage";
import MainpageJpg from "../../../../assets/mainPage.jpg";
const MainPage = () => {
  const [loader, setLoader] = useState(true);

  const handleImageLoad = () => {
    setLoader(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  return (
    <>
      {loader === true ? (
        <>
          <LoaderPage />
          
        </>
      ) : (
        <div onLoad={handleImageLoad}
          className="mainpage"
          style={{ backgroundImage:`url(${MainpageJpg})` }}
        >
          <img
            src={MainpageJpg}
            alt="background"
            
            style={{ display: "none" }} // Hide the image element
          />
          <Container>
            <Row>
              <Col sm={12}>
                <h1 className="title">COLLEGE MANAGEMENT SYSTEM</h1>
              </Col>
            </Row>
            <Row>
              <Col sm={12}></Col>
              <Col sm={12} md={12}>
                <div className="mainbox  mt-5">
                  <div className="box mb-4 ">
                    <img src={admin} alt="admin img" />
                    <Link to="/admin/adminlogin">
                      {" "}
                      <h5>Admin Login</h5>
                    </Link>
                  </div>
                  <div className="box1 mb-4 ">
                    <img src={student} alt="student img" />
                    <Link to="/student/studentlogin">
                      <h5>Student Login</h5>
                    </Link>
                  </div>
                  <div className="box2 mb-4 ">
                    <img src={faculty} alt="faculty img" />
                    <Link to="/faculty/facultylogin">
                      <h5>Faculty Login</h5>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default MainPage;
