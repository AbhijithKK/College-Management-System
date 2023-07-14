const { jwtVerify } = require("../heplers/jwt");
const { studentModel } = require("../models/studentScheema");

 const studentAuth=async (req,res,next) => {
    try {
        let verify = await jwtVerify(req.cookies.studentjwt)
        console.log(verify);
        let data = await studentModel.findOne({ _id: verify.data })
        if (data !== null) {
           next()
        } else {
            res.json(false)
        }
    } catch (err) {
        res.json(false)
    }

}
module.exports={studentAuth}