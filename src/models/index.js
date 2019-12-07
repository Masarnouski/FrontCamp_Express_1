var mongoose = require('mongoose');
var Article = require('./article');
var autoIncrement = require('mongoose-auto-increment');


const connectDb = function(){
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
        console.log('Connected to mongoDB server!')
    });

    return mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

};


const models = { Article };

module.exports.models = models;
module.exports.connectDb = connectDb;
