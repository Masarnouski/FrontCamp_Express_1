const express = require('express');
var app = express();
const fs = require('fs');
const util = require('util')
var bodyParser = require('body-parser')

app.set('views', './src/views')
app.set('view engine', 'pug');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


var newsRouter = require('./news-router');

app.use('/news', newsRouter);


app.use(errorHandler);

function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(err.status || 500);
    //res.send('Hello')
    res.render("common-error-template", { title: err , message: err.status || 500 })
  }

