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

    export const FacultyClubrequestSend=async(studentName, department, semester,
        clubName,clubAdminId, clubAdminName,studentId,clubId)=>{
        let {data}=await axios.post('/faculty/clubRequest',{studentName, department, semester,
            clubName,status:'Request Send', clubAdminId, clubAdminName,studentId,clubId},{
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
               
                text: data
              })
           
        return data

    }
    export const FacultyClubStatus=async()=>{
        let {data}=await axios.get('/faculty/ClubRequests',{
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
      export const FacultyClubRequestUpdated=async(id,status)=>{
        let {data}=await axios.post('/faculty/clubrequestupdate',{id,status},{
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

      export const FacultyLeaveLettersApi=async()=>{
        let {data}=await axios.get('/faculty/leaveletters',{
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

      export const FacultyLeaveActionApi=async(id,status)=>{
        let {data}=await axios.post('/faculty/leaveletterStatus',{id,status},{
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