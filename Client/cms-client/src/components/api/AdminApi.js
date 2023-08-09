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
  let { data } = await axios.get(
    "/admin/department",
    { params: { search, pageNo } },
    header
  );

  if (data === false) {
    SwalError();
  }
  return data;
};
export const ApiAddDepartment = async (datas) => {
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
};
export const ApiDeleteDepartment = async (id) => {
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
};
export const ApiViewSemester = async (Dep, search, pageNo) => {
  let { data } = await axios.get(
    "/admin/semester",
    { params: { Dep, search, pageNo } },
    header
  );

  if (data === false) {
    SwalError();
  }
  return data;
};
export const ApiAddSemester = async (datas) => {
  let { data } = await axios.post("/admin/semester", datas, header);

  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",
    text: data,
  });

  return data;
};
export const ApiDeleteSemester = async (id) => {
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
};
export const ApiViewSubjects = async (dep, sem, search, pageNo) => {
  let { data } = await axios.get(
    "/admin/subjects",
    { params: { dep, sem, search, pageNo } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};
export const ApiAddSubjects = async (datas, department, className) => {
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
};
export const ApiDeleteSubjects = async (id) => {
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
};

export const ApiUploadNotice = async (files, title) => {
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
};
export const ApiUpdateStudent = async (id) => {
  let { data } = await axios.get(
    "/admin/updateStudent",
    { params: { id } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
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
};

export const ApiStudentDelete = async (id) => {
  let data = await axios.delete("/admin/student", { params: { id } }, header);
  if (data === false) {
    SwalError();
  }

  Swal.fire({
    icon: "success",
    text: "Student data Deleted",
  });
  return data;
};
export const ApiAddStudent = (value) => {
  axios.post("/admin/student", value, header).then((data) => {
    if (data.data === false) {
      SwalError();
    }

    Swal.fire({
      icon: "success",
      text: data.data,
    });
    return data.data;
  });
};

export const ApiAddFaculty = (value) => {
  axios.post("/admin/faculty", value, header).then((data) => {
    if (data.data === false) {
      SwalError();
    }

    Swal.fire({
      icon: "success",
      text: data.data,
    });
    return data.data;
  });
};

export const ApiDeleteFaculty = async (id) => {
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
};

export const ApiViewFaculty = async (Dep, search, pages) => {
  let { data } = await axios.get(
    "/admin/facultys",
    { params: { Dep, search, pages } },
    header
  );
  if (data === false) {
    SwalError();
  }

  return data;
};
export const ApiUpdateFaculty = async (id) => {
  let { data } = await axios.get(
    "/admin/updateFaculty",
    { params: { id } },
    header
  );
  if (data === false) {
    SwalError();
  }
  return data;
};

export const ApiViewClass = async (Dep, Sem, search, pageNo) => {
  let { data } = await axios.get(
    "/admin/class",
    { params: { Dep, Sem, search, pageNo } },
    header
  );

  if (data === false) {
    SwalError();
  }
  return data;
};
export const ApiAddClass = async (datas) => {
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
};
export const ApiDeleteClass = async (id) => {
  let { data } = await axios.delete("/admin/class", { params: { id } }, header);

  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",
    text: data,
  });
  return data;
};
export const ApiViewComplaint = async (search, pageNo) => {
  let { data } = await axios.get(
    "/admin/complaints",
    { params: { search, pageNo } },
    header
  );

  if (data === false) {
    SwalError();
  }

  return data;
};

export const ApiDeleteComplaint = async (id) => {
  let { data } = await axios.delete(
    "/admin/complaint",
    { params: { id } },
    header
  );

  if (data === false) {
    SwalError();
  }

  return data;
};

export const ApiViewApprovelists = async () => {
  let { data } = await axios.get("/admin/approvelists", header);

  if (data === false) {
    SwalError();
  }

  return data;
};
export const ApiFacultyProfile = async (id) => {
  let { data } = await axios.get("/admin/facultys", { params: { id } }, header);
  return data?.allFacultys;
};
export const ApiStudentProfile = async (id) => {
  let { data } = await axios.get("/admin/students", { params: { id } }, header);
  return data?.allStudents;
};
export const ApiupdateRequests = async (id, category) => {
  let { data } = await axios.get("/admin/updateRequests",{ params: { id, category } },header);
  return data;
};
export const ApiDeleteRequests = async (id) => {
  let { data } = await axios.delete("/admin/approvelists",{ params: { id } },header);
  return data;
};

export const ApiPayment = async (title, amount, dueDate) => {
  let { data } = await axios.post("/admin/payment",{ title, amount, dueDate },header);
  if (data === false) {
    SwalError();
  }
  Swal.fire({
    icon: "success",
    text: data,
  });
  return data;
};
export const ApiDeletepayment = async (id) => {
  let { data } = await axios.delete("/admin/payment",{ params: { id } },header);
  return data;
};
export const ApiGetpayment = async (search) => {
  let { data } = await axios.get("/admin/payment",{ params: { search } },header);
  return data;
};
export const ApiGetpaymentHistory = async () => {
  let { data } = await axios.get("/admin/paymentHistory", header);
  return data;
};
