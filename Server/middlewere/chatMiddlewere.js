const { jwtVerify } = require("../heplers/jwt");
const { facultyModel } = require("../models/facultyScheema");
const { studentModel } = require("../models/studentScheema");

const chatAuth = async (req, res, next) => {
  try {
    const studentToken = req.cookies.studentjwt;
    const facultyToken = req.cookies.facultyjwt;

    if (studentToken) {
      const studentVerify = await jwtVerify(studentToken);
      const studentData = await studentModel.findOne({ _id: studentVerify.data });

      if (studentData) {
        console.log("Student success");
        next();
      } else {
        res.json(false);
      }
    } else if (facultyToken) {
      const facultyVerify = await jwtVerify(facultyToken);
      const facultyData = await facultyModel.findOne({ _id: facultyVerify.data });

      if (facultyData) {
        console.log("Faculty success");
        next();
      } else {
        res.json(false);
      }
    } else {
      res.json(false);
    }
  } catch (err) {
    console.error(err);
    res.json(false);
  }
};

module.exports = { chatAuth };

