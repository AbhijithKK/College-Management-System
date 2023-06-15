import React from "react";
import "./mainPage.css";
import admin from "../../assets/admin.png";
import student from "../../assets/student.png";
import faculty from "../../assets/faculty.png";

function MainPage() {
  return (
    <div className="mainpage grid md:grid-cols-6 sm:grid-cols-12 pt-10 pl-9 lg:grid-cols-1 xl:pt-64 pr-11">
      <h1 className="text-3xl font-bold">COLLEGE MANAGEMENT SYSTEM</h1>
      <div className="mainbox grid md:grid-cols-6 justify-center ml-64 sm:grid-cols-12 -ml-16 mt-5 lg:ml-64 xl:ml-96">
        <div className="box mb-4 hover:scale-130 hover:text-white">
          <img src={admin} alt="admin img" />
          <h5>Admin Login</h5>
        </div>
        <div className="box1 mb-4 hover:scale-130 hover:text-white">
          <img src={student} alt="student img" />
          <h5>Student Login</h5>
        </div>
        <div className="box2 mb-4 hover:scale-130 hover:text-white">
          <img src={faculty} alt="faculty img" />
          <h5>Faculty Login</h5>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
