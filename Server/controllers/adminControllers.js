const { studentModel } = require("../models/studentScheema");
const { facultyModel } = require("../models/facultyScheema");
const { club } = require("../models/clubScheema");
const { department } = require("../models/departmentScheema");
const { notice } = require("../models/noticeScheema");
const { semester } = require("../models/semesterScheema");
const { subject } = require("../models/subjectScheema");
const bcript = require("bcrypt");
const { jwtSign, jwtVerify } = require("../heplers/jwt");
const { classScheema } = require("../models/classScheema");
const { complaintScheema } = require("../models/complaintMode");
const nodeMail = require("../heplers/nodeMailer");
const otpGenerator = require("otp-generator");
const { Pagination } = require("../heplers/pagination");
const { approveModel } = require("../models/approveRequests");
const { paymentModel } = require("../models/payment");
const { paymentHistoryModel } = require("../models/paymentHistory");

const passGen = () => {
  return otpGenerator.generate(8, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: true,
  });
};

let admin = {
  // <====LOGIN VERIFY====>
  adminLogin: async (req, res) => {
    try {
      const email = "admin@gmail.com";
      const password = "password";
      if (email === req.body.mail && password === req.body.password) {
        res
          .cookie("jwtAdmin", await jwtSign(123456), {
            withCredenttitals: true,
            httpOnly: false,
            secure: false,
            sameSite: "Lax",
            maxAge: 1000000,
          })
          .json(true);
      } else {
        res.json(false);
      }
    } catch (err) {
      res.json(false);
    }
  },
  // <====AUTHENDICATION  VERIFY====>
  checkAuth: async (req, res) => {
    try {
      let loginverify = await jwtVerify(req.cookies.jwtAdmin);
      if (loginverify.data == 123456) {
        res.json(true);
      } else {
        res.json(false);
      }
    } catch (err) {
      res.json(false);
    }
  },

  // <====ADD CONTROLLS====>
  addStudent: async (req, res) => {
    try {
      let password = passGen();
      let sendPassWord = password;
      password = await bcript.hash(password, 10);

      studentModel
        .create({
          name: req.body.names,
          email: req.body.email,
          mobNumber: req.body.mobNumber,
          guardianNo: req.body.guardianNumber,
          guardianName: req.body.guardianName,
          department: req.body.department,
          admYear: req.body.admYear,
          gender: req.body.gender,
          address: req.body.address,
          DOB: req.body.dob,
          semester: req.body.semester,
          password: password,
          className: req.body.className,
        })
        .then(() => {
          const sub = "COLLEGE MANAGEMENT SYSTEM ✔";
          let content = `Congratulation,Dear Student Your Account Has been Created 
                 Your Email: ${req.body.email} Password: ${sendPassWord} 
                 use this credential to Login Your Account`;

          nodeMail(req.body.email, content, sub);
          res.json("Student Added");
        });
    } catch (err) {
      res.json(false);
    }
  },
  addFaculty: async (req, res) => {
    try {
      let password = passGen();
      let sendPassWord = password;
      password = await bcript.hash(password, 10);

      facultyModel
        .create({
          name: req.body.names,
          email: req.body.email,
          mobNumber: req.body.mobNumber,
          teachingArea: req.body.teachingArea,
          department: req.body.department,
          admYear: req.body.admYear,
          gender: req.body.gender,
          address: req.body.address,
          DOB: req.body.dob,
          adminOfClass: req.body.adminOfClass,
          qualifications: req.body.qualification,
          password: password,
        })
        .then(() => {
          const sub = "COLLEGE MANAGEMENT SYSTEM ✔";
          let content = `Congratulation, Dear Faculty Your Account Has been Created 
                 Your Email: ${req.body.email} Password: ${sendPassWord} 
                 use this credential to Login Your Account`;

          nodeMail(req.body.email, content, sub);
          res.json("faculty Added");
        });
    } catch (err) {
      res.json(false);
    }
  },
  addClub: async (req, res) => {
    try {
      club
        .create({
          name: req.body.value.names,
          discription: req.body.value.discription,
          clubAdmin: req.body.clubAdmin,
          clubAdminId: req.body.clubAdminId,
        })
        .then(() => {
          res.json("club Created");
        });
    } catch (err) {
      res.json(false);
    }
  },
  addDepartment: (req, res) => {
    try {
      department.create({
        name: req.body.departmentName,
      });
      res.json("department added");
    } catch (err) {
      res.json(false);
    }
  },
  uploadNotice: (req, res) => {
    try {
      let date = new Date().toLocaleDateString("en-GB");

      notice.create({
        name: req.body.title,
        filePath: req.file.filename,
        date: date,
      });
      res.json("notice uploaded");
    } catch (err) {
      res.json(false);
    }
  },
  addSemester: (req, res) => {
    try {
      semester.create({
        department: req.body.department,
        semester: req.body.semester,
      });
      res.json("semester added");
    } catch (err) {
      res.json(false);
    }
  },
  addSubject: (req, res) => {
    try {
      subject.create({
        department: req.body.department,
        subject: req.body.datas.subject,
        semester: req.body.datas.semester,
        className: req.body.className,
      });
      res.json("subject added");
    } catch (err) {
      res.json(false);
    }
  },
  addClass: (req, res) => {
    try {
      classScheema.create({
        department: req.body.department,
        className: req.body.className,
        semester: req.body.semester,
      });
      res.json("Class added");
    } catch (err) {
      res.json(false);
    }
  },
  payment: async (req, res) => {
    try {
      const { title, amount, dueDate } = req.body;
      let d = await paymentModel.create({
        title: title,
        amount: amount,
        date: dueDate,
      });

      res.json(true);
    } catch (err) {
      res.json(false);
    }
  },
  // <====VIEW CONTROLLS===>
  viewPayment: async (req, res) => {
    try {
      let key = "";
      if (req.query.search) {
        key = req.query.search
          .replace(/[^a-zA-Z]/g, "")
          .replace(/[^a-zA-Z]/g, "");
      }
      let pay = await paymentModel
        .find({ title: new RegExp(key, "i") })
        .sort({ _id: -1 })
        .exec();
      res.json(pay);
    } catch (err) {
      res.json(false);
    }
  },
  viewPaymentHistory: async (req, res) => {
    try {
      let history = await paymentHistoryModel
        .find()
        .populate({
          path: "studentId",
          select: "name department",
        })
        .populate({
          path: "paymentId",
          select: "title amount date",
        })
        .sort({ _id: -1 })
        .exec();

      res.json(history);
    } catch (err) {
      res.json(false);
    }
  },
  dashBord: async (req, res) => {
    try {
      let totalStudent = await studentModel.count();
      let totalFaculty = await facultyModel.count();
      let totalClubs = await club.count();
      res.json({
        student: totalStudent,
        faculty: totalFaculty,
        clubs: totalClubs,
      });
    } catch (err) {
      res.json(false);
    }
  },
  viewStudents: async (req, res) => {
    try {
      let page = req.query.currentPage || 1;
      let limit = page * 5;
      let skip = (page - 1) * 5;

      let Total = await studentModel.countDocuments();
      Total = Math.ceil(Total / 5);

      let Dep = req.query.Dep;
      let key = "";
      if (req.query.search) {
        key = req.query.search
          .replace(/[^a-zA-Z]/g, "")
          .replace(/[^a-zA-Z]/g, "");
      }
      let allStudents;
      if (req.query.id) {
        allStudents = await studentModel.findOne({ _id: req.query.id });
      } else if (Dep == "default") {
        allStudents = await studentModel
          .find({ name: new RegExp(key, "i") })
          .skip(skip)
          .limit(limit)
          .sort({ _id: -1 })
          .exec();
      } else {
        allStudents = await studentModel
          .find({ department: Dep, name: new RegExp(key, "i") })
          .skip(skip)
          .limit(limit)
          .sort({ _id: -1 })
          .exec();
        Total = Math.ceil(allStudents.length / 5);
      }

      res.json({ allStudents, Total });
    } catch (err) {
      res.json(false);
    }
  },
  viewFacultys: async (req, res) => {
    try {
      let Dep = req.query.Dep;
      let allFacultys;
      let key = "";
      if (req.query.search) {
        key = req.query.search
          .replace(/[^a-zA-Z]/g, "")
          .replace(/[^a-zA-Z]/g, "");
      }
      let pages = req.query.pages || 1;
      let limit = pages * 5;
      let skip = (pages - 1) * 5;
      let total = await facultyModel.countDocuments();
      total = Math.ceil(total / 5);

      if (req.query.Dep == "default") {
        allFacultys = await facultyModel
          .find({ name: new RegExp(key, "i") })
          .limit(limit)
          .skip(skip)
          .sort({ _id: -1 })
          .exec();
      } else if (req.query.id) {
        allFacultys = await facultyModel.findOne({ _id: req.query.id });
      } else if (req.query.Dep) {
        allFacultys = await facultyModel
          .find({ department: Dep, name: new RegExp(key, "i") })
          .sort({ _id: -1 })
          .limit(limit)
          .skip(skip)
          .exec();
        total = Math.ceil(allFacultys.length / 5);
      } else {
        allFacultys = await facultyModel.find().sort({ _id: -1 }).exec();
      }
      res.json({ allFacultys, total });
    } catch (err) {
      res.json(false);
    }
  },
  viewDepartment: async (req, res) => {
    try {
      let val = { limit: await department.count(), skip: 0, total: 0 };
      if (req.query.pageNo) {
        let { limit, skip, total } = await Pagination(
          req.query.pageNo,
          department
        );
        val.limit = limit;
        val.skip = skip;
        val.total = total;
      }
      let key = "";
      if (req.query.search) {
        key = req.query.search
          .replace(/[^a-zA-Z]/g, "")
          .replace(/[^a-zA-Z]/g, "");
      }
      let total = val.total;
      let allDepartments = await department
        .find({ name: new RegExp(key, "i") })
        .limit(val.limit)
        .skip(val.skip)
        .sort({ _id: -1 })
        .exec();
      res.json({ allDepartments, total });
    } catch (err) {
      res.json(false);
    }
  },
  viewSubjects: async (req, res) => {
    try {
      let { limit, skip, total } = await Pagination(req.query.pageNo, subject);
      let dep = req.query.dep;
      let allSubjects;
      let key = "";
      if (req.query.search) {
        key = req.query.search
          .replace(/[^a-zA-Z]/g, "")
          .replace(/[^a-zA-Z]/g, "");
      }
      if (dep == "default") {
        allSubjects = await subject
          .find({ subject: new RegExp(key, "i") })
          .limit(limit)
          .skip(skip)
          .sort({ _id: -1 })
          .exec();
      } else if (req.query.dep && req.query.sem) {
        allSubjects = await subject
          .find({ $and: [{ department: dep }, { semester: req.query.sem }] })
          .sort({ _id: -1 })
          .exec();
      } else if (req.query.dep) {
        allSubjects = await subject
          .find({ department: dep, subject: new RegExp(key, "i") })
          .limit(limit)
          .skip(skip)
          .sort({ _id: -1 })
          .exec();
        total = Math.ceil(allSubjects.length / 5);
      } else {
        allSubjects = await subject
          .find({ subject: new RegExp(key, "i") })
          .sort({ _id: -1 })
          .exec();
      }
      res.json({ allSubjects, total });
    } catch (err) {
      res.json(false);
    }
  },
  viewSemester: async (req, res) => {
    try {
      let { limit, skip, total } = await Pagination(req.query.pageNo, semester);
      let allSemesters;
      let key = "";
      if (req.query.search) {
        key = req.query.search
          .replace(/[^a-zA-Z0-9]/g, "")
          .replace(/[^a-zA-Z0-9]/g, "");
      }
      if (req.query.Dep == "default") {
        allSemesters = await semester
          .find({ semester: new RegExp(key, "i") })
          .limit(limit)
          .skip(skip)
          .lean();
      } else if (req.query.Dep) {
        allSemesters = await semester
          .find({ department: req.query.Dep, semester: new RegExp(key, "i") })
          .limit(limit)
          .skip(skip)
          .lean();
        total = Math.ceil(allSemesters.length / 5);
      } else {
        allSemesters = await semester
          .find({ semester: new RegExp(key, "i") })
          .lean();
      }
      res.json({ allSemesters, total });
    } catch (err) {
      res.json(false);
    }
  },
  viewClass: async (req, res) => {
    try {
      let { total, skip, limit } = await Pagination(
        req.query.pageNo,
        classScheema
      );
      let allClass;
      let key = "";
      if (req.query.search) {
        key = req.query.search
          .replace(/[^a-zA-Z/]/g, "")
          .replace(/[^a-zA-Z]/g, "");
      }
      if (req.query.Dep && req.query.Sem) {
        allClass = await classScheema
          .find({
            $and: [{ department: req.query.Dep }, { semester: req.query.Sem }],
          })
          .lean();
      } else if (req.query.Dep) {
        allClass = await classScheema
          .find({ department: req.query.Dep, className: new RegExp(key, "i") })
          .lean();
      } else {
        allClass = await classScheema
          .find({ className: new RegExp(key, "i") })
          .limit(limit)
          .skip(skip)
          .lean();
      }
      res.json({ allClass, total });
    } catch (err) {
      res.json(false);
    }
  },
  viewComplaints: async (req, res) => {
    try {
      let { limit, skip, total } = await Pagination(
        req.query.pageNo,
        complaintScheema,
        3
      );
      let key = "";
      if (req.query.search) {
        let date = new Date(req.query.search).toLocaleDateString("en-GB");
        key = date.replace(/[^0-9/0-9/0-9]/g, "");
      }
      let allCompliants = await complaintScheema
        .find({ date: new RegExp(key, "i") })
        .limit(limit)
        .skip(skip)
        .sort({ _id: -1 })
        .exec();
      res.json({ allCompliants, total });
    } catch (err) {
      res.json(false);
    }
  },

  viewApproveLists: async (req, res) => {
    try {
      let allList = await approveModel.find().sort({ _id: -1 }).exec();

      res.json(allList);
    } catch (err) {
      res.json(false);
    }
  },

  // <====DELETE CONTROLLS====>
  deletePayment: async (req, res) => {
    try {
      await paymentModel.deleteOne({ _id: req.query.id });
      res.json(true);
    } catch (err) {
      res.json(false);
    }
  },
  deleteRequests: async (req, res) => {
    try {
      await approveModel.deleteOne({ _id: req.query.id });
      res.json(true);
    } catch (err) {
      res.json(false);
    }
  },
  deleteStudent: async (req, res) => {
    try {
      let id = req.query.id;
      await studentModel.deleteOne({ _id: id });

      res.json("student Data Deleted");
    } catch (err) {
      res.json(false);
    }
  },
  deleteFaculty: async (req, res) => {
    try {
      let id = req.query.id;
      await facultyModel.deleteOne({ _id: id });

      res.json("faculty Deleted");
    } catch (err) {
      res.json(false);
    }
  },
  deleteDepartment: async (req, res) => {
    try {
      let id = req.query.id;
      await department.deleteOne({ _id: id });
      res.json(true);
    } catch (err) {
      res.json(false);
    }
  },
  deleteSubject: (req, res) => {
    try {
      let id = req.query.id;
      subject.deleteOne({ _id: id }).then(() => {
        res.json("subject deleted");
      });
    } catch (err) {
      res.json(false);
    }
  },
  deleteClass: (req, res) => {
    try {
      let id = req.query.id;
      classScheema.deleteOne({ _id: id }).then(() => {
        res.json("Class deleted");
      });
    } catch (err) {
      res.json(false);
    }
  },
  deleteSemester: (req, res) => {
    try {
      let id = req.query.id;
      semester.deleteOne({ _id: id }).then(async () => {
        res.json("Semester Deleted");
      });
    } catch (err) {
      res.json(false);
    }
  },
  deleteComplaint: async (req, res) => {
    try {
      await complaintScheema.deleteOne({ _id: req.query.id });
      res.json(true);
    } catch (err) {
      res.json(false);
    }
  },
  // <====UPDATE CONTROLLS====>
  UpdateRequests: async (req, res) => {
    try {
      let data = await approveModel.findOne({ _id: req.query.id });
      if (req.query.category === "faculty") {
        const datas = {
          name: data.name,
          email: data.email,
          mobNumber: data.mobNumber,
          teachingArea: data.teachingArea,
          department: data.department,
          admYear: data.admYear,
          gender: data.gender,
          address: data.address,
          DOB: data.dob,
          qualifications: data.qualifications,
        };
        if (data.image != "false") {
          datas.image = data.image;
        }
        await facultyModel.updateOne({ _id: data.id }, datas);
        await approveModel.deleteOne({ _id: req.query.id });
      } else if (req.query.category === "student") {
        const updateData = {
          name: data.name,
          email: data.email,
          mobNumber: data.mobNumber,
          DOB: data.dob,
          admYear: data.admYear,
          address: data.address,
          department: data.department,
          gender: data.gender,
          guardianName: data.guardianName,
          guardianNumber: data.guardianNumber,
          semester: data.semester,
          className: data.className,
        };
        if (data.image != "false") {
          updateData.image = data.image;
        }
        await studentModel.updateOne({ _id: data.id }, updateData);
        await approveModel.deleteOne({ _id: req.query.id });
      }

      res.json(true);
    } catch (err) {
      res.json(false);
    }
  },

  postupdateStudent: async (req, res) => {
    try {
      const id = req.body.id;

      const updateData = {
        name: req.body.name,
        email: req.body.email,
        mobNumber: req.body.mobNumber,
        DOB: req.body.dob,
        admYear: req.body.admYear,
        address: req.body.address,
        department: req.body.department,
        gender: req.body.gender,
        guardianName: req.body.guardianName,
        guardianNumber: req.body.guardianNumber,
        semester: req.body.semester,
        className: req.body.className,
      };

      if (req.file) {
        updateData.image = req.file[0].filename;
      }

      let data = await studentModel.updateOne({ _id: id }, updateData);

      res.json("Student Data Updated");
    } catch (err) {
      res.json(false);
    }
  },
  postupdateFaculty: async (req, res) => {
    try {
      let id = req.body.id;
      const datas = {
        name: req.body.name,
        email: req.body.email,
        mobNumber: req.body.mobNumber,
        teachingArea: req.body.teachingArea,
        department: req.body.department,
        admYear: req.body.admYear,
        gender: req.body.gender,
        address: req.body.address,
        DOB: req.body.dob,
        adminOfClass: req.body.className,
        qualifications: req.body.qualifications,
      };
      if (req.file) {
        updateData.image = req.file[0].filename;
      }
      facultyModel.updateOne({ _id: id }, datas).then(() => {
        res.json("faculty updated");
      });
    } catch (err) {
      res.json(false);
    }
  },
  updateStudent: async (req, res) => {
    try {
      let id = req.query.id;

      if (id == undefined) {
        res.json({
          name: "",
          email: "",
          mobNumber: "",
          DOB: "",
          admYear: "",
          guardianName: "",
          guardianNumber: "",
          address: "",
          department: "",
          gender: "",
          semester: "",
        });
        return;
      }
      let student = await studentModel.findOne({ _id: id });
      res.json(student);
    } catch (err) {
      res.json(false);
    }
  },
  updateFaculty: async (req, res) => {
    try {
      let id = req.query.id;
      let faculty = await facultyModel.findOne({ _id: id });
      res.json(faculty);
    } catch (err) {
      res.json(false);
    }
  },
  // =======>logout<======
  logOut: (req, res) => {
    res.cookie("jwtAdmin", "").json(true);
  },
};

module.exports = admin;
