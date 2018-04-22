var express = require('express');
var router = express.Router();
var auth = require('../repositories/auth');
router.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/',function (req,res){
    auth.IsAuthenticated(req,res,function(response){
        if(!response)
            res.send('Unauthorised Access');
        res.send('AuthenticatedUser');
    })

});

module.exports = router;

