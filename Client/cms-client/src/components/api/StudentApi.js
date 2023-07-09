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
export const StudentProfileApi=async()=>{
    let {data}=await axios.get('/student/profile',{
        headers:{
            'Content-Type':'application/json'
        }
    })
    return data
}
export const studentClubApi=async()=>{
  let {data}=await axios.get('/student/clubs',{
    headers:{
        'Content-Type':'application/json'
    }
  })
                  
  return data
}

export const StudentNoticeApi=async()=>{
   let {data}=await axios.get('/student/checknotice',{
        headers:{
            'Content-Type':'application/json'
        }
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
export const StudentProfileUpdateApi=async(name,email,mobNumber,dob,admYear,guardianName,guardianNumber,address,department,
    gender,semester,image)=>{
  let {data}=await  axios.post('/student/updateprofile',{name,email,mobNumber,dob,admYear,guardianName,guardianNumber,address,department,
    gender,semester,image},{
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

export const StudentVerifyMail=async(datas)=>{
let {data}=await axios.post('/student/verifymail',{data:datas},{
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
export const studentSubmitpassApi=async(pass)=>{
    let {data}=axios.post('/student/changepassword',{pass},{
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

export const StudentClubAdminGetApi=async(id)=>{
  let {data}=await  axios
      .get('/admin/facultys',{params:{id}}, {
        headers: {
          'Content-Type': 'application/json'
        }
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


export const StudentClubStatus=async()=>{
  let {data}=await axios.get('/student/clubstatus',{
    headers:{
    'Content-Type':'application/json'
    }
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

export const StudentLeaveApplyApi=async(name, department, semester, classId,reason, date)=>{
  
  let {data}=axios.post('/student/leaveletter',{name, department, semester, classId,reason, date},{
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
       
        text:'Applyed Successfully'

      })
return data
}