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
  try{
  let { data } = await axios.post("/student/login",{ email, password },header);
  return data;
   }catch(err){
  SwalError();
}
};
export const StudentProfileApi = async () => {
  try{
  let { data } = await axios.get("/student/profile", header);
  return data;
   }catch(err){
  SwalError();
}
};
export const studentClubApi = async (pageNo, filter) => {
  try{
  let { data } = await axios.get("/student/clubs",{ params: { pageNo, filter } },header);

  return data;
   }catch(err){
  SwalError();
}
};

export const StudentNoticeApi = async (search, pageNo) => {
  try{
  let { data } = await axios.get("/student/checknotice",{ params: { search, pageNo } },header);
  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
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
  try{
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
}catch(err){
  SwalError()
}
};

export const StudentVerifyMail = async (datas) => {
  try{
  let { data } = await axios.post("/student/verifymail",{ data: datas }, header);
  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};
export const studentSubmitpassApi = async (pass) => {
  try{
  let { data } = axios.post("/student/changepassword", { pass }, header);
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: "Password Changed Successfully",
  });
  return data;
   }catch(err){
  SwalError();
}
};

export const StudentClubAdminGetApi = async (id) => {
  try{
  let { data } = await axios.get("/admin/facultys", { params: { id } }, header);
  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};

export const StudentClubStatus = async () => {
  try{
  let { data } = await axios.get("/student/clubstatus",header);
  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};

export const StudentLeaveApplyApi = async (reason, date) => {
  try{
  let { data } = axios.post("/student/leaveletter", { reason, date },header);
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: "Applyed Successfully",
  });
  return data;
   }catch(err){
  SwalError();
}
};

export const StudentLeaveLettersApi = async () => {
  try{
  let { data } = await axios.get("/student/leaveletters", header);
  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};

export const StudentResultGetApi = async (semWise) => {
  try{
  let { data } = await axios.get("/student/result",{ params: { semWise } },header);
  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};

export const StudentAttendencegetApi = async () => {
  try{
  let { data } = await axios.get("/student/attendence", header);
  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};
export const StudentCompliantPostApi = async (title, content) => {
  try{
  let { data } = await axios.post("/student/addcomplaint",{ title, content },header);
  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};

export const ApiViewSemester = async (Dep, resultSem) => {
  try{
  let { data } = await axios.get("/student/semester",{ params: { Dep, resultSem } }, header);

  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};

export const ApiViewDepartment = async () => {
  try{
  let { data } = await axios.get("/student/department", header);

  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};
export const StudentForgotPassword = async (email) => {
  try{
  let { data } = await axios.post("/student/forgotPassword", { email }, header);

  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};
export const StudentChangePassword = async (email, newpass) => {
  try{
  let { data } = await axios.post("/student/applypassword",{ email, newpass },header);

  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",

    text: "Password Changed SuccesFully",
  });
  return data;
   }catch(err){
  SwalError();
}
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
  try{
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
   }catch(err){
  SwalError();
}
};
export const ApiStudentCalender = async () => {
  try{
  let { data } = await axios.get("/student/calender", header);

  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};
export const ApiStudentPayment = async (search, id, page) => {
  try{
  let { data } = await axios.get(
    "/student/payment",{ params: { search, id, page } },header);
  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};
export const ApiStudentPaymentpost = async (title, amount, id) => {
  try{
  let { data } = await axios.post("/student/payment",{ title, amount, id },header);

  if (data === false) {
    SwalError();
  }
  return data;
   }catch(err){
  SwalError();
}
};
