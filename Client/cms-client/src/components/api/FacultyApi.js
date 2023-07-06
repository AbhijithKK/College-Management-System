import axios from "../Axios/Axios";
import Swal from "sweetalert2"

export const FacultyLoginApi=async(email,password)=>{
  let {data}=await  axios.post('/faculty/login',{email,password},{
        headers:{
            "Content-Type":"application/json"
        },withCredentials:true
    })
    return data
}

export const FacultyProfileApi=async()=>{
    let {data}=await axios.get('/faculty/profile',{
        headers:{
            'Content-Type':'application/json'
        }
    })
    return data
}
export const FacultyProfileUpdateApi=async(name, email, mobNumber, dob, admYear, qualifications, teachingArea, address, department,
    gender,  image)=>{
  let {data}=await  axios.post('/faculty/updateprofile',{name, email, mobNumber, dob, admYear, qualifications, teachingArea, address, department,
    gender,  image},{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
    if (data===false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',

          })
        }
        Swal.fire({
            icon: 'success',
            
            text: 'Profile Updated',

          })
}
export const FacultyVerifyMail=async(datas)=>{
    let {data}=await axios.post('/faculty/verifymail',{data:datas},{
        headers:{
            'Content-Type':'application/json'
        },withCredentials:true
    })
    if (data===false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',
    
          })
        }
    return data
    
    }
    export const FacultySubmitpassApi=async(pass)=>{
        let {data}=axios.post('/faculty/changepassword',{pass},{
            headers:{
                'Content-Type':'application/json'
            },withCredentials:true
        })
        if (data===false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something Wrong',
        
              })
            }
            Swal.fire({
                icon: 'success',
               
                text: 'Password Changed Successfully',
        
              })
        return data
    }