var express = require('express');
var db = require('../repositories/db');

exports.IsAuthenticated = function (req,res,callback){
    var session = req.body.session;
    var userType = req.body.userType;
    var table = db.studentTable;
    if(userType=='tutor'){
        table = db.tutorTable;
    }
    var query = "SELECT * FROM "+table+" WHERE session='"+session+"'";
    db.getData(query,function(response){
        if(!response)
            return callback(false);
        return true;
    });
};