const express   = require('express');
const router    = express.Router();

//Bring in Models
let Item = require('../models/item');
let User = require('../models/user');

router.get('/', ensureAuthenticated, function(req,res) {
    Item.find({"author": req.user._id}, function(err, items) {
        if (err) {
            console.log(err);
        } else {
            res.render('todolist/todo_index', {
            title: 'Todo List',
            items:items,
            });
        }
    });
});

router.post('/', function(req,res) {
    let item = new Item();
    item.body = req.body.todoItem;
    item.author = req.user._id;

    item.save(function(err){
        if (err) {
            console.log(err);
            return;
        } else {
            res.send(item);
        }
    });
});

router.put('/:id', function(req,res) {
    var queryId     =   {_id:req.params.id};
    var data_id     =   req.params.id;
    // Item.update(queryId,{body: req.body.todoItem}, function(err, raw){
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.send(raw);
    //     }
    // });
    // console.log(req.body.todoItem);
    Item.findById(data_id, function(err, item){
        if (err) {
            console.log(err);
        } else {
            var test  =     req.body.todoItem;
            item.body =     req.body.todoItem;
            item.save(function(err, item){
                if (err) {
                    console.log(err);
                }
                res.send(item);
            });
        }
    });
});

router.delete('/:id', function(req,res){
    var queryId =   {_id:req.params.id};
    var data_id =   req.params.id;
    Item.remove(queryId, function(err) {
        if (err) {
            console.log(err);
        }
        res.send(data_id);
    });
});


function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

module.exports = router;