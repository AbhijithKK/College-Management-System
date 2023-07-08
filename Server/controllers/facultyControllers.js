const bcrypt = require("bcrypt")
const { facultyModel} = require("../models/facultyScheema")
const { jwtSign, jwtVerify } = require("../heplers/jwt")

const { club } = require("../models/clubScheema")
const { notice } = require("../models/noticeScheema")


const otpGenerator = require('otp-generator')
const nodeMail = require("../heplers/nodeMailer")
const { clubRequestScheema } = require("../models/clubRequestsModel")

const OtpGen=()=>{
    return   otpGenerator.generate(6, { upperCaseAlphabets: false, 
        specialChars: false ,lowerCaseAlphabets:false});
}

let faculty = {
    // ========>LOGIN VERIFY<=========
    facultyLogin: async (req, res) => {
        try {
            let data = await facultyModel.findOne({ email: req.body.email })
            console.log(data);
            if (data === null) {
                res.json(false)
            } else {
                let datas = await bcrypt.compare(req.body.password, data.password)
                if (datas === true) {
                    res.cookie('facultyjwt', await jwtSign(data._id), { withCrdenttitals: true, httpOnly: false, secure: false, sameSite: "none", maxAge: 1000000 })
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
            let verify = await jwtVerify(req.cookies.facultyjwt)
            console.log(verify);
            let data = await facultyModel.findOne({ _id: verify.data })
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
            let verify = await jwtVerify(req.cookies.facultyjwt)
            let data = await facultyModel.findOne({ _id: verify.data })
            if (data !== null) {
                res.json(data)
            } else {
                res.json(false)
            }
        } catch (err) {
            res.json(false)
        }
    },
    viewClubRequests: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.facultyjwt)
            let allRequests=await clubRequestScheema.find({clubAdminId:verify.data}).lean()
            res.json(allRequests)
        } catch (err) {
            console.log(err);
        }
    },
    // ======>PROFILE UPDATE<=====
    postProfile: async (req,res) => {
        try {
            let verify = await jwtVerify(req.cookies.facultyjwt)
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
                qualifications: req.body.qualifications,
                teachingArea: req.body.teachingArea,
                address: req.body.address,
            };

            if (req.file!==undefined) {
               
                updateData.image =await req.file.filename;
                
            }
          
            let data = await facultyModel.updateOne({ _id: id }, updateData);

            console.log(data);
            res.json('Faculty Data Updated');

        } catch (err) {

            res.json(false);
        }
    },
    postMailVerify:async(req,res)=>{
        try{
        let data=await facultyModel.findOne({$or:[{email:req.body.data},{mobNumber:req.body.data}]})
        if (data!==null) {
            let otp=OtpGen()
            nodeMail(data.email,otp)
            res.json({otp:otp})
        }else{
            res.json({otp:false,text:'Enter Your Registerd Email or Mobile Number'})
        }
        console.log(data);
        }catch(err){
            res.json(false)
        }
    },
    postPassword: async (req,res) => {
        try {
            
            let data = await jwtVerify(req.cookies.facultyjwt)
            let newPassword =await bcrypt.hash(req.body.pass, 10)
             await facultyModel.updateOne({ _id: data.data }, { password: newPassword })
            
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
      clubRequestUpdate:async(req,res)=>{
        try{
            await clubRequestScheema.updateOne({_id:req.body.id},{status:req.body.status})
            res.json(true)
        }catch(err){
            res.json(false)
        }
      }
      
    ,
     // =======>logout<=======
     logOut: (req, res) => {
        res.cookie('facultyjwt', '').json(true)
    }
}

module.exports=faculty