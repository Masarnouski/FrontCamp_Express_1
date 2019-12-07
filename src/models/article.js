var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const articleSchema = new mongoose.Schema({
    author: String,
    title: String,
    url: String,
    id:Number
});
console.log(mongoose.connection)
autoIncrement.initialize(mongoose.connection);


articleSchema.plugin(autoIncrement.plugin, {
    model: 'Article',
    field: 'id',
    startAt: 0,
    incrementBy: 1
});

const Article = mongoose.model('Article', articleSchema);


module.exports = Article;