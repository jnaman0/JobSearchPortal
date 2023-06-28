const http = require('http');
const bodyParser = require('body-parser');
const fs = require('fs');
const mailFunction = require('./sendEmail');
const hostname = '127.0.0.1';
const port = 5500;

var dataOfUser = []
var expectedOtp ;
var emailOfuser ;
var nameOfUser ;

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var indexFile;
var verificationFile ;
var cssFile ;
var verifyFile ;
var setPassword ;
var setPasswordJs ;
var homePage ;

// read index/HTML file
fs.readFile('./index.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    indexFile=data;
  });

// read verification/HTML file 
  fs.readFile('./verification.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    verificationFile=data;
  });

// read 2/CSS file
fs.readFile('./2.css', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  cssFile=data;
});

// read verify/js file
fs.readFile('./verify.js', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  verifyFile=data;
});

// read setpassword/HTML file
fs.readFile('./setPassword.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  setPassword = data;
});

// read setpassword/Js file
fs.readFile('./setPassword.js', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  setPasswordJs = data;
});

// read index/HTML file of Home Page
fs.readFile('./home.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  homePage=data;
});

// Handle the HTTP GET request
app.get('/', (req, res) => {
    res.contentType('.html');
    res.send(indexFile);
});

// Handle the HTTP GET request For Home
app.get('/home', (req, res) => {
  res.contentType('.html');
  res.send(homePage);
});

// Handle the HTTP POST request to send mail
app.post('/endpoint', (req, res) => {
    res.send('Function called successfully!');
    emailOfuser = req.body.to ;
    expectedOtp = req.body.text ;
    nameOfUser = req.body.Name ;
    // const jsonObjofUserData = {
    //   'Email' : emailOfuser ,
    //   'OTP' : expectedOtp ,
    //   'Name' : nameOfUser
    // } 
    //dataOfUser.push(jsonObjofUserData) ;
    
      let userInfo = new userDataCollection();
      userInfo.email=emailOfuser ;
      userInfo.otp = expectedOtp ;
      userInfo.name = nameOfUser ;
      
      async function insertUserData(){
      try{
        userInfo.save();
        console.log('created')
      }catch(e){
      console.log(e._message);
      } 
      }
      insertUserData();
      
      mailFunction.sendMailFromAnother(req.body); // Call your function
      console.log('Mail function Executes')

      fetchUserdata();
});

// Handle the HTTP POST request to Save password in local storage 
app.post('/passStoreInStorage',async (req, res) => {
 
  await fetchUserdata();
  console.log(req.body)
  const emailOfPassSave = req.body.Email ;
  const password = req.body.Password ;
  console.log(dataOfUser) ;

  dataOfUser.forEach((element) => {
    console.log(element);
    if(element.email === emailOfPassSave )
    {
      console.log('Email Matched') ;
      const filter = { email : element.email};
      const update = { password: password };
      async function updateDataOfUser(){
        console.log('inside update function')
        const doc =  await userDataCollection.findOneAndUpdate(filter, update, {
        new: true
        });
        console.log(doc.email) ;
        console.log(doc.password) ;
        console.log(' Update sucessfully done')
      }
      updateDataOfUser() ;
    }
   });
  fetchUserdata();
  const responseData = { message: 'Password Set Successfully' };
  res.json(responseData);


});


// Handle the http get request for verification

// 1. HTML 
app.get('/verification.html', (req, res) => {
  res.contentType('.html');
  res.send(verificationFile);
});

// 2.CSS
app.get('/2.css', (req, res) => {
  res.contentType('text/css');
  res.send(cssFile);
});

// 3.JS
app.get('/verify.js', (req, res) => {
  res.contentType('text/js');
  res.send(verifyFile);
});

// Handle the HTTP POST request to verify OTP
app.post('/verifyOTP', (req, res) => {
  console.log(req.body)
  console.log(req.body.enteredOTP)
  console.log(expectedOtp)
  
  if (expectedOtp === req.body.enteredOTP) {
    console.log("OTP Matched");
    // 1 .Alert For OTP matched 
    console.log('Email of Usrr ------> ' , emailOfuser)     
    // 2. Email for URL 
    const urlForPasswordSet = 'http://localhost:5500/setPassword?email=' + emailOfuser; 
    console.log(urlForPasswordSet) 
  
   const mailBody = {
      from: "rockingaman9352@gmail.com",
      subject: "URL To set Password ",
      to: emailOfuser,
      text: urlForPasswordSet 
    };

    // Call your mail  function
    mailFunction.sendMailFromAnother(mailBody); 
    console.log('Mail function Executes')

    const responseDataOfOTP = { message: 'OTP Verified' };
    res.json(responseDataOfOTP);
 } else {
    console.log("OTP Not Matched");
    const responseDataOfOTP = { message: 'OTP Not  Verified' };
    res.json(responseDataOfOTP);
  }
});

// Handle the post request to log in 
app.post('/checkUserExistOrNot', async(req, res) => {
 
  await fetchUserdata()
 console.log(dataOfUser)
 console.log(req.body) ;
 var countForUserExist = 0 ;
 const emailSignIn  = req.body.SignInEmail ;
 const pasSignIn = req.body.SignInPassword ; 
 var nameTohome ;

 dataOfUser.forEach((item)=>{
  console.log(item) ;
   if(item.email===emailSignIn && item.password === pasSignIn)
   {
    countForUserExist++ ;
    nameTohome = item.name ;
  }

 });

 if(countForUserExist != 0)
 {
  const responseDataForUser = { message: 'USER Exist' , Name : nameTohome };
  res.json(responseDataForUser);
 }
 else{
  const responseDataForUser = { message: 'USER Not Exist' };
  res.json(responseDataForUser);
 }
});

// Handle the http get request for Set Password 
app.get('/setPassword', (req, res) => {
  res.contentType('.html');
  res.send(setPassword);
});
app.get('/setPassword.js', (req, res) => {
  res.contentType('text/js');
  res.send(setPasswordJs);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

//----------------------------DATABASE------------------------------

// Connect with mongodb database
const mongoose = require("mongoose");
const { Schema } = mongoose;
const urlForDatabase = "mongodb+srv://Rampi:rampi9352@firstcluster.wmc2eab.mongodb.net/JobPortal";
mongoose.connect(urlForDatabase, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
.then((client) => { 
  console.log('Successfully connected');
})
.catch((err) => {
  console.log("Unable to connect to MongoDB. Error: " + err);
});

// FETCH USER DATA
const userDataSchema = new Schema({
  email : String, // String is shorthand for {type: String}
  otp: String,
  name: String ,
  password : String 
});
const userDataCollection = mongoose.model("userData", userDataSchema); // Collection

async function fetchUserdata(){
  try{
    dataOfUser = await userDataCollection.find() ;
    console.log('Data Of User Is ' , dataOfUser)
 }catch(e){
 console.log(e._message);
 }
}
fetchUserdata();



