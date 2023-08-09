import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import SideBar from '../SideBar/SideBar';
import AddStudent from "../Pages/AdminPages/AddStudents/AddStudent";
import AddClub from "../Pages/AdminPages/AddClub/AddClub";
import ViewStudents from "../Pages/AdminPages/viewStudents/ViewStudents";
import ViewFaculty from "../Pages/AdminPages/ViewFaculty/ViewFaculty";
import ViewDepartment from "../Pages/AdminPages/ViewDepartment/ViewDepartment";
import ViewSemester from "../Pages/AdminPages/ViewSemester/ViewSemester";
import ViewSubjects from "../Pages/AdminPages/ViewSubjects/ViewSubjects";
import ViewComplaint from "../Pages/AdminPages/ViewComplaint/ViewComplaint";
import UploadNotice from "../Pages/AdminPages/UploadNotice/UploadNotice";
import Logout from "../Pages/CommonPages/Logout/Logout";
import ViewClass from "../Pages/AdminPages/viewClass/ViewClass";

import DashBoard from "../Pages/AdminPages/Dasgboard/DashBoard";
import Addfaculty from "../Pages/AdminPages/AddFaculty/AddFaculty";
import PrivateRoutes from "../../Utils/PrivateRoutes";
import ApproveList from "../Pages/AdminPages/ApproveRequests/ApproveRequests";
import CreatePayment from "../Pages/AdminPages/CreatePayment/CreatePayment";

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route
          element={<PrivateRoutes role={"admin"} route={"/admin/adminlogin"} />}
        >
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
          <Route path="/approverequests" element={<ApproveList />} />
          <Route path="/payment" element={<CreatePayment />} />
          <Route
            path="/logout"
            element={<Logout data={{ logout: "/admin" }} />}
          />
        </Route>

        <Route path="/*" element={<Navigate to="/404" />} />
        <Route
          path="/admin/adminlogin"
          element={<Navigate to="/admin/adminlogin" />}
        />
      </Routes>
    </div>
  );
};

export default Admin;
