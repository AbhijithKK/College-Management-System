import React from 'react'
import './mainPage.css'
import admin from '../../assets/admin.png'
import student from '../../assets/student.png'
import faculty from '../../assets/faculty.png'
function MainPage() {
  return (
    <div className='mainpage'>
      <h1>COLLEGE MANAGEMENT SYSTEM</h1>
      <div className=" mainbox col-12">

      <div className=' box'>
        <img src={admin} alt="admin img" />
        <h5>Admin Login</h5>
      </div>
      <div className='box1'>
      <img src={student} alt="student img" />
      <h5>Student Login</h5>
      </div>
      <div className='box2'>
      <img src={faculty} alt="faculty img" />
      <h5>Faculty Login</h5>
      </div>
      </div>
    </div>
  )
}

export default MainPage
