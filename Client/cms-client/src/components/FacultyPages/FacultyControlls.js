import React from 'react'
import { Route, Routes } from 'react-router-dom'

import SideBarFaculty from './SideBar/SideBarFaculty'
import Profile from './Profile/Profile'
import ClubRequest from './ClubRequests/ClubRequest'

const Faculty = () => {
  return (
      <div>
        <SideBarFaculty/>
      <Routes>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/clubs' element={<ClubRequest/>}></Route>
        {/* <Route path='/attendance' element={<Attendance/>}></Route> */}
        {/* <Route path='/result' element={<Result/>}></Route> */}
        {/* <Route path='/notice' element={<Notice/>}></Route> */}
         
        

      </Routes>
    </div>
  )
}

export default Faculty
