const { jwtVerify } = require("../heplers/jwt");
const { studentModel } = require("../models/studentScheema");

const studentAuth = async (req, res, next) => {
    try {
        let verify = await jwtVerify(req.cookies.studentjwt)
        let data = await studentModel.findOne({ _id: verify.data })
        if (data !== null) {
            console.log('success');
            next()
        } else {
            res.json(false)
        }
    } catch (err) {
        res.json(false)
    }

}
module.exports = { studentAuth }