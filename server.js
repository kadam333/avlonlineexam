var express=require('express');
var session = require('express-session')

// var session=require('express-session')

var bodyparser=require('body-parser');

var path=require('path');

const api=require('./server/router/api')

var app=express();

app.use(express.static(path.join(__dirname+'/dist/Gacc')));

app.use('/api' ,api);

app.use(bodyparser.json());

app.use('*',(req,res)=>{
	res.sendFile(path.join(__dirname+'/dist/Gacc/index.html'));
})

app.listen(3000,function(){
console.log("server connected");
})