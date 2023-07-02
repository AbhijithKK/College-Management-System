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
            let data = await studentModel.findeOne({ email: req.body.email })
            if (data === null) {
                res.json('Invalid username or password')
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
    checkAuth: async () => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
            console.log(verify);
            let data = await studentModel.findeOne({ _id: verify.data })
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
    getProfile: async () => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
            let data = await studentModel.findeOne({ _id: verify.data })
            if (data !== null) {
                res.json(data)
            } else {
                res.json(false)
            }
        } catch (err) {
            res.json(false)
        }
    },
    getAttendance: async () => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
            res.json('attendance')
        } catch (err) {
            res.json(false)
        }
    }
    ,
    getResult: async () => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
            res.json('result')
        } catch (err) {
            res.json(false)
        }
    }
    ,
    getClubs: async () => {
        try {
            let data = await club.find().lean()
            res.json(data)
        } catch (err) {
            res.json(false)
        }
    }
    ,
    getNotice: async () => {
        try {
            let data = await notice.find().lean()
            res.json(data)
        } catch (err) {
            res.json(false)
        }
    },
    // ====>CLUB REQUEST SEND>====
    postClub: async () => {

    }
    ,
    // ======>PROFILE UPDATE<=====
    postProfile: async () => {
        try {
            console.log(req.body);
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
            };

            if (req.file) {
                updateData.image = req.file[0].filename;
            }

            let data = await studentModel.updateOne({ _id: id }, updateData);

            console.log(data);
            res.json('Student Data Updated');

        } catch (err) {

            res.json(false);
        }
    },
    // =======>UPDATE PASSWORD<====
    postPassword: async () => {
        try {
            let data = await jwtVerify(req.cookies.studentjwt)
            let newPassword = bcrypt.hash(req.body.password, 10)
            let student = await studentModel.updateOne({ _id: data.data }, { password: newPassword })
            console.log(student);
        } catch (err) {
            res.json(false)
        }
    }
}

module.exports = student