const mongoose = require('mongoose');
require('dotenv')
module.exports = function db() {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Server Connected!')).catch((err) => {
      console.log(err);
    })
}
