import axios from "../Axios/Axios";
import Swal from "sweetalert2"

export const FacultyLoginApi = async (email, password) => {
  let { data } = await axios.post('/faculty/login', { email, password }, {
    headers: {
      "Content-Type": "application/json"
    }, withCredentials: true
  })
  return data
}

export const FacultyProfileApi = async () => {
  let { data } = await axios.get('/faculty/profile', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data
}
export const FacultyProfileUpdateApi = async (name, email, mobNumber, dob, admYear, qualifications, teachingArea, address, department,
  gender, image) => {
  let { data } = await axios.post('/faculty/updateprofile', {
    name, email, mobNumber, dob, admYear, qualifications, teachingArea, address, department,
    gender, image
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

    text: 'Profile Updated Request Send Successfully',

  })
}
export const FacultyVerifyMail = async (datas) => {
  let { data } = await axios.post('/faculty/verifymail', { data: datas }, {
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
export const FacultySubmitpassApi = async (pass) => {
  let { data } = axios.post('/faculty/changepassword', { pass }, {
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

export const FacultyClubrequestSend = async (studentName, department, semester,
  clubName, clubAdminId, clubAdminName, studentId, clubId) => {
  let { data } = await axios.post('/faculty/clubRequest', {
    studentName, department, semester,
    clubName, status: 'Request Send', clubAdminId, clubAdminName, studentId, clubId
  }, {
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

    text: data
  })

  return data

}
export const FacultyClubStatus = async (search) => {
  let { data } = await axios.get('/faculty/ClubRequests',{params:{search}} ,{
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
export const FacultyClubRequestUpdated = async (id, status) => {
  let { data } = await axios.post('/faculty/clubrequestupdate', { id, status }, {
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

export const FacultyLeaveLettersApi = async (search) => {
  let { data } = await axios.get('/faculty/leaveletters',{params:{search}}, {
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

export const FacultyLeaveActionApi = async (id, status, adminName) => {
  let { data } = await axios.post('/faculty/leaveletterStatus', { id, status, adminName }, {
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

export const ApiViewStudents = async (dep, sem, cls) => {
  let { data } = await axios.get('/faculty/studentlist', { params: { dep, sem } }, {
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

export const FacultyResultAddApi = async (department, semester, className, studentId, mark, grade, subject) => {
  let { data } = await axios.post('/faculty/result', { department, semester, className, studentId, mark, grade, subject }, {
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

    text: 'Result Added',

  })
  return data
}

export const FacultyAttendenceApi = async (search) => {
  let { data } = await axios.get('/faculty/attendence',{params:{search}}, {
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

export const FacultyAttendencePostApi = async (details) => {
  let { data } = await axios.post('/faculty/attendence', { details }, {
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

export const FacultyCompliantPostApi = async (title, content) => {
  let { data } = await axios.post('/faculty/addcomplaint', { title, content }, {
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

export const FacultyGetDepStudents = async (search) => {
  let { data } = await axios.get('/faculty/studentdepwise',{params:{search}}, {
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
export const FacultyGetClubs = async (search) => {
  let { data } = await axios.get('/faculty/clubs',{params:{search}}, {
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
export const FacultyDeleteClubs = async (id) => {
  let { data } = await axios.get('/faculty/deleteclubs', { params: { id } }, {
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
export const FacultyDeleteClubRequest = async (id) => {
  let { data } = await axios.get('/faculty/deleteclubRequest', { params: { id } }, {
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

export const ApiViewClass = async (Dep, Sem) => {
  let { data } = await axios.get('/faculty/class', { params: { Dep, Sem } }, {
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
export const ApiViewSubjects = async (dep, sem) => {
  let { data } = await axios.get('/faculty/subjects', { params: { dep, sem } }, {
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

export const ApiViewSemester = async (Dep) => {
  let { data } = await axios.get('/faculty/semester', { params: { Dep } }, {
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
  let { data } = await axios.get('/faculty/department', {
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

export const FacultyNoticeApi = async (search,pageNo) => {
  let { data } = await axios.get('/faculty/checknotice',{params:{search,pageNo}}, {
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


export const FacultyForgotPassword = async (email) => {
  let { data } = await axios.post('/faculty/forgotPassword', { email }, {
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
export const FacultyChangePassword = async (email, newpass) => {
  let { data } = await axios.post('/faculty/applypassword', { email, newpass }, {
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
export const FacultyClubSheduleMeeting = async (id,time,date,place) => {
  let { data } = await axios.post('/faculty/shedulemeeting', { id,time,date,place }, {
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

    text:data
  })
  return data
}
export const FacultyClubDeleteMeeting = async (id,meetingId) => {
  let { data } = await axios.get('/faculty/deletemeeting', {params:{id,meetingId} }, {
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

    text:data
  })
  return data
}
export const FacultyClubStudentMeeting = async (id) => {
  let { data } = await axios.get('/faculty/clubstudent', {params:{id} }, {
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
