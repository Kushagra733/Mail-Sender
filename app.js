const express = require('express');
const nodemailer = require('nodemailer');
const parser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

var urlencoded = parser.urlencoded({ extended: true });

app.set('view engine' ,'ejs');

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/',urlencoded,(req,res)=>{

    console.log(req.body);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: req.sender,
        to: req.receiver,
        subject: 'Sending Email using Node.js',
        text: req.text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

})

app.listen(3000);


