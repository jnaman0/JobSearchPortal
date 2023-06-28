const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rockingaman9352@gmail.com',
      pass: 'deuvtfekyiwdpqhj' 
    }
  });
 
  module.exports.sendMailFromAnother = function (mailOptions){
    console.log('hi from Sender mail');
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('Error',error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }
