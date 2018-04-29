var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var route = require('./routes/route');

var io = require('socket.io')(http,{ origins: '*:*'});

var chat = require('./socket/chat')(io);
app.use('/', route);


http.listen(3000);
