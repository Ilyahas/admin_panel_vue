module.exports = function (app, getData, postData) {
    const queries = require('./mainpageQueries');

    app.get('/getMainPageSections', (req, res) => {
        getData(queries.getMainPageSections, req, res);
    });

    app.post('/getTopMainPageSections', (req, res) => {
        getData(queries.getTopMainPageSections, req, res, {topNumber: req.body.topNumber});
    });

    app.post('/getMainPageSectionById', (req, res) => {
        getData(queries.getMainPageSectionById, req, res, {mainPageSectionId: req.body.mainPageSectionId});
    });

    app.post('/addMainPageSection', (req, res) => {
        if (req.body.title !== '') {
            postData(queries.addMainPageSection, req, res, {
                title: req.body.title,
                text: req.body.text
            });
        } else {
            res.status(400).end("MainPage Section Title is not define");
        }
    });

    app.post('/updateMainPageSection', (req, res) => {
        if (req.body.title !== '') {
            getData(queries.updateMainPageSection, req, res, {
                title: req.body.title,
                text: req.body.text,
                mainPageSectionId: req.body.mainPageSectionId
            });
        } else {
            res.status(400).end("MainPage Section Title is not define");
        }
    });

    app.post('/deleteMainPageSection', (req, res) => {
        postData(queries.deleteMainPageSection, req, res, {mainPageSectionId: req.body.mainPageSectionId});
    });

};