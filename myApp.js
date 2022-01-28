var express = require('express');
var app = express();
require('dotenv').config()

console.log("Hello World");

//use of next function with the middleware function
app.use((req,res,next) => {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
})

// use of root middleware function
app.use('/public', express.static(__dirname + '/public'));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
})


//use of environment variable in app.js
app.get("/json", (req,res)=> {
    if(process.env.MESSAGE_STYLE === "uppercase"){
        res.json({
            "message":"HELLO JSON"
        })
    }else{
        res.json({
            "message": "Hello json"
        })
    }
})


//chain middelware function
app.get("/now", (req,res,next) => {
    req.time = new Date().toString();
    next()
},(req,res)=> {
    res.json({
        "time":req.time
    })
})


module.exports = app;   
