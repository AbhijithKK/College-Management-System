
import axios from "../Axios/Axios";
import Swal from "sweetalert2"


export const ApiViewDepartment = async (search,pageNo) => {
    let { data } = await axios.get('/admin/department',{params:{search,pageNo}}, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

    if (data === false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',
        })
    }
    return data
}
export const ApiAddDepartment = async (datas) => {
    let { data } = await axios.post('/admin/department', { departmentName: datas }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

    if (data === false) {
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
export const ApiDeleteDepartment = async (id) => {
    let { data } = await axios.delete('/admin/department', { params: { id } }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

    if (data === false) {
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
export const ApiViewSemester = async (Dep,search,pageNo) => {
    let { data } = await axios.get('/admin/semester', { params: { Dep,search,pageNo } }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

    if (data === false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',

        })
    }
    return data
}
export const ApiAddSemester = async (datas) => {
    let { data } = await axios.post('/admin/semester', datas, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

    if (data === false) {
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
export const ApiDeleteSemester = async (id) => {
    console.log(id);
    let { data } = await axios.delete('/admin/semester', { params: { id } }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })
    if (data === false) {
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
export const ApiViewSubjects = async (dep, sem,search,pageNo) => {
    let { data } = await axios.get('/admin/subjects', { params: { dep, sem,search,pageNo } }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })
    if (data === false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',

        })
    }
    return data
}
export const ApiAddSubjects = async (datas, department, className) => {
    let { data } = await axios.post('/admin/subject', { datas, department, className }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })
    if (data === false) {
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
export const ApiDeleteSubjects = async (id) => {
    let { data } = await axios.delete('/admin/subject', { params: { id } }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })
    if (data === false) {
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

export const ApiUploadNotice = async (files, title) => {
    let { data } = await axios.post('/admin/uploadNotice', { files, title }, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
    })
    if (data === false) {
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
export const ApiUpdateStudent = async (id) => {
    let { data } = await axios.get('/admin/updateStudent', { params: { id } }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })
    if (data === false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',

        })
    }
    return data
}

export const ApiStudentUpdatePost = async (id, name, email, mobNumber, address, department,
    dob, admYear, semester, gender, guardianName, guardianNumber, className) => {
    let { data } = await axios.post('/admin/updateStudent', {
        id, name, email, mobNumber, address, department,
        dob, admYear, semester, gender, guardianName, guardianNumber, className
    },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    if (data === false) {
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

export const ApiStudentDelete = async (id) => {
    let data = await axios.delete('/admin/student', { params: { id } }, {
        headers: { 'Content-Type': 'application/json' }, withCredentials: true

    })
    if (data === false) {
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
export const ApiAddStudent = (value) => {
    axios
        .post("/admin/student", value, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((data) => {
            if (data.data === false) {
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

export const ApiAddFaculty = (value) => {
    axios.post('/admin/faculty', value, {
        headers: {
            'Content-Type': 'application/json'
        }, withCredentials: true
    }).then((data) => {
        if (data.data === false) {
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

export const ApiDeleteFaculty = async (id) => {
    let { data } = await axios.delete('/admin/faculty', { params: { id } }, {
        headers: {
            'Content-Type': 'application/json'
        }, withCredentials: true
    })
    if (data === false) {
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

export const ApiFacultyUpdatePost = async (id, name, email, mobNumber, address, department,
    dob, admYear, semester, gender, teachingArea, qualifications, className) => {
    let { data } = await axios.post('/admin/updateFaculty', {
        id, name, email, mobNumber, address, department,
        dob, admYear, semester, gender, teachingArea, qualifications, className
    },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    if (data === false) {
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

export const ApiViewFaculty = async (Dep,search,pages) => {
    let { data } = await axios.get('/admin/facultys', { params: { Dep,search,pages } }, {
        headers: {
            'Content-Type': 'application/json'
        }, withCredentials: true
    })
    if (data === false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',

        })

    }

    return data

}
export const ApiUpdateFaculty = async (id) => {
    let { data } = await axios.get('/admin/updateFaculty', { params: { id } }, {
        headers: {
            'Content-Type': 'application/json'
        }, withCredentials: true
    })
    if (data === false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',

        })

    }
    return data

}

export const ApiViewClass = async (Dep, Sem,search,pageNo) => {
    let { data } = await axios.get('/admin/class', { params: { Dep, Sem,search,pageNo } }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

    if (data === false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',
        })
    }
    return data
}
export const ApiAddClass = async (datas) => {
    let { data } = await axios.post('/admin/class', { className: datas.className, department: datas.department, semester: datas.semester }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

    if (data === false) {
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
export const ApiDeleteClass = async (id) => {
    let { data } = await axios.delete('/admin/class', { params: { id } }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

    if (data === false) {
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
export const ApiViewComplaint = async (search,pageNo) => {
    let { data } = await axios.get('/admin/complaints',{params:{search,pageNo}}, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

    if (data === false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',
        })
    }

    return data
}

export const ApiDeleteComplaint = async (id) => {
    let { data } = await axios.delete('/admin/complaint', { params: { id } }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

    if (data === false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',
        })
    }

    return data
}

export const ApiViewApprovelists = async () => {
    let { data } = await axios.get('/admin/approvelists', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

    if (data === false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Wrong',
        })
    }

    return data
}
export const ApiFacultyProfile = async (id) => {
    let { data } = await axios.get('/admin/facultys',{params:{id}} ,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data?.allFacultys
  }
export const ApiStudentProfile = async (id) => {
    let { data } = await axios.get('/admin/students',{params:{id}} ,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(data,'kk');
    return data?.allStudents
  }
export const ApiupdateRequests = async (id,category) => {
    let { data } = await axios.get('/admin/updateRequests',{params:{id,category}} ,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  }
export const ApiDeleteRequests = async (id) => {
    let { data } = await axios.delete('/admin/approvelists',{params:{id}} ,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  }

  export const ApiPayment = async (title,amount,dueDate) => {
    let { data } = await axios.post('/admin/payment', { title,amount,dueDate}, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
    })
    if (data === false) {
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
export const ApiDeleteCalander = async (id) => {
    let { data } = await axios.delete('/admin/payment',{params:{id}} ,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  }
  export const ApiGetCalender = async () => {
    let { data } = await axios.get('/admin/payment',{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  }
