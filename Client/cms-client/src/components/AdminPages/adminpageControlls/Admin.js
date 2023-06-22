import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import AddStudent from '../AddStudents/AddStudent';
import AddFaculty from '../AddFaculty/AddFaculty';
import AddClub from '../AddClub/AddClub';
import AddDepartment from '../viewStudents/ViewStudents';
import ViewStudents from '../viewStudents/ViewStudents';
import ViewFaculty from '../ViewFaculty/ViewFaculty';
import ViewClubRequest from '../ViewClubRequest/ViewClubRequest';
import ViewSemester from '../ViewSemester/ViewSemester';
import ViewSubjects from '../ViewSubjects/ViewSubjects';
import ViewComplaint from '../ViewComplaint/ViewComplaint';
import UploadNotice from '../UploadNotice/UploadNotice';
import Dashboard from '../Dasgboard/DashBoard';

const Admin = () => {
  return (
    <div>
      <SideBar />
      <Router>
        <Routes>
          <Route path="/dashbord" element={<Dashboard />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/addfaculty" element={<AddFaculty />} />
          <Route path="/addclub" element={<AddClub />} />
          <Route path="/viewdepartments" element={<AddDepartment />} />
          <Route path="/viewstudents" element={<ViewStudents />} />
          <Route path="/viewfaculty" element={<ViewFaculty />} />
          <Route path="/viewclubrequests" element={<ViewClubRequest />} />
          <Route path="/viewsemester" element={<ViewSemester />} />
          <Route path="/viewsubjects" element={<ViewSubjects />} />
          <Route path="/viewcomplaint" element={<ViewComplaint />} />
          <Route path="/uploadnotice" element={<UploadNotice />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Admin;
