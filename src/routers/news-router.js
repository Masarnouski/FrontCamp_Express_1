const pathToJson = './src/data.json'
var express = require('express');
const fs = require('fs');
const util = require('util')
var router = express.Router();
var HttpError = require('../Exceptions/HttpError')
var mongoConfig = require('../models');
const auth = require('../middleware/auth')

// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile)


router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.get('/', async function (req, res, next) {
    const articlesModel = mongoConfig.models.Article;

    try {
        var articles = await articlesModel.find();
        res.status(200).send(articles);
    }
    catch (error) { next(error) }
    //    function (err, kittens) {
    //         if (err) return console.error(err);
    //         console.log(kittens);
    //       })
    // readFileAsync(pathToJson).then((data) => {
    //     let news = JSON.parse(data);
    //     res.send(news);
    // })
    // .catch(next);
});


router.get('/:id', async function (req, res, next) {
    const articlesModel = mongoConfig.models.Article;
    try {
        var article = await articlesModel.findOne({ id: req.params.id });
        if (article == null) {
            throw new HttpError(`Article with id: ${req.params.id} not found`, 404)
        }
        console.log(article);
        res.status(200).send(article);
    }
    catch (error) { next(error) }
    // readFileAsync(pathToJson).then((data) => {
    //     let news = JSON.parse(data);
    //     let article = news.articles.filter((article => article.id == req.params.id));
    //     res.send(article);
    //     })
    //     .catch(next);
});

router.post('/', async function (req, res, next) {
    const articlesModel = new mongoConfig.models.Article(req.body);
    console.log(articlesModel);
    try {
        var newArticle = await articlesModel.save();
        res.status(200).send(newArticle);
    }
    catch (error) {
        next(error)
    }
    // readFileAsync(pathToJson).then((data) => {
    //     let dataObject = JSON.parse(data);
    //     dataObject.articles.push(req.body)
    //     var stringData = JSON.stringify(dataObject);
    //     return writeFileAsync(pathToJson, stringData)
    //     })
    //     .then(() => {
    //         console.log('object added')
    //         res.status(200).send('Added')
    //     })
    //     .catch(next);
});



router.put('/:id', auth, async (req, res, next) => {
    try {
        let conditions = { id: req.params.id }
        var article = await mongoConfig.models.Article.findOneAndUpdate(conditions, req.body);
        if (article == null) {
            throw new HttpError(`Article with id: ${req.params.id} not found`, 404)
        }
        res.status(200).send(article);
    }
    catch (error) {
        next(error)
    }
    // readFileAsync(pathToJson).then((data) => {
    //     let news = JSON.parse(data);
    //     let index = news.articles.findIndex((article => article.id == req.params.id));
    //     if (index == -1)
    //         throw new HttpError('Not found', 404)
    //     news.articles[index] = req.body
    //     var stringData = JSON.stringify(news);
    //     return writeFileAsync(pathToJson, stringData)
    // })
    //     .then(() => {
    //         console.log('object updated')
    //         res.status(200).send('Changed');
    //     })
    //     .catch(next);
})


router.delete('/:id', auth, async(req, res, next) => {
    try {
        var article = await mongoConfig.models.Article.deleteOne({ id:req.params.id });
        console.log(article);
        if (article.deletedCount == 0) {
            throw new HttpError(`Article with id: ${req.params.id} not found`, 404)
        }
        res.status(200).send(`Object with id: ${req.params.id} successfully deleted`);
    }
    catch (error) {
        next(error)
    }

    // readFileAsync(pathToJson).then((data) => {
    //     let news = JSON.parse(data);
    //     let index = news.articles.findIndex(article => article.id == req.params.id);
    //     if (index == -1)
    //         throw new HttpError('Not found', 404)
    //     news.articles.splice(index, 1);
    //     var stringData = JSON.stringify(news);
    //     return writeFileAsync(pathToJson, stringData)
    // })
    //     .then(() => {
    //         console.log('object updated')
    //         res.status(200).send('Deleted');
    //     })
    //     .catch(next);
})


module.exports = router;