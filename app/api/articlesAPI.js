module.exports = function (app, getData, postData) {
    const queries = require('./articlesQueries');
    const authCheck = require('../authCheck');

    app.get('/getArticlePage', (req, res) => {
        getData(queries.getArticlePage, req, res);
    });

    app.post('/updateArticlePage', authCheck.isLoggedIn, (req, res) => {
        if (req.body.title !== '') {
            postData(queries.updateArticlePage, req, res, [
                req.body.title,
                req.body.content
            ]);
        } else {
            res.status(400).end("Page Title is not define");
        }
    });


    app.get('/getContacts', (req, res) => {
        getData(queries.getContacts, req, res)
    });

    app.post('/updateContacts', authCheck.isLoggedIn, (req, res) => {
        if (req.body.title !== '') {
            postData(queries.updateContacts, req, res, [
                req.body.title,
                req.body.content
            ]);
        } else {
            res.status(400).end("Page Title is not define");
        }
    });


    app.post('/getEvents', (req, res) => {
        getData(queries.getEvents, req, res, [
            req.body.year,
            req.body.month
        ]);
    });

    app.post('/updateEvent', authCheck.isLoggedIn, (req, res) => {
        if (req.body.title !== '') {
            postData(queries.updateEvent, req, res, [
                req.body.title,
                req.body.description,
                req.body.year,
                req.body.month,
                req.body.day,
                req.body.eventId
            ]);
        } else {
            res.status(400).end("Page Title is not define");
        }
    });

    app.post('/addEvent', authCheck.isLoggedIn, (req, res) => {
        if (req.body.title !== '') {
            postData(queries.addEvent, req, res, [
                req.body.title,
                req.body.description,
                req.body.year,
                req.body.month,
                req.body.day
            ]);
        } else {
            res.status(400).end("Page Title is not define");
        }
    });


    app.get('/getArticles', (req, res) => {
        getData(queries.getArticles, req, res);
    });

    app.post('/getTopArticles', (req, res) => {
        if (req.body.fromNumber === undefined) {
            req.body.fromNumber = 0;
        }
        getData(queries.getTopArticles, req, res, [req.body.topNumber, req.body.fromNumber]);
    });

    app.post('/getArticleById', (req, res) => {
        getData(queries.getArticleById, req, res, [req.body.articleId]);
    });

    app.post('/addArticle', authCheck.isLoggedIn, (req, res) => {
        if (req.body.title !== '') {
            postData(queries.addArticle, req, res, [
                req.body.title,
                req.body.text,
                req.body.date
            ]);
        } else {
            res.status(400).end("Article Title is not define");
        }
    });

    app.post('/updateArticle', authCheck.isLoggedIn, (req, res) => {
        if (req.body.title !== '') {
            getData(queries.updateArticle, req, res, [
                req.body.title,
                req.body.text,
                req.body.articleId
            ]);
        } else {
            res.status(400).end("Article Title is not define");
        }
    });

    app.post('/deleteArticle', authCheck.isLoggedIn, (req, res) => {
        postData(queries.deleteArticle, req, res, [req.body.articleId]);
    });
};