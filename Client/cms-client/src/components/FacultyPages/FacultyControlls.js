import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'


import Profile from './Profile/Profile'
import ClubRequest from './ClubRequests/ClubRequest'
import CheckLeaveLetter from './CheckLeaveLetter/CheckLeaveLetter'
import AddResult from './AddResult/AddResult'
import AddAttendance from './AddAttendance/AddAttendance'
import AddComplaint from './AddComplaint/AddComplaint'
import Logout from '../Logout/Logout'
import ViewClubs from './ViewClubs/ViewClubs'
import ViewStudents from './ViewStudents/ViewStudents'
import Notice from './Notice/Notice'
import PrivateRoutes from '../../Utils/PrivateRoutes'
import Chat from './Chat/Chat'

const Faculty = () => (
  <div>
    
    <Routes>

      <Route element={<PrivateRoutes role={'faculty'} route={'/faculty/facultylogin'} />}>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/clubs' element={<ClubRequest />}></Route>
      <Route path='/Checkleaveletters' element={<CheckLeaveLetter />}></Route>
      <Route path='/addresult' element={<AddResult />}></Route>
      <Route path='/makeattendance' element={<AddAttendance/>}></Route>
      <Route path='/addComplaint' element={<AddComplaint/>}></Route>
      <Route path='/clubmanage' element={<ViewClubs/>}></Route>
      <Route path='/allstudents' element={<ViewStudents/>}></Route>
      <Route path='/notice' element={<Notice/>}></Route>
      <Route path='/chat' element={<Chat/>}></Route>
      <Route path="/logout" element={<Logout data={{logout:'/faculty'}} />} />

      </Route>
      <Route  path="/*"  element={<Navigate to="/404" />} />
          <Route  path="/faculty/facultylogin"  element={<Navigate to="/faculty/facultylogin" />} />
    </Routes>
  </div>
)

export default Faculty
