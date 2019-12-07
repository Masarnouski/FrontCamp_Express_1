const pathToJson = './src/data.json'
var express = require('express');
const fs = require('fs');
const util = require('util')
var router = express.Router();
var HttpError = require ('./Exceptions/HttpError')

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile)


router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.get('/', function (req, res, next) {
    readFileAsync(pathToJson).then((data) => {
        let news = JSON.parse(data);
        res.send(news);
    })
    .catch(next);
});


router.get('/:id', function (req, res, next) {
    readFileAsync(pathToJson).then((data) => {
        let news = JSON.parse(data);
        let article = news.articles.filter((article => article.id == req.params.id));
        res.send(article);
        })
        .catch(next);
});

router.post('/', function (req, res, next) {
    readFileAsync(pathToJson).then((data) => {
        let dataObject = JSON.parse(data);
        dataObject.articles.push(req.body)
        var stringData = JSON.stringify(dataObject);
        return writeFileAsync(pathToJson, stringData)
        })
        .then(() => {
            console.log('object added')
            res.status(200).send('Added')
        })
        .catch(next);
});



router.put('/:id', function (req, res, next) {
    readFileAsync(pathToJson).then((data) => {
        let news = JSON.parse(data);
        let index = news.articles.findIndex((article => article.id == req.params.id));
        if (index == -1)
            throw new HttpError('Not found', 404)
        news.articles[index] = req.body
        var stringData = JSON.stringify(news);
        return writeFileAsync(pathToJson, stringData)
        })
        .then(() => {
            console.log('object updated')
            res.status(200).send('Changed');
        })
        .catch(next);
})


router.delete('/:id', function (req, res, next) {
    readFileAsync(pathToJson).then((data) => {
        let news = JSON.parse(data);
        let index = news.articles.findIndex(article => article.id == req.params.id);
        if (index == -1)
            throw new HttpError('Not found', 404)
        news.articles.splice(index, 1);
        var stringData = JSON.stringify(news);
        return writeFileAsync(pathToJson, stringData)
        })
        .then(() => {
            console.log('object updated')
            res.status(200).send('Deleted');
        })
        .catch(next);
})


module.exports = router;