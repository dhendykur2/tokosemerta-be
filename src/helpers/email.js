require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE || 'gmail',
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS_EMAIL
  }
});
module.exports = {
  send: (options) => {
    return transporter.sendMail(options, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
};
