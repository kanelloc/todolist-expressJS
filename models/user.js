let mongoose = require('mongoose');

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
});

let User = module.exports = mongoose.model('User', userSchema);