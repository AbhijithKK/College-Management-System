import { useDispatch } from 'react-redux'
import axios from '../Axios/Axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    axios.get('/admin/logout',{
        headers:{
            'Content-Type':'application/json'
        }
    }).then((data)=>{
        if(data.data===true){
        navigate('/')
        dispatch({type:'refresh'})
        }
    })
  return (
    <div>
      
    </div>
  )
}

export default Logout
