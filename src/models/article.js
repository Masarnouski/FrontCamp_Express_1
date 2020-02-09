var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const articleSchema = new mongoose.Schema({
    id: Number,
    urlToImage: String,
    title: String,
    description: String,
    publishedAt: Date,
    createdByMe: Boolean
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