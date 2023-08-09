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

export const StudentLoginApi = async (email, password) => {
  let { data } = await axios.post("/student/login",{ email, password },header);
  return data;
};
export const StudentProfileApi = async () => {
  let { data } = await axios.get("/student/profile", header);
  return data;
};
export const studentClubApi = async (pageNo, filter) => {
  let { data } = await axios.get("/student/clubs",{ params: { pageNo, filter } },header);

  return data;
};

export const StudentNoticeApi = async (search, pageNo) => {
  let { data } = await axios.get("/student/checknotice",{ params: { search, pageNo } },header);
  if (data === false) {
    SwalError();
  }
  return data;
};
export const StudentProfileUpdateApi = async (
  name,
  email,
  mobNumber,
  dob,
  admYear,
  guardianName,
  guardianNumber,
  address,
  department,
  gender,
  semester,
  image
) => {
  let { data } = await axios.post("/student/updateprofile",{
      name,
      email,
      mobNumber,
      dob,
      admYear,
      guardianName,
      guardianNumber,
      address,
      department,
      gender,
      semester,
      image,
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,} );
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: "Profile Updated Request send",
  });
};

export const StudentVerifyMail = async (datas) => {
  let { data } = await axios.post("/student/verifymail",{ data: datas }, header);
  if (data === false) {
    SwalError();
  }
  return data;
};
export const studentSubmitpassApi = async (pass) => {
  let { data } = axios.post("/student/changepassword", { pass }, header);
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: "Password Changed Successfully",
  });
  return data;
};

export const StudentClubAdminGetApi = async (id) => {
  let { data } = await axios.get("/admin/facultys", { params: { id } }, header);
  if (data === false) {
    SwalError();
  }
  return data;
};

export const StudentClubStatus = async () => {
  let { data } = await axios.get("/student/clubstatus",header);
  if (data === false) {
    SwalError();
  }
  return data;
};

export const StudentLeaveApplyApi = async (reason, date) => {
  let { data } = axios.post("/student/leaveletter", { reason, date },header);
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: "Applyed Successfully",
  });
  return data;
};

export const StudentLeaveLettersApi = async () => {
  let { data } = await axios.get("/student/leaveletters", header);
  if (data === false) {
    SwalError();
  }
  return data;
};

export const StudentResultGetApi = async (semWise) => {
  let { data } = await axios.get("/student/result",{ params: { semWise } },header);
  if (data === false) {
    SwalError();
  }
  return data;
};

export const StudentAttendencegetApi = async () => {
  let { data } = await axios.get("/student/attendence", header);
  if (data === false) {
    SwalError();
  }
  return data;
};
export const StudentCompliantPostApi = async (title, content) => {
  let { data } = await axios.post("/student/addcomplaint",{ title, content },header);
  if (data === false) {
    SwalError();
  }
  return data;
};

export const ApiViewSemester = async (Dep, resultSem) => {
  let { data } = await axios.get("/student/semester",{ params: { Dep, resultSem } }, header);

  if (data === false) {
    SwalError();
  }
  return data;
};

export const ApiViewDepartment = async () => {
  let { data } = await axios.get("/student/department", header);

  if (data === false) {
    SwalError();
  }
  return data;
};
export const StudentForgotPassword = async (email) => {
  let { data } = await axios.post("/student/forgotPassword", { email }, header);

  if (data === false) {
    SwalError();
  }
  return data;
};
export const StudentChangePassword = async (email, newpass) => {
  let { data } = await axios.post("/student/applypassword",{ email, newpass },header);

  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: "Password Changed SuccesFully",
  });
  return data;
};
export const StudentClubrequestSend = async (
  studentName,
  department,
  semester,
  clubName,
  clubAdminId,
  clubAdminName,
  studentId,
  clubId
) => {
  let { data } = await axios.post("/student/clubRequest",{
      studentName,
      department,
      semester,
      clubName,
      status: "Request Send",
      clubAdminId,
      clubAdminName,
      studentId,
      clubId,
    },header);
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: data,
  });

  return data;
};
export const ApiStudentCalender = async () => {
  let { data } = await axios.get("/student/calender", header);

  if (data === false) {
    SwalError();
  }
  return data;
};
export const ApiStudentPayment = async (search, id, page) => {
  let { data } = await axios.get(
    "/student/payment",{ params: { search, id, page } },header);
  if (data === false) {
    SwalError();
  }
  return data;
};
export const ApiStudentPaymentpost = async (title, amount, id) => {
  let { data } = await axios.post("/student/payment",{ title, amount, id },header);

  if (data === false) {
    SwalError();
  }
  return data;
};
