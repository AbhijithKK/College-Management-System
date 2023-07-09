import React from 'react'
import { Route, Routes } from 'react-router-dom'

import SideBarFaculty from './SideBar/SideBarFaculty'
import Profile from './Profile/Profile'
import ClubRequest from './ClubRequests/ClubRequest'
import CheckLeaveLetter from './CheckLeaveLetter/CheckLeaveLetter'
import AddResult from './AddResult/AddResult'

const Faculty = () => {
  return (
      <div>
        <SideBarFaculty/>
      <Routes>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/clubs' element={<ClubRequest/>}></Route>
        <Route path='/Checkleaveletters' element={<CheckLeaveLetter/>}></Route>
        <Route path='/addresult' element={<AddResult/>}></Route>
        {/* <Route path='/notice' element={<Notice/>}></Route> */}
         
        

      </Routes>
    </div>
  )
}

export default Faculty
