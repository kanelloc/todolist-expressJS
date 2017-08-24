let mongoose = require('mongoose');

var bcrypt = require('bcrypt');
const saltRounds = 10;

// user Schema

let userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, { collection: 'users'});

let User = module.exports = mongoose.model('User', userSchema);