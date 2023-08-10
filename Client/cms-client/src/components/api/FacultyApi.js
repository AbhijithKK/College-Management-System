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
  try{
  let { data } = await axios.post(
    "/faculty/login",
    { email, password },
    header
  );
  return data;
  }catch(err){
  SwalError();
}
};

export const FacultyProfileApi = async () => {
  try{
  let { data } = await axios.get("/faculty/profile", header);
  return data;
  }catch(err){
  SwalError();
}
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
  try{
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
}catch(err){
  SwalError()
}
};
export const FacultyVerifyMail = async (datas) => {
  try{
  let { data } = await axios.post(
    "/faculty/verifymail",
    { data: datas },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};
export const FacultySubmitpassApi = async (pass) => {
  try{
  let { data } = axios.post("/faculty/changepassword", { pass }, header);
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
  try{
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
  }catch(err){
  SwalError();
}
};
export const FacultyClubStatus = async (search) => {
  try{
  let { data } = await axios.get(
    "/faculty/ClubRequests",
    { params: { search } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};
export const FacultyClubRequestUpdated = async (id, status) => {
  try{
  let { data } = await axios.post(
    "/faculty/clubrequestupdate",
    { id, status },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};

export const FacultyLeaveLettersApi = async (search) => {
  try{
  let { data } = await axios.get(
    "/faculty/leaveletters",
    { params: { search } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};

export const FacultyLeaveActionApi = async (id, status, adminName) => {
  try{
  let { data } = await axios.post(
    "/faculty/leaveletterStatus",
    { id, status, adminName },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};

export const ApiViewStudents = async (dep, sem, cls) => {
  try{
  let { data } = await axios.get(
    "/faculty/studentlist",
    { params: { dep, sem } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
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
  try{
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
  }catch(err){
  SwalError();
}
};

export const FacultyAttendenceApi = async (search) => {
  try{
  let { data } = await axios.get(
    "/faculty/attendence",
    { params: { search } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};

export const FacultyAttendencePostApi = async (details) => {
  try{
  let { data } = await axios.post("/faculty/attendence", { details }, header);
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};

export const FacultyCompliantPostApi = async (title, content) => {
  try{
  let { data } = await axios.post(
    "/faculty/addcomplaint",
    { title, content },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};

export const FacultyGetDepStudents = async (search) => {
  try{
  let { data } = await axios.get(
    "/faculty/studentdepwise",
    { params: { search } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};
export const FacultyGetClubs = async (search) => {
  try{
  let { data } = await axios.get(
    "/faculty/clubs",
    { params: { search } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};
export const FacultyDeleteClubs = async (id) => {
  try{
  let { data } = await axios.get(
    "/faculty/deleteclubs",
    { params: { id } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};
export const FacultyDeleteClubRequest = async (id) => {
  try{
  let { data } = await axios.get(
    "/faculty/deleteclubRequest",
    { params: { id } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};

export const ApiViewClass = async (Dep, Sem) => {
  try{
  let { data } = await axios.get(
    "/faculty/class",
    { params: { Dep, Sem } },
    header
  );

  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};
export const ApiViewSubjects = async (dep, sem) => {
  try{
  let { data } = await axios.get(
    "/faculty/subjects",
    { params: { dep, sem } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};

export const ApiViewSemester = async (Dep) => {
  try{
  let { data } = await axios.get(
    "/faculty/semester",
    { params: { Dep } },
    header
  );

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
  let { data } = await axios.get("/faculty/department", header);

  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};

export const FacultyNoticeApi = async (search, pageNo) => {
  try{
  let { data } = await axios.get(
    "/faculty/checknotice",
    { params: { search, pageNo } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};

export const FacultyForgotPassword = async (email) => {
  try{
  let { data } = await axios.post("/faculty/forgotPassword", { email }, header);

  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};
export const FacultyChangePassword = async (email, newpass) => {
  try{
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
  }catch(err){
  SwalError();
}
};
export const FacultyClubSheduleMeeting = async (id, time, date, place) => {
  try{
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
  }catch(err){
  SwalError();
}
};
export const FacultyClubDeleteMeeting = async (id, meetingId) => {
  try{
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
  }catch(err){
  SwalError();
}
};
export const FacultyClubStudentMeeting = async (id) => {
  try{
  let { data } = await axios.get(
    "/faculty/clubstudent",
    { params: { id } },
    header
  );

  if (data === false) {
    SwalError();
  }

  return data;
  }catch(err){
  SwalError();
}
};
export const FacultyPreviousAttendance = async (search) => {
  try{
  let { data } = await axios.get(
    "/faculty/previousattendance",
    { params: { search } },
    header
  );

  if (data === false) {
    SwalError();
  }

  return data;
  }catch(err){
  SwalError();
}
};
