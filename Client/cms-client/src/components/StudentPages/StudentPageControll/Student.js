import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SideBarStudent from '../SideBar/SideBarStudent'
import Profile from '../Profile/Profile'

const Student = () => {
  return (
      <div>
        <SideBarStudent/>
      <Routes>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </div>
  )
}

export default Student
