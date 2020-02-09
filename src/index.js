const express = require('express');
var app = express();
var cors = require('cors')
const fs = require('fs');
const util = require('util')
var bodyParser = require('body-parser')
var mongoConfig = require('./models');


mongoConfig.connectDb().then(async () => {
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    console.log(process.env.JWT_KEY);
  });
});

app.use(cors())
app.set('views', './src/views')
app.set('view engine', 'pug');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var newsRouter = require('./routers/news-router');
var userRouter = require('./routers/user-router');

app.use('/news', newsRouter);
app.use('/users', userRouter);



app.use(errorHandler);

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  let statusCode = err.statusCode || 500;

  res.status(statusCode);
  res.render("common-error-template", { title: err, message: statusCode })
}

