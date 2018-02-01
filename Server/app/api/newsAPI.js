module.exports = function (app, getData, postData, path) {

    const queries = require('./newsQueries');
    const upload = require('../upload');

    const newdir_ = path.resolve(__dirname, '..', '..');

    app.post('/addNews', (req, res) => {
        if (req.body.title !== '') {
            postData(queries.addNews, req, res, {
                text: req.body.text,
                title: req.body.title,
                imgName: req.body.imgName,
                date: req.body.date
            });
        } else {
            res.status(400).end("News Title is not define");
        }
    });

    app.post('/addNewsFile', (req, res) => {
        upload.uploadImgs(req, res, newdir_ + "/img/news");
    });

    app.get('/getNews', (req, res) => {
        getData(queries.getNewsList, req, res);
    });

    app.post('/getNewsById', (req, res) => {
        getData(queries.getNewsById, req, res, {newsId: req.body.newsId});
    });

    app.post('/deleteNews', (req, res) => {
        postData(queries.deleteNews, req, res, {newsId: req.body.newsId});
    });

    app.post('/updateNews', (req, res) => {
        if (req.body.title !== '') {
            if (req.body.isNewImg) {
                postData(queries.updateNewsWithImg, req, res, {
                    text: req.body.text,
                    title: req.body.title,
                    imgName: req.body.imgName,
                    newsId: req.body.newsId
                });
            } else {
                postData(queries.updateNewsData, req, res, {
                    text: req.body.text,
                    title: req.body.title,
                    newsId: req.body.newsId
                });
            }
        } else {
            res.status(400).end("News Title is not define");
        }
    });

    app.post('/getTopNews', (req, res) => {
        if (req.body.fromNumber === undefined) {
            req.body.fromNumber = 0;
        }
        getData(queries.getTopNews, req, res, {topNumber: req.body.topNumber, fromNumber: req.body.fromNumber});
    });
};