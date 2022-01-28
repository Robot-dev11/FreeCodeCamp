var express = require('express');
var app = express();
require('dotenv').config()

console.log("Hello World");

app.use((req,res,next) => {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
})


app.use('/public', express.static(__dirname + '/public'));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
})

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


module.exports = app;   
