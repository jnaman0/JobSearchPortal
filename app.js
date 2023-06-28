const express = require("express") ;
const app = express() ;
let PORT = 5000 ;

const sendEmail = require("./controller/sendEmail.js") ;

app.get("/" , (req,res)=>{
    res.send("I am a server") ;
})

app.get("/sendemail" , sendEmail ) ; 

const start = async()=>{
    try{
        app.listen(PORT,()=>{
            console.log(`I am live in port no. ${PORT}`);
        }) ;
    }catch(error){}
};