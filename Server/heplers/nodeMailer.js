"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    
    user: process.env.GMAIL,
    pass: process.env.GPASS
  }
});

async function nodeMail(userMail, OTP) {
  const info = await transporter.sendMail({
    from: process.env.GMAIL, // sender address
    to: userMail, // recipient address
    subject: "COLLEGE MANAGEMENT SYSTEM ✔", // Subject line
    text: `Your OTP: ${OTP}`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}



module.exports = nodeMail;
