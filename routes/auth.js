const express       = require('express');
const router        = express.Router();
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;

var expressValidator = require('express-validator');

const bcrypt = require('bcryptjs');

//Bring in Models
let Item = require('../models/item');
let User = require('../models/user');

router.post('/register', function(req,res) {  
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
    }else{
        var email       = req.body.email;
        var username    = req.body.username;
        var password    = req.body.password;

        var salt = bcrypt.genSaltSync(10);
        var hash_password = bcrypt.hashSync(password, salt);

        var newUser =   new User({
            username: username,
            email: email,
            password: hash_password
        });

        newUser.save(function(err) {
            if (err) {
                if (err.name == 'MongoError')
                res.send('unique-error');
            } else {
                res.send('validation-complete');
            }
        });
    }
});


// router.post('/login', function(req, res) {
//     /**
//      * Requests validation.
//      */
//     req.checkBody('email', 'Invalid email please try again.').isEmail();
//     req.checkBody('email', 'Email must be between 4-100 characters long.').len(4,100);
//     req.checkBody('password', 'Password must be between 4-127 characters long.').len(4,127);

//     var errors = req.validationErrors();
//     if (errors) {
//         res.send(errors);
//     }
//     var email    = req.body.email;
//     var password = req.body.password;
//     res.send('OLLA OK');
// });
// 
// 
passport.use(new LocalStrategy({
  },
  function (email, password, done) {
    User.findOne({email : email}, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: 'Incorrect email'});
      }
      User.comparePassword(password, user.password, function(err, isMatch)  {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else{
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      res.send(info);
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      res.send('logedIn');
    });
  })(req, res, next);
});





router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;