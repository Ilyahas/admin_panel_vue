module.exports = function (app, getData, postData) {
    const format = require('string-template');
    const queries = require('./newsQueries');

    app.post('/addNews', (req, res) => {
        if (req.body.title !== '') {
            postData(format(queries.addNews, {
                text: req.body.text,
                title: req.body.title,
                imgName: req.body.imgName,
                imgData: req.body.imgData,
                date: req.body.date
            }), req, res);
        } else {
            res.status(400).end("News Title is not define");
        }
    });

    app.get('/getNews', (req, res) => {
        getData(queries.getNewsList, req, res);
    });

    app.post('/getNewsById', (req, res) => {
        getData(format(queries.getNewsById, {newsId: req.body.newsId}), req, res);
    });

    app.post('/deleteNews', (req, res) => {
        postData(format(queries.deleteNews, {newsId: req.body.newsId}), req, res);
    });

    app.post('/updateNews', (req, res) => {
        if (req.body.title !== '') {
            if (req.body.newImg) {
                postData(format(queries.updateNewsWithImg, {
                    text: req.body.text,
                    title: req.body.title,
                    imgName: req.body.imgName,
                    imgData: req.body.imgData,
                    newsId: req.body.newsId
                }), req, res);
            } else {
                postData(format(queries.updateNewsData, {
                    text: req.body.text,
                    title: req.body.title,
                    newsId: req.body.newsId
                }), req, res);
            }
        } else {
            res.status(400).end("News Title is not define");
        }
    })

    app.post('/getTopNews', (req, res) => {
        getData(format(queries.getTopNews, {topNumber: req.body.topNumber}), req, res);
    });
};