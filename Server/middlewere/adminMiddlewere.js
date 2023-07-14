const { jwtVerify } = require("../heplers/jwt")

 // <====AUTHENDICATION  VERIFY====>
  async function adminAuth (req, res,next) {
    try{
    let loginverify= await jwtVerify(req.cookies.jwtAdmin)
   if (loginverify.data==123456) {
   next()
   }else{
    res.json(false)
   }
}catch(err){
    res.json(false)
}

}

module.exports= {adminAuth}