const express = require("express");
const router = express.Router()
const User = require('../models/users')
const nodemailer = require('nodemailer');


//GET ALL 
router.get('/users', async (req, res)=>{
    try{
       const users = await User.find()
       res.json(users)
    } catch  (err) {
      res.status(500).json({message: err.message})
    }
})

//post requist by body
router.post('/users', async (req,res) =>{
 const user = new User({
     name: req.body.name,
     height: req.body.height,
     email: req.body.email,  
 })
 try{
  sendEmail(user)
  const newUser = await user.save()
  res.status(201).json(newUser)
 } catch (err) {
  res.status(400).json({ message: err.message})
 }
});


async function sendEmail(user){
  console.log("emailuser", user)
    const transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
          user: 'demosendmailer@yahoo.com',
          pass: 'przftxehbkznropo'
        }
      });
      
      var mailOptions = {
        from:  'demosendmailer@yahoo.com',
        to: user.email,
        subject: 'email from webform',
        text: `Hi ${user.name} Your height is ${user.height}  Your email is ${user.email}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
 
}

module.exports = router


