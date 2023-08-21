import axios from "../../Utils/Axios/Axios";
import Swal from "sweetalert2";

const header = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const SwalError = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something Wrong",
  });
};

export const ApiViewDepartment = async (search, pageNo) => {
  try{
  let { data } = await axios.get(
    "/admin/department",
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
export const ApiAddDepartment = async (datas) => {
  try{
  let { data } = await axios.post(
    "/admin/department",
    { departmentName: datas },
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
export const ApiDeleteDepartment = async (id) => {
  try{
  let { data } = await axios.delete(
    "/admin/department",
    { params: { id } },
    header
  );

  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "warning",

    text: "Department Deleted",
  });

  return data;
}catch(err){
  SwalError();
}
};
export const ApiViewSemester = async (Dep, search, pageNo) => {
  try{
  let { data } = await axios.get(
    "/admin/semester",
    { params: { Dep, search, pageNo } },
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
export const ApiAddSemester = async (datas) => {
  try{
  let { data } = await axios.post("/admin/semester", datas, header);

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
export const ApiDeleteSemester = async (id) => {
  try{
  let { data } = await axios.delete(
    "/admin/semester",
    { params: { id } },
    header
  );
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "error",

    text: data,
  });
  return data;
}catch(err){
  SwalError();
}
};
export const ApiViewSubjects = async (dep, sem, search, pageNo) => {
  try{
  let { data } = await axios.get(
    "/admin/subjects",
    { params: { dep, sem, search, pageNo } },
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
export const ApiAddSubjects = async (datas, department, className) => {
  try{
  let { data } = await axios.post(
    "/admin/subject",
    { datas, department, className },
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
export const ApiDeleteSubjects = async (id) => {
  try{
  let { data } = await axios.delete(
    "/admin/subject",
    { params: { id } },
    header
  );
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "error",
    text: data,
  });
  return data;
}catch(err){
  SwalError();
}
};

export const ApiUploadNotice = async (files, title) => {
  try{
  let { data } = await axios.post(
    "/admin/uploadNotice",
    { files, title },
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
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
export const ApiUpdateStudent = async (id) => {
  try{
  let { data } = await axios.get(
    "/admin/updateStudent",
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

export const ApiStudentUpdatePost = async (
  id,
  name,
  email,
  mobNumber,
  address,
  department,
  dob,
  admYear,
  semester,
  gender,
  guardianName,
  guardianNumber,
  className
) => {
  try{
  let { data } = await axios.post(
    "/admin/updateStudent",
    {
      id,
      name,
      email,
      mobNumber,
      address,
      department,
      dob,
      admYear,
      semester,
      gender,
      guardianName,
      guardianNumber,
      className,
    },
    header
  );
  if (data === false) {
    SwalError();
  }

  Swal.fire({
    icon: "success",
    text: "Student Data Updated",
  });
  return data;
  }catch(err){
  SwalError();
}
};

export const ApiStudentDelete = async (id) => {
  try{
  let data = await axios.delete("/admin/student", { params: { id } }, header);
  if (data === false) {
    SwalError();
  }

  Swal.fire({
    icon: "success",
    text: "Student data Deleted",
  });
  return data;
  }catch(err){
  SwalError();
}
};
export const ApiAddStudent = (value) => {
 
  axios.post("/admin/student", value, header).then((data) => {
    console.log(data.data?.message,'api');
    if (data.data?.message === false) {
      SwalError();
    }
    if(data.data?.message===undefined){

    Swal.fire({
      icon: "success",
      text: "Student Added",
    })}
    if(data.data?.message==="Email already exist"){
    Swal.fire({
      icon: "warning",
      text: data.data?.message,
    })
  }
   
    return data.data;
  }).catch(()=>{
    SwalError()
  })
};

export const ApiAddFaculty = (value) => {
  
  axios.post("/admin/faculty", value, header).then((data) => {
    if (data.data === false) {
      SwalError();
    }
    console.log('api',data.data);
if (data.data?.message==='true'||data.data?.message===undefined) {
    Swal.fire({
      icon: "success",
      text: "faculty Added",
    })}
    if(data.data?.message==="Email already exists"){
      Swal.fire({
        icon: "warning",
        text: data.data?.message,
      })
    }
    return data.data;
  }).catch(()=>{
    SwalError()
  })
};

export const ApiDeleteFaculty = async (id) => {
  try{
  let { data } = await axios.delete(
    "/admin/faculty",
    { params: { id } },
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

export const ApiFacultyUpdatePost = async (
  id,
  name,
  email,
  mobNumber,
  address,
  department,
  dob,
  admYear,
  semester,
  gender,
  teachingArea,
  qualifications,
  className
) => {
  try{
  let { data } = await axios.post(
    "/admin/updateFaculty",
    {
      id,
      name,
      email,
      mobNumber,
      address,
      department,
      dob,
      admYear,
      semester,
      gender,
      teachingArea,
      qualifications,
      className,
    },
    header
  );
  if (data === false) {
    SwalError();
  }

  Swal.fire({
    icon: "success",
    text: "Faculty Data Updated",
  });
  return data;
  }catch(err){
  SwalError();
}
};

export const ApiViewFaculty = async (Dep, search, pages) => {
  try{
  let { data } = await axios.get(
    "/admin/facultys",
    { params: { Dep, search, pages } },
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
export const ApiUpdateFaculty = async (id) => {
  try{
  let { data } = await axios.get(
    "/admin/updateFaculty",
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

export const ApiViewClass = async (Dep, Sem, search, pageNo) => {
  try{
  let { data } = await axios.get(
    "/admin/class",
    { params: { Dep, Sem, search, pageNo } },
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
export const ApiAddClass = async (datas) => {
  try{
  let { data } = await axios.post(
    "/admin/class",
    {
      className: datas.className,
      department: datas.department,
      semester: datas.semester,
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
export const ApiDeleteClass = async (id) => {
  try{
  let { data } = await axios.delete("/admin/class", { params: { id } }, header);

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
export const ApiViewComplaint = async (search, pageNo) => {
  try{
  let { data } = await axios.get(
    "/admin/complaints",
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

export const ApiDeleteComplaint = async (id) => {
  try{
  let { data } = await axios.delete(
    "/admin/complaint",
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

export const ApiViewApprovelists = async () => {
  try{
  let { data } = await axios.get("/admin/approvelists", header);

  if (data === false) {
    SwalError();
  }

  return data;
  }catch(err){
  SwalError();
}
};
export const ApiFacultyProfile = async (id) => {
  try{
  let { data } = await axios.get("/admin/facultys", { params: { id } }, header);
  return data?.allFacultys;
}catch(err){
  SwalError();
}
};
export const ApiStudentProfile = async (id) => {
  try{
  let { data } = await axios.get("/admin/students", { params: { id } }, header);
  return data?.allStudents;
}catch(err){
  SwalError();
}
};
export const ApiupdateRequests = async (id, category) => {
  try{
  let { data } = await axios.get("/admin/updateRequests",{ params: { id, category } },header);
  return data;
  }catch(err){
  SwalError();
}
};
export const ApiDeleteRequests = async (id) => {
  try{
  let { data } = await axios.delete("/admin/approvelists",{ params: { id } },header);
  return data;
  }catch(err){
  SwalError();
}
};

export const ApiPayment = async (title, amount, dueDate) => {
  try{
  let { data } = await axios.post("/admin/payment",{ title, amount, dueDate },header);
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
export const ApiDeletepayment = async (id) => {
  try{
  let { data } = await axios.delete("/admin/payment",{ params: { id } },header);
  return data;
  }catch(err){
  SwalError();
}
};
export const ApiGetpayment = async (search) => {
  try{
  let { data } = await axios.get("/admin/payment",{ params: { search } },header);
  return data;
  }catch(err){
  SwalError();
}
};
export const ApiGetpaymentHistory = async () => {
  try{
  let { data } = await axios.get("/admin/paymentHistory", header);
  return data;
  }catch(err){
  SwalError();
}
};
