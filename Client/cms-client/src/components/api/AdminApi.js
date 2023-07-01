
import axios from "../Axios/Axios";
import Swal from "sweetalert2"


export const  ApiViewDepartment=async()=>{
   let {data}=await axios.get('/admin/department',{
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
   let {data}=await axios.get('/admin/semester',{
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
   let {data}=await axios.get('/admin/subjects',{params:{dep}},{
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
 export const ApiUpdateStudent=async(id)=>{
   let {data}=await axios.get('/admin/updateStudent',{params:{id}},{
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

 export const ApiStudentUpdatePost=async(id,name,email,mobNumber,address,department,
    dob,admYear,semester,gender,guardianName,guardianNumber)=>{
    let {data}=await axios.post('/admin/updateStudent',{id,name,email,mobNumber,address,department,
       dob,admYear, semester,gender,guardianName,guardianNumber},
        {headers:{
            'Content-Type':'application/json'
        }})
        if (data===false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something Wrong',
    
              })
             
        }
       
        Swal.fire({
            icon: 'success',
            text: 'Student Data Updated',
        })
        return data
 }

 export const ApiStudentDelete=async(id)=>{
    let data =await axios.get('/admin//deleteStudent',{params:{id}},{
        headers:{'Content-Type':'application/json'},withCredentials:true

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
        text: 'Student data Deleted',
    })
    return data
 }
 export const ApiAddStudent=(value)=>{
    axios
      .post("/admin/student", value, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((data) => {
        if (data.data===false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something Wrong',
    
              })
             
        }
       
        Swal.fire({
            icon: 'success',
            text: data.data,
        })
        return data.data
      });
 }

 export const ApiAddFaculty=(value)=>{
    axios.post('/admin/faculty',value,{
        headers:{
            'Content-Type':'application/json'
        },withCredentials:true
    }).then((data)=>{
        if (data.data===false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something Wrong',
    
              })
             
        }
       
        Swal.fire({
            icon: 'success',
            text: data.data,
        })
        return data.data
    })
 }

 export const ApiDeleteFaculty=async(id)=>{
  let {data}=await axios.get('/admin/deleteFaculty',{params:{id}},{
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
        text: data,
    })
    return data

 }

 export const ApiFacultyUpdatePost=async(id,name,email,mobNumber,address,department,
    dob,admYear,semester,gender,teachingArea,qualifications)=>{
    let {data}=await axios.post('/admin/updateFaculty',{id,name,email,mobNumber,address,department,
       dob,admYear, semester,gender,teachingArea,qualifications},
        {headers:{
            'Content-Type':'application/json'
        }})
        if (data===false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something Wrong',
    
              })
             
        }
       
        Swal.fire({
            icon: 'success',
            text: 'Faculty Data Updated',
        })
        return data
 }

export const ApiViewFaculty=async(Dep)=>{
  let {data}=await axios.get('/admin/facultys',{params:{Dep}},{
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
 export const ApiUpdateFaculty=async(id)=>{
    let {data}=await axios.get('/admin/updateFaculty',{params:{id}},{
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