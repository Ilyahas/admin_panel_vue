module.exports = function (app, getData, postData) {
    const queries = require('./newsQueries');
    const authCheck = require('../authCheck');

    app.post('/addNews', authCheck.isLoggedIn, (req, res) => {
        if (req.body.title !== '') {
            postData(queries.addNews, req, res, [
                req.body.title,
                req.body.text,
                req.body.imgName,
                req.body.imgData,
                req.body.date
            ]);
        } else {
            res.status(400).end("News Title is not define");
        }
    });

    app.get('/getNews', (req, res) => {
        getData(queries.getNewsList, req, res);
    });

    app.post('/getNewsById', (req, res) => {
        getData(queries.getNewsById, req, res, [req.body.newsId]);
    });

    app.post('/deleteNews', authCheck.isLoggedIn, (req, res) => {
        postData(queries.deleteNews, req, res, [req.body.newsId]);
    });

    app.post('/updateNews', authCheck.isLoggedIn, (req, res) => {
        if (req.body.title !== '') {
            if (req.body.isNewImg) {
                postData(queries.updateNewsWithImg, req, res, [
                    req.body.title,
                    req.body.text,
                    req.body.imgName,
                    req.body.imgData,
                    req.body.newsId
                ]);
            } else {
                postData(queries.updateNewsData, req, res, [
                    req.body.title,
                    req.body.text,
                    req.body.newsId
                ]);
            }
        } else {
            res.status(400).end("News Title is not define");
        }
    });

    app.post('/getTopNews', (req, res) => {
        if (req.body.fromNumber === undefined) {
            req.body.fromNumber = 0;
        }
        getData(queries.getTopNews, req, res, [req.body.topNumber, req.body.fromNumber]);
    });
};