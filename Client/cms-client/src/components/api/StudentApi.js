import axios from "../Axios/Axios";
import Swal from "sweetalert2"

export const StudentLoginApi=async(email,password)=>{
  let {data}=await  axios.post('/student/login',{email,password},{
        headers:{
            "Content-Type":"application/json"
        },withCredentials:true
    })
    return data
}