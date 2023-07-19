import axios from "../Axios/Axios";
import Swal from "sweetalert2"

export const StudentLoginApi = async (email, password) => {
  let { data } = await axios.post('/student/login', { email, password }, {
    headers: {
      "Content-Type": "application/json"
    }, withCredentials: true
  })
  return data
}
export const StudentProfileApi = async () => {
  let { data } = await axios.get('/student/profile', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data
}
export const studentClubApi = async () => {
  let { data } = await axios.get('/student/clubs', {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return data
}

export const StudentNoticeApi = async (search) => {
  let { data } = await axios.get('/student/checknotice',{params:{search}}, {
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
  return data

}
export const StudentProfileUpdateApi = async (name, email, mobNumber, dob, admYear, guardianName, guardianNumber, address, department,
  gender, semester, image) => {
  let { data } = await axios.post('/student/updateprofile', {
    name, email, mobNumber, dob, admYear, guardianName, guardianNumber, address, department,
    gender, semester, image
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
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

    text: 'Profile Updated',

  })
}

export const StudentVerifyMail = async (datas) => {
  let { data } = await axios.post('/student/verifymail', { data: datas }, {
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
export const studentSubmitpassApi = async (pass) => {
  let { data } = axios.post('/student/changepassword', { pass }, {
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

    text: 'Password Changed Successfully',

  })
  return data
}

export const StudentClubAdminGetApi = async (id) => {
  let { data } = await axios
    .get('/admin/facultys', { params: { id } }, {
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
  return data

}


export const StudentClubStatus = async () => {
  let { data } = await axios.get('/student/clubstatus', {
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
  return data
}

export const StudentLeaveApplyApi = async (reason, date) => {

  let { data } = axios.post('/student/leaveletter', { reason, date }, {
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

    text: 'Applyed Successfully'

  })
  return data
}

export const StudentLeaveLettersApi = async () => {
  let { data } = await axios.get('/student/leaveletters', {
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
  return data
}

export const StudentResultGetApi = async (semWise) => {
  let { data } = await axios.get('/student/result',{params:{semWise}}, {
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
  return data
}

export const StudentAttendencegetApi = async () => {
  let { data } = await axios.get('/student/attendence', {
    headers: {
      "Content-Type": 'application/json'
    }
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
export const StudentCompliantPostApi = async (title, content) => {
  let { data } = await axios.post('/student/addcomplaint', { title, content }, {
    headers: {
      "Content-Type": 'application/json'
    }
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

export const ApiViewSemester = async (Dep,resultSem) => {
  let { data } = await axios.get('/student/semester', { params: { Dep,resultSem } }, {
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

export const ApiViewDepartment = async () => {
  let { data } = await axios.get('/student/department', {
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
export const StudentForgotPassword = async (email) => {
  let { data } = await axios.post('/student/forgotPassword', { email }, {
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
export const StudentChangePassword = async (email, newpass) => {
  let { data } = await axios.post('/student/applypassword', { email, newpass }, {
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

    text: 'Password Changed SuccesFully'
  })
  return data
}
