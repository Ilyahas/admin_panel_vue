module.exports = function (app, getData, postData) {
    const format = require('string-template');
    const queries = require('./newsQueries');
    const upload = require('./upload');

    app.post('/uploadNewsCover', (req, res) => {
        upload.uploadImgs(req, res, "newsCovers")
    });

    app.post('/addNewsData', (req, res) => {
        if (req.body.title !== '') {
            postData(format(queries.addNews, {
                text: req.body.text,
                title: req.body.title,
                imgName: req.body.imgName
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
            postData(format(queries.updateNews, {
                text: req.body.text,
                title: req.body.title,
                imgName: req.body.imgName,
                newsId: req.body.newsId
            }), req, res);
        } else {
            res.status(400).end("News Title is not define");
        }
    })
};