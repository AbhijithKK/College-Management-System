import axios from "../../Utils/Axios/Axios";
import Swal from "sweetalert2";

const header = {
  headers: {
    "Content-Type": "application/json",
  },withCredentials: true,
};

const SwalError = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Login Again",
  });
};

export const FacultyLoginApi = async (email, password) => {
  let { data } = await axios.post(
    "/faculty/login",
    { email, password },
    header
  );
  return data;
};

export const FacultyProfileApi = async () => {
  let { data } = await axios.get("/faculty/profile", header);
  return data;
};
export const FacultyProfileUpdateApi = async (
  name,
  email,
  mobNumber,
  dob,
  admYear,
  qualifications,
  teachingArea,
  address,
  department,
  gender,
  image
) => {
  let { data } = await axios.post(
    "/faculty/updateprofile",
    {
      name,
      email,
      mobNumber,
      dob,
      admYear,
      qualifications,
      teachingArea,
      address,
      department,
      gender,
      image,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: "Profile Updated Request Send Successfully",
  });
};
export const FacultyVerifyMail = async (datas) => {
  let { data } = await axios.post(
    "/faculty/verifymail",
    { data: datas },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};
export const FacultySubmitpassApi = async (pass) => {
  let { data } = axios.post("/faculty/changepassword", { pass }, header);
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: "Password Changed Successfully",
  });
  return data;
};

export const FacultyClubrequestSend = async (
  studentName,
  department,
  semester,
  clubName,
  clubAdminId,
  clubAdminName,
  studentId,
  clubId
) => {
  let { data } = await axios.post(
    "/faculty/clubRequest",
    {
      studentName,
      department,
      semester,
      clubName,
      status: "Request Send",
      clubAdminId,
      clubAdminName,
      studentId,
      clubId,
    },
    header
  );
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: data,
  });

  return data;
};
export const FacultyClubStatus = async (search) => {
  let { data } = await axios.get(
    "/faculty/ClubRequests",
    { params: { search } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};
export const FacultyClubRequestUpdated = async (id, status) => {
  let { data } = await axios.post(
    "/faculty/clubrequestupdate",
    { id, status },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};

export const FacultyLeaveLettersApi = async (search) => {
  let { data } = await axios.get(
    "/faculty/leaveletters",
    { params: { search } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};

export const FacultyLeaveActionApi = async (id, status, adminName) => {
  let { data } = await axios.post(
    "/faculty/leaveletterStatus",
    { id, status, adminName },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};

export const ApiViewStudents = async (dep, sem, cls) => {
  let { data } = await axios.get(
    "/faculty/studentlist",
    { params: { dep, sem } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};

export const FacultyResultAddApi = async (
  department,
  semester,
  className,
  studentId,
  mark,
  grade,
  subject
) => {
  let { data } = await axios.post(
    "/faculty/result",
    { department, semester, className, studentId, mark, grade, subject },
    header
  );
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: "Result Added",
  });
  return data;
};

export const FacultyAttendenceApi = async (search) => {
  let { data } = await axios.get(
    "/faculty/attendence",
    { params: { search } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};

export const FacultyAttendencePostApi = async (details) => {
  let { data } = await axios.post("/faculty/attendence", { details }, header);
  if (data === false) {
    SwalError();
  }
  return data;
};

export const FacultyCompliantPostApi = async (title, content) => {
  let { data } = await axios.post(
    "/faculty/addcomplaint",
    { title, content },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};

export const FacultyGetDepStudents = async (search) => {
  let { data } = await axios.get(
    "/faculty/studentdepwise",
    { params: { search } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};
export const FacultyGetClubs = async (search) => {
  let { data } = await axios.get(
    "/faculty/clubs",
    { params: { search } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};
export const FacultyDeleteClubs = async (id) => {
  let { data } = await axios.get(
    "/faculty/deleteclubs",
    { params: { id } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};
export const FacultyDeleteClubRequest = async (id) => {
  let { data } = await axios.get(
    "/faculty/deleteclubRequest",
    { params: { id } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};

export const ApiViewClass = async (Dep, Sem) => {
  let { data } = await axios.get(
    "/faculty/class",
    { params: { Dep, Sem } },
    header
  );

  if (data === false) {
    SwalError();
  }
  return data;
};
export const ApiViewSubjects = async (dep, sem) => {
  let { data } = await axios.get(
    "/faculty/subjects",
    { params: { dep, sem } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};

export const ApiViewSemester = async (Dep) => {
  let { data } = await axios.get(
    "/faculty/semester",
    { params: { Dep } },
    header
  );

  if (data === false) {
    SwalError();
  }
  return data;
};

export const ApiViewDepartment = async () => {
  let { data } = await axios.get("/faculty/department", header);

  if (data === false) {
    SwalError();
  }
  return data;
};

export const FacultyNoticeApi = async (search, pageNo) => {
  let { data } = await axios.get(
    "/faculty/checknotice",
    { params: { search, pageNo } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};

export const FacultyForgotPassword = async (email) => {
  let { data } = await axios.post("/faculty/forgotPassword", { email }, header);

  if (data === false) {
    SwalError();
  }
  return data;
};
export const FacultyChangePassword = async (email, newpass) => {
  let { data } = await axios.post(
    "/faculty/applypassword",
    { email, newpass },
    header
  );

  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: "Password Changed SuccesFully",
  });
  return data;
};
export const FacultyClubSheduleMeeting = async (id, time, date, place) => {
  let { data } = await axios.post(
    "/faculty/shedulemeeting",
    { id, time, date, place },
    header
  );

  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: data,
  });
  return data;
};
export const FacultyClubDeleteMeeting = async (id, meetingId) => {
  let { data } = await axios.get(
    "/faculty/deletemeeting",
    { params: { id, meetingId } },
    header
  );

  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: data,
  });
  return data;
};
export const FacultyClubStudentMeeting = async (id) => {
  let { data } = await axios.get(
    "/faculty/clubstudent",
    { params: { id } },
    header
  );

  if (data === false) {
    SwalError();
  }

  return data;
};
export const FacultyPreviousAttendance = async (search) => {
  let { data } = await axios.get(
    "/faculty/previousattendance",
    { params: { search } },
    header
  );

  if (data === false) {
    SwalError();
  }

  return data;
};
