const bcrypt = require("bcrypt")
const { studentModel } = require("../models/studentScheema")
const { jwtSign, jwtVerify } = require("../heplers/jwt")

const { club } = require("../models/clubScheema")
const { notice } = require("../models/noticeScheema")


const otpGenerator = require('otp-generator')
const nodeMail = require("../heplers/nodeMailer")
const { clubRequestScheema } = require("../models/clubRequestsModel")
const { leaveApplyScheema } = require("../models/studentLeaveapply")
const { resultScheema } = require("../models/resultScheema")
const { attendenceScheema } = require("../models/attendance")
const { complaintScheema } = require("../models/complaintMode")
const { semester } = require("../models/semesterScheema")
const { Pagination } = require("../heplers/pagination")
const { approveModel } = require("../models/approveRequests")
const { paymentModel } = require("../models/payment")
const { paymentHistoryModel } = require("../models/paymentHistory")
const { isObjectIdOrHexString } = require("mongoose")
require('dotenv')
const stripe = require('stripe')(process.env.STRIP_KEY)
const OtpGen = () => {
    return otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false, lowerCaseAlphabets: false
    });
}

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
                    res.cookie('studentjwt', await jwtSign(data._id), { withCredentials: true, httpOnly: true, secure: false, sameSite: "Lax", maxAge: 1000000 })
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
    checkAuth: async (req, res) => {
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
    getProfile: async (req, res) => {
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
    getAttendance: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
            let data = await attendenceScheema.find({ studentId: verify.data }).sort({ _id: -1 }).exec()
            res.json(data)
        } catch (err) {
            res.json(false)
        }
    }
    ,
    getResult: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
            console.log(req.query.semWise);
            let key = req.query.semWise.replace(/[^0-9]/g, "")
            console.log(key, 'uuuuu');
            let data = await resultScheema.find({ studentId: verify.data, semester: new RegExp(key, 'i') }).sort({ _id: -1 }).exec()
            res.json(data)
        } catch (err) {
            res.json(false)
        }
    }
    ,
    getClubs: async (req, res) => {
        try {

            let val = { limit: await club.count(), skip: 0, total: 0 }
            if (req.query.pageNo) {
                let { limit, skip, total } = await Pagination(req.query.pageNo, club, 3)
                val.limit = limit
                val.skip = skip
                val.total = total
            }

            let clubs = await club.find().limit(val.limit).skip(val.skip).sort({ _id: -1 }).exec()

            let verify = await jwtVerify(req.cookies.studentjwt)

            let student = await studentModel.findOne({ _id: verify.data })
            let total = val.total
            res.json({ club: clubs, student: student, total })
        } catch (err) {
            console.log(err);
            res.json(false)
        }
    }
    ,
    getNotice: async (req, res) => {
        try {
            let val = { limit: await notice.count(), skip: 0, total: 0 }
            if (req.query.pageNo) {
                let { limit, skip, total } = await Pagination(req.query.pageNo, notice, 8)
                val.limit = limit
                val.skip = skip
                val.total = total
            }
            let key = req.query.search.replace(/[^a-zA-Z]/g, "").replace(/[^a-zA-Z]/g, "")
            let data = await notice.find({ name: new RegExp(key, 'i') }).limit(val.limit).skip(val.skip).sort({ _id: -1 }).exec()
            let total = val.total
            res.json({ data, total })
        } catch (err) {
            res.json(false)
        }
    },
    getLeaveLetterStatus: async (req, res) => {

    },
    getNotificationCalender: async (req, res) => {

    },
    getclubStatus: async (req, res) => {
        try {
            let data = await clubRequestScheema.find().sort({ _id: -1 }).exec()

            res.json(data)
        } catch (err) {
            res.json(false)
        }
    },
    getLeaveletters: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)

            let student = await studentModel.findOne({ _id: verify.data })

            let allLeaveletters = await leaveApplyScheema.find().sort({ _id: -1 }).exec()

            let arr = []
            if (allLeaveletters !== null) {
                for (let i = 0; i < allLeaveletters.length; i++) {
                    if (student._id == allLeaveletters[i].studentId) {

                        arr.push(allLeaveletters[i])
                    }
                }
            }

            res.json(arr)
        } catch (err) {

            res.json(false)
        }
    },
    viewSemester: async (req, res) => {
        try {
            let allSemesters
            if (req.query.Dep) {

                allSemesters = await semester.find({ department: req.query.Dep }).lean()
            }
            else if (req.query.resultSem) {

                let verify = await jwtVerify(req.cookies.studentjwt)
                let student = await studentModel.findOne({ _id: verify.data })
                let dep = student.department

                allSemesters = await semester.find({ department: dep }).lean()
                console.log(allSemesters, 'kkkkk');
            } else {
                allSemesters = await semester.find().lean()
            }
            res.json(allSemesters)
        } catch (err) {
            res.json(false)
        }
    },
    viewDepartment: async (req, res) => {
        try {
            let allDepartments = await department.find().sort({ _id: -1 }).exec()
            res.json(allDepartments)

        } catch (err) {
            res.json(false)
        }
    },
    viewPayment: async (req, res) => {
        try {
            let {limit,skip,total}=await Pagination(req.query.page,paymentModel,8)
            let val={
                limit:await paymentModel.count(),
                skip:0,
                total:0
            }
            if (req.query.page) {
                val.limit=limit
                val.skip=skip
                val.total=total
            }
            let key = ''
            if (req.query.search) {
                key = req.query.search.replace(/[^a-zA-Z]/g, '').replace(/[^a-zA-Z]/g, '')
            }

            let pay = await paymentModel.find({ title: new RegExp(key, 'i') }).limit(val.limit).skip(val.skip).sort({ _id: -1 }).exec()
            let history = await paymentHistoryModel.find()
            let verify = await jwtVerify(req.cookies.studentjwt)

            let arr = []
            if (history) {
                for (let i = 0; i < pay.length; i++) {
                    let s = ''
                    for (let j = 0; j < history.length; j++) {

                        if (pay[i]._id.equals(history[j].paymentId) && history[j].studentId == verify.data) {

                            s = history[j].status

                        }

                    }
                    let obj = {
                        _id: pay[i]._id,
                        status: s,
                        title: pay[i].title,
                        amount: pay[i].amount
                    }
                    arr.push(obj)

                }
            }

            let newarr = [...new Set(arr)]

            res.json({payment:newarr,total:val.total})
        } catch (err) {
            console.log(err);
            res.json(false)
        }
    },
    ForgotPass: async (req, res) => {
        try {
            let data = await studentModel.findOne({ email: req.body.email })
            // console.log(data);
            if (data != null) {
                let otp = OtpGen()
                const subject = "COLLEGE MANAGEMENT SYSTEM ✔"
                let OTP = `Your OTP: ${otp}`
                nodeMail(req.body.email, OTP, subject)

                res.json({ otp: otp, text: '' })
            } else {
                res.json({ otp: false, text: 'Plese Enter Registered Email' })
            }
        } catch (err) {
            console.log(err);
            res.json(false)
        }
    },
    calander: async (req, res) => {
        try {
            let newArr = []
            let verify = await jwtVerify(req.cookies.studentjwt)
            let id = verify.data
            let notification = []
            let cluReq = await clubRequestScheema.find({ $and: [{ studentId: id }, { status: 'Now Your a Member' }] }).lean()
            let clubs = await club.find().lean()
            for (let i = 0; i < cluReq.length; i++) {
                for (let j = 0; j < clubs.length; j++) {
                    if (cluReq[i].clubId == clubs[j]._id) {
                        let obj = {
                            clubName: clubs[j].name,
                            meeting: clubs[j].meeting
                        }
                        notification.push(obj)
                    }
                }

                // ==============================================================================

                for (let i = 0; i < notification.length; i++) {
                    for (let j = 0; j < notification[i].meeting?.length; j++) {
                        // ===================TIME AND DATE CONVERT TO ISO==============================
                        const [time, meridiem] = notification[i].meeting[j].time.split(" ");
                        const [hours, minutes] = time.split(":").map(Number);
                        const [day, month, year] = notification[i].meeting[j].date.split("/").map(Number);
                        const adjustedHours = meridiem.toLowerCase() === "pm" ? hours + 12 : hours;
                        const date = new Date(year, month - 1, day, adjustedHours, minutes);
                        const isoFormat = date.toISOString().slice(0, -5);

                        // ===============================================================================
                        let color = ''
                        let currentDate = new Date().toISOString().slice(0, -5)
                        if (currentDate < isoFormat) {
                            color = '#9df5aa'
                        } else {
                            color = '#ff8585'
                        }
                        let obj = {
                            id: Date.now() + j,
                            color: color,
                            from: isoFormat + '+00:00',
                            to: isoFormat + '+00:00',
                            title: `${notification[i].clubName} club, Venue : ${notification[i].meeting[j].place}`
                        }
                        newArr.push(obj)
                    }

                }

            }

            // ========================================PAYMENT=================================================
            let payHistory = await paymentModel.find().sort({ _id: -1 }).exec()
            if (payHistory) {
                for (let i = 0; i < payHistory.length; i++) {
                    let color = ''
                    let isoFormat = new Date(payHistory[i].date).toISOString().slice(0, -5)
                    let currentDate = new Date().toISOString().slice(0, -5)
                    if (currentDate < isoFormat) {
                        color = '#9df5aa'
                    } else {
                        color = '#ff8585'
                    }
                    let obj = {
                        id: Date.now() + i,
                        color: color,
                        from: isoFormat + '+00:00',
                        to: isoFormat + '+00:00',
                        title: `${payHistory[i].title} Due Date`
                    }
                    newArr.push(obj)
                }
            }
            // ================================================================================================
            res.json(newArr)
        } catch (err) {
            res.json(false)
        }
    },
    // ====>CLUB REQUEST SEND>====
    postClub: async (req, res) => {

    }
    ,
    // ======>PROFILE UPDATE<=====
    postProfile: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
            let id = verify.data

            let updateData = {
                id: id,
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
                category: 'student',
                date: new Date().toLocaleDateString('en-GB')
            };

            if (req.file !== undefined) {

                updateData.image = await req.file.filename;

            }

            let data = await approveModel.create(updateData);

            console.log(data);
            res.json('Update Request Successfully Done');

        } catch (err) {

            res.json(false);
        }
    },
    // =======>UPDATE PASSWORD<====
    postPassword: async (req, res) => {
        try {

            let data = await jwtVerify(req.cookies.studentjwt)
            let newPassword = await bcrypt.hash(req.body.pass, 10)
            await studentModel.updateOne({ _id: data.data }, { password: newPassword })

            req.json('password updated')
        } catch (err) {
            res.json(false)
        }
    },
    postComplaint: async (req, res) => {
        try {
            let data = await jwtVerify(req.cookies.studentjwt)
            let student = await studentModel.findOne({ _id: data.data })
            console.log(req.body);
            let dataa = await complaintScheema.create({
                title: req.body.title,
                content: req.body.content,
                name: student.name,
                date: new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }),
                who: 'Student',
                complainterId: student._id,
                department: student.department,
                className: student.className,
                semester: student.semester
            })
            console.log('dsfg', dataa);
            res.json(true)

        } catch (err) {
            console.log(err);
            res.json(false)
        }
    },
    postLeaveLetter: async (req, res) => {
        try {


            let id = await jwtVerify(req.cookies.studentjwt)
            let student = await studentModel.findOne({ _id: id.data })
            await leaveApplyScheema.create({
                studentName: student.name,
                department: student.department,
                semester: student.semester,
                className: student.className,
                studentId: id.data,
                reson: req.body.reason,
                date: req.body.date,
                status: 'Applyed'

            })

            res.json('Leave letter Applayed Successfully')
        } catch (err) {

            res.json(false)
        }
    },
    postMailVerify: async (req, res) => {
        try {
            let data = await studentModel.findOne({ $or: [{ email: req.body.data }, { mobNumber: req.body.data }] })
            const subject = "COLLEGE MANAGEMENT SYSTEM ✔"
            if (data !== null) {
                let otp = OtpGen()
                let OTP = `Your OTP: ${otp}`
                nodeMail(data.email, OTP, subject)
                res.json({ otp: otp })
            } else {
                res.json({ otp: false, text: 'Enter Your Registerd Email or Mobile Number' })
            }
            console.log(data);
        } catch (err) {
            res.json(false)
        }
    },
    applyPassword: async (req, res) => {
        try {


            let newPassword = await bcrypt.hash(req.body.newpass, 10)
            let data = await studentModel.updateOne({ email: req.body.email }, { password: newPassword })
            console.log(data);
            req.json('password updated')
        } catch (err) {
            res.json(false)
        }
    },
    clubRequest: async (req, res) => {
        try {
            const data = await clubRequestScheema.create({
                studentName: req.body.studentName,
                department: req.body.department,
                semester: req.body.semester,
                clubName: req.body.clubName,
                status: req.body.status,
                clubAdminId: req.body.clubAdminId,
                clubAdminName: req.body.clubAdminName,
                studentId: req.body.studentId,
                clubId: req.body.clubId
            });


            if (data !== null) {
                res.json('Club Request sent successfully');
            } else {
                res.json(false);
            }
        } catch (err) {
            res.json(false);
        }
    },
    viewPaymentPost: async (req, res) => {
        try {
            const { title, amount, id } = req.body
            let sid = await jwtVerify(req.cookies.studentjwt)
            let currentDate = new Date().toLocaleDateString('en-GB')
            let data = await paymentHistoryModel.create({
                paymentId: id,
                studentId: sid.data,
                payDate: currentDate
            })
            let amounts = parseInt(amount)
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: title,
                            },
                            unit_amount: amounts * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.URL_SUCCESS}?id=${data._id}`,
                cancel_url: `${process.env.URL_CANCEL}?id=${data._id}`,
            });

            console.log(data);
            res.json({ url: session.url, id: data._id });
        } catch (err) {
            console.log(err);
            res.json(false)
        }

    },
    PaymentSuccess: async (req, res) => {
        try {
            // ===========================================================================================
            let id = await jwtVerify(req.cookies.studentjwt)

            let data = await paymentHistoryModel.updateOne({ _id: req.query.id }, { status: true })

            let da = await paymentHistoryModel.deleteMany({ studentId: id.data, status: 'process' });
            console.log(da);
            // ===========================================================================================
            console.log(data);
            res.redirect(`${process.env.BASE_URL}`)
        } catch (err) {
            res.redirect(`${process.env.BASE_URL}`)
        }
    },
    PaymentCancel: async (req, res) => {
        try {
            // ===========================================================================================
            let id = await jwtVerify(req.cookies.studentjwt)

            let data = await paymentHistoryModel.updateOne({ _id: req.query.id }, { status: false })

            let da = await paymentHistoryModel.deleteMany({ studentId: id.data, status: 'process' });
            console.log(da);

            // ===========================================================================================
            console.log(data);
            res.redirect(`${process.env.BASE_URL}`)
        } catch (err) {
            res.redirect(`${process.env.BASE_URL}`)
        }
    },
    // =======>logout<=======
    logOut: (req, res) => {
        res.cookie('studentjwt', '').json(true)
    }
}

module.exports = student