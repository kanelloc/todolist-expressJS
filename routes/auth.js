const express   = require('express');
const router    = express.Router();

var expressValidator = require('express-validator');

//Bring in Models
let Item = require('../models/item');
let User = require('../models/user');

router.post('/', function(req,res) {  
    /**
     * Requests Validation
     */
    req.checkBody('username', 'Username field cannot be empty').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4,15);
    req.checkBody('email', 'Invalid email please try again.').isEmail();
    req.checkBody('email', 'Email must be between 4-100 characters long.').len(4,100);
    req.checkBody('password', 'Password must be between 4-127 characters long.').len(4,127);
    req.checkBody('password_confirmation', 'Passwords do not match, please try again.').equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
    }
    var password    = req.body.password;
    var email       = req.body.email;
    var username    = req.body.username;
    res.send(username);
})

module.exports = router;