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

const OtpGen=()=>{
    return   otpGenerator.generate(6, { upperCaseAlphabets: false, 
        specialChars: false ,lowerCaseAlphabets:false});
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
            let data=await attendenceScheema.find({studentId:verify.data}).sort({_id:-1}).exec()
            res.json(data)
        } catch (err) {
            res.json(false)
        }
    }
    ,
    getResult: async (req,res) => {
        try {
            let verify = await jwtVerify(req.cookies.studentjwt)
            let data=await resultScheema.find({studentId:verify.data}).sort({_id:-1}).exec()
            res.json(data)
        } catch (err) {
            res.json(false)
        }
    }
    ,
    getClubs: async (req,res) => {
        try {
            
            let clubs = await club.find().sort({_id:-1}).exec()
            
            let verify = await jwtVerify(req.cookies.studentjwt)
           
            let student = await studentModel.findOne({ _id: verify.data })
            
            res.json({club:clubs,student:student})
        } catch (err) {
            console.log(err);
            res.json(false)
        }
    }
    ,
    getNotice: async (req,res) => {
        try {
            let data = await notice.find().sort({_id:-1}).exec()
            res.json(data)
        } catch (err) {
            res.json(false)
        }
    },
    getLeaveLetterStatus: async (req,res) => {

    },
    getNotificationCalender: async (req,res) => {

    },
    getclubStatus:async(req,res)=>{
        try{
            let data=await clubRequestScheema.find().sort({_id:-1}).exec()
            
            res.json(data)
        }catch(err){
            res.json(false)
        }
    },
    getLeaveletters:async(req,res)=>{
        try{
            let verify = await jwtVerify(req.cookies.studentjwt)
           
            let student = await studentModel.findOne({ _id: verify.data })

            let allLeaveletters =await leaveApplyScheema.find().sort({_id:-1}).exec()
            
            let arr=[]
            if (allLeaveletters!==null) {
                for (let i = 0; i < allLeaveletters.length; i++) {
                    if (student._id==allLeaveletters[i].studentId) {
                        
                        arr.push(allLeaveletters[i])
                    }
                }
            }
            
            res.json(arr)
        }catch(err){
           
            res.json(false)
        }
    },
    viewSemester: async (req, res) => {
        try {
            let allSemesters
            if (req.query.Dep) {
                allSemesters = await semester.find({department:req.query.Dep}).lean()
                res.json(allSemesters)
                return
            }
            allSemesters = await semester.find().lean()
            res.json(allSemesters)
        } catch (err) {
            res.json(false)
        }
    },
    viewDepartment: async (req, res) => {
        try {
            let allDepartments = await department.find().sort({_id:-1}).exec()
            res.json(allDepartments)
            
        } catch (err) {
            res.json(false)
        }
    },
    ForgotPass:async(req,res)=>{
        try{
            let data=await studentModel.findOne({email:req.body.email})
            // console.log(data);
            if (data!=null) {
                let otp=OtpGen()
                const subject= "COLLEGE MANAGEMENT SYSTEM ✔"
                    let OTP=`Your OTP: ${otp}`
                    nodeMail(req.body.email,OTP,subject)
                    
                res.json({otp:otp,text:''})
            }else{
                res.json({otp:false,text:'Plese Enter Registered Email'})
            }
        }catch(err){
            console.log(err);
            res.json(false)
        }
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
            let newPassword =await bcrypt.hash(req.body.pass, 10)
             await studentModel.updateOne({ _id: data.data }, { password: newPassword })
            
           req.json('password updated')
        } catch (err) {
            res.json(false)
        }
    }, 
    postComplaint: async (req,res) => {
        try{
            let data = await jwtVerify(req.cookies.studentjwt)
            let student = await studentModel.findOne({ _id: data.data })
            console.log(req.body);
           let dataa= await complaintScheema.create({
                title:req.body.title,
                content:req.body.content,
                name:student.name,
                date: new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }),
                who:'Student',
                complainterId:student._id,
                department:student.department,
                className:student.className,
                semester:student.semester
            })
            console.log('dsfg',dataa);
            res.json(true)

        }catch(err){
            console.log(err);
            res.json(false)
        }
    },
    postLeaveLetter: async(req,res) => {
        try{
            
           
            let id = await jwtVerify(req.cookies.studentjwt)
            let student = await studentModel.findOne({ _id:id.data })
            await leaveApplyScheema.create({
                studentName:student.name,
                department:student.department,
                semester:student.semester,
                className:student.className,
                studentId:id.data,
                reson:req.body.reason,
                date:req.body.date,
                status:'Applyed'

            })
           
            res.json('Leave letter Applayed Successfully')
        }catch(err){
            
            res.json(false)
        }
    },
    postMailVerify:async(req,res)=>{
        try{
        let data=await studentModel.findOne({$or:[{email:req.body.data},{mobNumber:req.body.data}]})
       const subject= "COLLEGE MANAGEMENT SYSTEM ✔"
        if (data!==null) {
            let otp=OtpGen()
            let OTP=`Your OTP: ${otp}`
            nodeMail(data.email,OTP,subject)
            res.json({otp:otp})
        }else{
            res.json({otp:false,text:'Enter Your Registerd Email or Mobile Number'})
        }
        console.log(data);
        }catch(err){
            res.json(false)
        }
    },
    applyPassword: async (req,res) => {
        try {
            
            
            let newPassword =await bcrypt.hash(req.body.newpass, 10)
         let data=await studentModel.updateOne({ email:req.body.email}, { password: newPassword })
            console.log(data);
           req.json('password updated')
        } catch (err) {
            res.json(false)
        }
    }, 
    // =======>logout<=======
    logOut: (req, res) => {
        res.cookie('studentjwt', '').json(true)
    }
}

module.exports = student