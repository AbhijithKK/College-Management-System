
import axios from "../Axios/Axios";
import Swal from "sweetalert2"


export const  ApiViewDepartment=async()=>{
   let {data}=await axios.get('/admin/viewDepartment',{
        headers:{'Content-Type':'application/json'},
        withCredentials:true
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
export const  ApiAddDepartment=async(datas)=>{
    let {data}=await axios.post('/admin/department',{departmentName:datas},{
         headers:{'Content-Type':'application/json'},
         withCredentials:true
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
 export const ApiDeleteDepartment=async(id)=>{
    let {data}=await axios.get('/admin/deleteDepartment',{params:{id}},{
         headers:{'Content-Type':'application/json'},
         withCredentials:true
     })
 
     if (data===false) {
         Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'Something Wrong',
           })
     }
     Swal.fire({
        icon: 'warning',
       
        text: 'Department Deleted',
      })
     
     return data
 }
export const ApiViewSemester=async()=>{
   let {data}=await axios.get('/admin/viewSemester',{
        headers:{'Content-Type':'application/json'},
        withCredentials:true
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
export const ApiAddSemester=async(datas)=>{
    let {data}=await axios.post('/admin/semester',datas,{
         headers:{'Content-Type':'application/json'},
         withCredentials:true
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
        text: data,
      })
      
     return data
 }
export const ApiDeleteSemester=async(id)=>{
    console.log(id);
   let {data}=await axios.get('/admin/deleteSemester',{params:{id}},{
        headers:{'Content-Type':'application/json'},
        withCredentials:true
    })
    if (data===false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',

          })
    }
    Swal.fire({
        icon: 'error',
        
        text: data,

      })
    return data
}
export const ApiViewSubjects=async(dep)=>{
   let {data}=await axios.get('/admin/viewSubjects',{params:{dep}},{
        headers:{'Content-Type':'application/json'},
        withCredentials:true
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
export const ApiAddSubjects=async(datas)=>{
   let {data}=await axios.post('/admin/subject',{datas},{
        headers:{'Content-Type':'application/json'},
        withCredentials:true
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
        text: data,
    })
    return data
}
export const ApiDeleteSubjects=async(id)=>{
   let {data}=await axios.get('/admin/deleteSubject',{params:{id}},{
        headers:{'Content-Type':'application/json'},
        withCredentials:true
    })
    if (data===false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',

          })
         
    }
    Swal.fire({
        icon: 'error',
        text: data,
    })
    return data
}

export const ApiUploadNotice=async(files,title)=>{
    let {data}=await axios.post('/admin/uploadNotice',{files,title},{
         headers:{'Content-Type':'multipart/form-data'},
         withCredentials:true
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
         text: data,
     })
     return data
 }