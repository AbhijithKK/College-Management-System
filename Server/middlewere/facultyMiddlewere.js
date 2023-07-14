const { jwtVerify } = require("../heplers/jwt");
const { facultyModel } = require("../models/facultyScheema");

const facultyAuth = async (req, res, next) => {
    try {
        let verify = await jwtVerify(req.cookies.facultyjwt)
        console.log(verify);
        let data = await facultyModel.findOne({ _id: verify.data })
        if (data !== null) {
            next()
        } else {
            res.json(false)
        }
    } catch (err) {
        res.json(false)
    }
}
module.exports = { facultyAuth }