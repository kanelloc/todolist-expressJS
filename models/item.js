let mongoose = require('mongoose');

// Items Schema

let itemSchema = mongoose.Schema({
    body:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
}, { collection: 'items'});

let Item = module.exports = mongoose.model('Item', itemSchema);