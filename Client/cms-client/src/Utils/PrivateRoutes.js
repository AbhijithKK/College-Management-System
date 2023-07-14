import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from '../components/Axios/Axios'
import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = ({ role, route }) => {

  const dispatch = useDispatch()
  let navigate = useNavigate()
  const { refresh } = useSelector((state) => {

    return state
  })

  const [auth, setAuth] = useState(null)

  console.log(role);
  useEffect(() => {
    if (role === 'admin') {

      axios.get('/admin/checkAuth', {
        headers: { 'Content-Type': 'application/json' }
      }).then((data) => {
        if (data.data === true) {
          setAuth(true)
        } else {
          setAuth(false)
        }
        dispatch({ type: 'admin', payload: { login: data.data } })

      })
    } else if (role === 'student') {
      axios.get('/student/checkAuth', {
        headers: { 'Content-Type': 'application/json' }
      }).then((data) => {
        if (data.data === true) {
          setAuth(true)
        } else {
          setAuth(false)
        }
        dispatch({ type: 'student', payload: { login: data.data } })

      })
    } else if (role === 'faculty') {
      axios.get('/faculty/checkAuth', {
        headers: { 'Content-Type': 'application/json' }
      }).then((data) => {
        if (data.data === true) {
          setAuth(true)
        } else {
          setAuth(false)
        }
        dispatch({ type: 'faculty', payload: { login: data.data } })

      })
    }
  }, [refresh, dispatch, role])
  console.log(auth);
  if (auth == null) return;
  return (
    <div>
      {auth ? <Outlet /> : navigate(route)}
    </div>
  )
}

export default PrivateRoutes
