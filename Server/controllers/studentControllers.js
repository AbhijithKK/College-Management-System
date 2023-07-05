const bcrypt = require("bcrypt")
const { studentModel } = require("../models/studentScheema")
const { jwtSign, jwtVerify } = require("../heplers/jwt")
const e = require("cors")
const { club } = require("../models/clubScheema")
const { notice } = require("../models/noticeScheema")

let student = {
    // ========>LOGIN VERIFY<=========
    studentLogin: async (req, res) => {
        try {
            let data = await studentModel.findOne({ email: req.body.email })
            console.log(data);
            if (data === null) {
                res.json(false)
            } else {
                let datas = await bcrypt.compare(req.body.password, data.password)
                if (datas === true) {
                    res.cookie('studentjwt', await jwtSign(data._id), { withCrdenttitals: true, httpOnly: false, secure: false, sameSite: "none", maxAge: 1000000 })
                        .json(true)

                } else {
                    res.json(false)
                }
            }
        } catch (err) {
            res.json(false)
        }

    },
    // ======>AUTHENDICATION CHECK<========
    checkAuth: async (req,res) => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
            console.log(verify);
            let data = await studentModel.findOne({ _id: verify.data })
            if (data !== null) {
                res.json(true)
            } else {
                res.json(false)
            }
        } catch (err) {
            res.json(false)
        }

    },
    // =====>GET APIS<======
    getProfile: async (req,res) => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
            let data = await studentModel.findOne({ _id: verify.data })
            if (data !== null) {
                res.json(data)
            } else {
                res.json(false)
            }
        } catch (err) {
            res.json(false)
        }
    },
    getAttendance: async (req,res) => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
            res.json('attendance')
        } catch (err) {
            res.json(false)
        }
    }
    ,
    getResult: async (req,res) => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
            res.json('result')
        } catch (err) {
            res.json(false)
        }
    }
    ,
    getClubs: async (req,res) => {
        try {
            let data = await club.find().lean()
            res.json(data)
        } catch (err) {
            res.json(false)
        }
    }
    ,
    getNotice: async (req,res) => {
        try {
            let data = await notice.find().lean()
            res.json(data)
        } catch (err) {
            res.json(false)
        }
    },
    getLeaveLetterStatus: async (req,res) => {

    },
    getNotificationCalender: async (req,res) => {

    },

    // ====>CLUB REQUEST SEND>====
    postClub: async (req,res) => {

    }
    ,
    // ======>PROFILE UPDATE<=====
    postProfile: async (req,res) => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
                let id=verify.data

            let updateData = {
                name: req.body.name,
                email: req.body.email,
                mobNumber: req.body.mobNumber,
                DOB: req.body.dob,
                gender: req.body.gender,
                admYear: req.body.admYear,
                department: req.body.department,
                semester: req.body.semester,
                guardianName: req.body.guardianName,
                guardianNumber: req.body.guardianNumber,
                address: req.body.address,
            };

            if (req.file!==undefined) {
               
                updateData.image =await req.file.filename;
                
            }
          
            let data = await studentModel.updateOne({ _id: id }, updateData);

            console.log(data);
            res.json('Student Data Updated');

        } catch (err) {

            res.json(false);
        }
    },
    // =======>UPDATE PASSWORD<====
    postPassword: async (req,res) => {
        try {
            let data = await jwtVerify(req.cookies.studentjwt)
            let newPassword = bcrypt.hash(req.body.password, 10)
            let student = await studentModel.updateOne({ _id: data.data }, { password: newPassword })
            console.log(student);
        } catch (err) {
            res.json(false)
        }
    }, 
    postComplaint: async (req,res) => {

    },
    postLeaveLetter: (req,res) => {

    },
    // =======>logout<======
    logOut: (req, res) => {
        res.cookie('studentjwt', '').json(true)
    }
}

module.exports = student