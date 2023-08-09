import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "../Pages/StudentPages/Profile/Profile";
import Clubs from "../Pages/StudentPages/Clubs/Clubs";
import Attendance from "../Pages/StudentPages/Attendance/Attendance";
import Result from "../Pages/StudentPages/Result/Result";
import Notice from "../Pages/StudentPages/Notice/Notice";
import LeaveLetterForm from "../Pages/StudentPages/LeaveLetter/LeaveLetter";
import LeaveStatus from "../Pages/StudentPages/LeaveStatus/LeaveStatus";
import AddComplaint from "../Pages/StudentPages/AddComplaint/AddComplaint";
import Logout from "../Pages/CommonPages/Logout/Logout";
import PrivateRoutes from "../../Utils/PrivateRoutes";
import Calander from "../Pages/StudentPages/Calendar/Calander";
import Payment from "../Pages/StudentPages/Payment/Payment";
import Chat from "../Pages/StudentPages/Chat/Chat";

const Student = () => {
  return (
    <div>
      <Routes>
        <Route
          element={
            <PrivateRoutes role={"student"} route={"/student/studentlogin"} />
          }
        >
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/clubs" element={<Clubs />}></Route>
          <Route path="/attendance" element={<Attendance />}></Route>
          <Route path="/result" element={<Result />}></Route>
          <Route path="/notice" element={<Notice />}></Route>
          <Route path="/applyleave" element={<LeaveLetterForm />}></Route>
          <Route path="/leaveStatus" element={<LeaveStatus />}></Route>
          <Route path="/addComplaint" element={<AddComplaint />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/notificationCalander" element={<Calander />}></Route>
          <Route
            path="/logout"
            element={<Logout data={{ logout: "/student" }} />}
          />
        </Route>
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
};

export default Student;
