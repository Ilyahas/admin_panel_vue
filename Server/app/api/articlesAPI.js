module.exports = function (app, getData, postData) {
    const format = require('string-template');
    const queries = require('./articlesQueries');

    app.get('/getArticlePage', (req, res) => {
        getData(queries.getArticlePage, req, res);
    });

    app.post('/updateArticlePage', (req, res) => {
        if (req.body.title !== '') {
            postData(format(queries.updateArticlePage, {
                title: req.body.title,
                text: req.body.text
            }), req, res);
        } else {
            res.status(400).end("Page Title is not define");
        }
    });

    app.get('/getArticles', (req, res) => {
        getData(queries.getArticles, req, res);
    });

    app.post('/getArticleById', (req, res) => {
        getData(format(queries.getArticleById, {articleId: req.body.articleId}), req, res);
    });

    app.post('/addArticle', (req, res) => {
        if (req.body.title !== '') {
            getData(format(queries.addArticle, {
                title: req.body.title,
                text: req.body.text,
                date: req.body.date
            }), req, res);
        } else {
            res.status(400).end("Article Title is not define");
        }
    });

    app.post('/updateArticle', (req, res) => {
        if (req.body.title !== '') {
            getData(format(queries.updateArticle, {
                title: req.body.title,
                text: req.body.text
            }), req, res);
        } else {
            res.status(400).end("Article Title is not define");
        }
    });

    app.post('/deleteArticle', (req, res) => {
        postData(format(queries.deleteArticle, {articleId: req.body.articleId}), req, res);
    });
};