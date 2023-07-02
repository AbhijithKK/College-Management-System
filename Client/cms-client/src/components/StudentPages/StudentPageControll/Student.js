import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SideBarStudent from '../SideBar/SideBarStudent'
import Profile from '../Profile/Profile'
import Clubs from '../Clubs/Clubs'

const Student = () => {
  return (
      <div>
        <SideBarStudent/>
      <Routes>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/clubs' element={<Clubs/>}></Route>
        
        

      </Routes>
    </div>
  )
}

export default Student
