const multer=require('multer')


// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  let upload = multer({ storage: storage })
  module.exports=upload



// IF UPLOAD PDF ONLY USE THIS

  // const fileFilter = (req, file, cb) => {
  //   // Check if the uploaded file is a PDF
  //   if (file.mimetype === 'application/pdf') {
  //     cb(null, true); // Accept the file
  //   } else {
  //     cb(new Error('Only PDF files are allowed'), false); // Reject the file
  //   }
  // };
  
  // const upload = multer({ storage, fileFilter });
  