module.exports = function (app, getData, postData) {
    const queries = require('./articlesQueries');

    app.get('/getArticlePage', (req, res) => {
        getData(queries.getArticlePage, req, res);
    });

    app.post('/updateArticlePage', (req, res) => {
        if (req.body.title !== '') {
            postData(queries.updateArticlePage, req, res, {
                title: req.body.title,
                text: req.body.text
            });
        } else {
            res.status(400).end("Page Title is not define");
        }
    });

    app.get('/getArticles', (req, res) => {
        getData(queries.getArticles, req, res);
    });

    app.post('/getTopArticles', (req, res) => {
        getData(queries.getTopArticles, req, res, {topNumber: req.body.topNumber});
    });

    app.post('/getArticleById', (req, res) => {
        getData(queries.getArticleById, req, res, {articleId: req.body.articleId});
    });

    app.post('/addArticle', (req, res) => {
        if (req.body.title !== '') {
            postData(queries.addArticle, req, res, {
                title: req.body.title,
                text: req.body.text,
                date: req.body.date
            });
        } else {
            res.status(400).end("Article Title is not define");
        }
    });

    app.post('/updateArticle', (req, res) => {
        if (req.body.title !== '') {
            getData(queries.updateArticle, req, res, {
                title: req.body.title,
                text: req.body.text,
                articleId: req.body.articleId
            });
        } else {
            res.status(400).end("Article Title is not define");
        }
    });

    app.post('/deleteArticle', (req, res) => {
        postData(queries.deleteArticle, req, res, {articleId: req.body.articleId});
    });
};