import React from 'react';
import {   Navigate, Route, Routes,} from 'react-router-dom';
// import SideBar from '../SideBar/SideBar';
import AddStudent from '../AddStudents/AddStudent';
import AddClub from '../AddClub/AddClub';
import ViewStudents from '../viewStudents/ViewStudents';
import ViewFaculty from '../ViewFaculty/ViewFaculty';
import ViewDepartment from '../ViewDepartment/ViewDepartment';
import ViewSemester from '../ViewSemester/ViewSemester';
import ViewSubjects from '../ViewSubjects/ViewSubjects';
import ViewComplaint from '../ViewComplaint/ViewComplaint';
import UploadNotice from '../UploadNotice/UploadNotice';
import Logout from '../../Logout/Logout';
import ViewClass from '../viewClass/ViewClass';

import DashBoard from '../Dasgboard/DashBoard';
import Addfaculty from '../AddFaculty/AddFaculty';
import PrivateRoutes from '../../../Utils/PrivateRoutes';

const Admin = () => {
  
  return (
    <div>

        
          
          <Routes>
        <Route element={<PrivateRoutes role={'admin'} route={'/admin/adminlogin'} />} >
        <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/addfaculty" element={<Addfaculty />} />
          <Route path="/addclub" element={<AddClub />} />
          <Route path="/viewdepartments" element={<ViewDepartment />} />
          <Route path="/viewstudents" element={<ViewStudents />} />
          <Route path="/viewfaculty" element={<ViewFaculty />} />
          <Route path="/viewclass" element={<ViewClass />} />
          <Route path="/viewsemester" element={<ViewSemester />} />
          <Route path="/viewsubjects" element={<ViewSubjects />} />
          <Route path="/viewcomplaint" element={<ViewComplaint />} />
          <Route path="/uploadnotice" element={<UploadNotice />} />
          <Route path="/logout" element={<Logout data={{logout:'/admin'}} />} />
          </Route>

          <Route  path="/*"  element={<Navigate to="/404" />} />
          <Route  path="/admin/adminlogin"  element={<Navigate to="/admin/adminlogin" />} />
          </Routes>
       
      </div>
    
  );
};

export default Admin;
