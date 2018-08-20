const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const movies = require('./routes/movie');
const mongoose = require('./config/database');
var jwt =  require('jsonwebtoken');
const app = express();
app.set('secretKey','nodeRestApi');
//connection to mongodb
mongoose.connection.on('error',console.error.bind(console, 'MongoDB connection error:'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extend:false}));
app.get('/',function(req, res){
    res.json({"tutorial":"Build REST API with node.js"});
});
//public routes
app.use('/users',users);
app.use('/movies',validateUser,movies)
app.get('/favicon.ico',function(req,res){
    res.sendStatus(204);
});

function validateUser(req, res, next){
    jwt.verify(req.headers['x-access-token'],req.app.get('SecretKey'),function (err,decoded) {
       if(err){
           res.json({status:"error", message:err.message,data:null});
       }
       else{
           req.body.userId = decoded.id;
           next();
       }
    });

}
//handle 404 explicitly
app.use(function(req, res, next){
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});
//handling
app.use(function(err,req,res, next){
    console.log(err);
    if(err.status === 404)
        res.status(404).json({message:"Not Found"});
    else
        res.status(500).json({message:"Interna err"});

});


app.listen(3000,function(){
    console.log('node server litening on port 3000');
});
