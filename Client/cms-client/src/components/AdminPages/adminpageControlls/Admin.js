import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import AddStudent from '../AddStudents/AddStudent';
import AddFaculty from '../AddFaculty/AddFaculty';
import AddClub from '../AddClub/AddClub';
import ViewStudents from '../viewStudents/ViewStudents';
import ViewFaculty from '../ViewFaculty/ViewFaculty';
import ViewDepartment from '../ViewDepartment/ViewDepartment';
import ViewSemester from '../ViewSemester/ViewSemester';
import ViewSubjects from '../ViewSubjects/ViewSubjects';
import ViewComplaint from '../ViewComplaint/ViewComplaint';
import UploadNotice from '../UploadNotice/UploadNotice';
import Dashboard from '../Dasgboard/DashBoard';
import Logout from '../../Logout/Logout';

const Admin = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div>
      <SideBar />
      <div className={`content ${isDashboard ? 'dashboard-content' : ''}`}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/addfaculty" element={<AddFaculty />} />
          <Route path="/addclub" element={<AddClub />} />
          <Route path="/viewdepartments" element={<ViewDepartment />} />
          <Route path="/viewstudents" element={<ViewStudents />} />
          <Route path="/viewfaculty" element={<ViewFaculty />} />
          <Route path="/viewclubrequests" element={<ViewDepartment />} />
          <Route path="/viewsemester" element={<ViewSemester />} />
          <Route path="/viewsubjects" element={<ViewSubjects />} />
          <Route path="/viewcomplaint" element={<ViewComplaint />} />
          <Route path="/uploadnotice" element={<UploadNotice />} />
          <Route path="/logout" element={<Logout/>} />

        </Routes>
      </div>
    </div>
  );
};

export default Admin;
