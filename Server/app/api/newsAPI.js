module.exports = function (app, getData, postData) {
    const format = require('string-template');
    const queries = require('./newsQueries');
    const upload = require('./upload');

    app.post('/uploadNewsCover', upload.uploadNewsCover);

    app.post('/addNewsData', (req, res) => {
        if (req.body.newsTitle !== '') {
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

    });

    app.post('/getNewsById', (req, res) => {

    });
};