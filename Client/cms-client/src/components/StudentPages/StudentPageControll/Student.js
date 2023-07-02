import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SideBarStudent from '../SideBar/SideBarStudent'

const Student = () => {
  return (
    <div>
      <Routes>
        <Route path='*' element={<SideBarStudent/>}></Route>
      </Routes>
    </div>
  )
}

export default Student
