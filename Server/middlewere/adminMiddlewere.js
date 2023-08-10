const { jwtVerify } = require("../heplers/jwt");
const { adminModel } = require("../models/adminModel");

// <====AUTHENDICATION  VERIFY====>
async function adminAuth(req, res, next) {
  try {
    let loginverify = await jwtVerify(req.cookies.jwtAdmin);
    let admin=await adminModel.findOne({_id:loginverify.data})
    if (admin!=null) {
      next()
    } else {
      res.json(false)
    }
  } catch (err) {
    res.json(false)
  }

}

module.exports = { adminAuth }