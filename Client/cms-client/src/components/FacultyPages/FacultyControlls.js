import React from 'react'
import { Route, Routes } from 'react-router-dom'

import SideBarFaculty from './SideBar/SideBarFaculty'
import Profile from './Profile/Profile'
import ClubRequest from './ClubRequests/ClubRequest'
import CheckLeaveLetter from './CheckLeaveLetter/CheckLeaveLetter'
import AddResult from './AddResult/AddResult'
import AddAttendance from './AddAttendance/AddAttendance'
import AddComplaint from './AddComplaint/AddComplaint'
import Logout from '../Logout/Logout'

const Faculty = () => (
  <div>
    <SideBarFaculty />
    <Routes>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/clubs' element={<ClubRequest />}></Route>
      <Route path='/Checkleaveletters' element={<CheckLeaveLetter />}></Route>
      <Route path='/addresult' element={<AddResult />}></Route>
      <Route path='/makeattendance' element={<AddAttendance/>}></Route>
      <Route path='/addComplaint' element={<AddComplaint/>}></Route>
      <Route path="/logout" element={<Logout data={{logout:'/faculty'}} />} />



    </Routes>
  </div>
)

export default Faculty
