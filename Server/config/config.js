const mongoose = require('mongoose');

module.exports=function db(){
    mongoose.connect('mongodb://127.0.0.1:27017/CMSM')
  .then(() => console.log('Server Connected!')).catch((err)=>{
    console.log(err);
  })
}
  