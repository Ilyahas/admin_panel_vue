module.exports = function (app, getData, postData) {
    const queries = require('./mainpageQueries');
    const authCheck = require('../authCheck');

    app.get('/getMainPageSections', (req, res) => {
        getData(queries.getMainPageSections, req, res);
    });

    app.post('/getTopMainPageSections', (req, res) => {
        getData(queries.getTopMainPageSections, req, res, [req.body.topNumber]);
    });

    app.post('/getMainPageSectionById', (req, res) => {
        getData(queries.getMainPageSectionById, req, res, [req.body.mainPageSectionId]);
    });

    app.post('/addMainPageSection', authCheck.isLoggedIn, (req, res) => {
        if (req.body.title !== '') {
            postData(queries.addMainPageSection, req, res, [
                req.body.title,
                req.body.text
            ]);
        } else {
            res.status(400).end("MainPage Section Title is not define");
        }
    });

    app.post('/updateMainPageSection', authCheck.isLoggedIn, (req, res) => {
        if (req.body.title !== '') {
            getData(queries.updateMainPageSection, req, res, [
                req.body.title,
                req.body.text,
                req.body.mainPageSectionId
            ]);
        } else {
            res.status(400).end("MainPage Section Title is not define");
        }
    });

    app.post('/deleteMainPageSection', authCheck.isLoggedIn, (req, res) => {
        postData(queries.deleteMainPageSection, req, res, [req.body.mainPageSectionId]);
    });

};