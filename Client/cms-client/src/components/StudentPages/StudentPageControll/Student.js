import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../Profile/Profile'
import Clubs from '../Clubs/Clubs'
import Attendance from '../Attendance/Attendance'
import Result from '../Result/Result'
import Notice from '../Notice/Notice'
import LeaveLetterForm from '../LeaveLetter/LeaveLetter'
import LeaveStatus from '../LeaveStatus/LeaveStatus'
import AddComplaint from '../AddComplaint/AddComplaint'
import Logout from '../../Logout/Logout'
import PrivateRoutes from '../../../Utils/PrivateRoutes'
import Calander from '../Calendar/Calander'
import Payment from '../Payment/Payment'

const Student = () => {
  return (
      <div>
        
      <Routes>

        <Route  element={<PrivateRoutes role={'student'} route={"/student/studentlogin"} />}>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/clubs' element={<Clubs/>}></Route>
        <Route path='/attendance' element={<Attendance/>}></Route>
        <Route path='/result' element={<Result/>}></Route>
        <Route path='/notice' element={<Notice/>}></Route>
        <Route path='/applyleave' element={<LeaveLetterForm/>}></Route>
        <Route path='/leaveStatus' element={<LeaveStatus/>}></Route>
        <Route path='/addComplaint' element={<AddComplaint/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
        <Route path='/notificationCalander' element={<Calander/>}></Route>
        <Route path="/logout" element={<Logout data={{logout:'/student'}} />} />
        </Route>
        <Route  path="/*"  element={<Navigate to="/404" />} />
       
      </Routes>
    </div>
  )
}

export default Student
