module.exports = function (app, getData, postData, path) {

    const queries = require('./photoQueries');

    app.post('/addSection', (req, res) => {
        if (req.body.sectionName !== '') {
            postData(queries.addPhotoSection, req, res, [
                req.body.sectionName,
                req.body.imgName
            ]);
        } else {
            res.status(400).end("Section Name is not define");
        }
    });

    app.get('/getSections', (req, res) => {
        getData(queries.getPhotoSections, req, res);
    });

    app.post('/getSectionById', (req, res) => {
        getData(queries.getPhotoSectionById, req, res, [req.body.sectionId]);
    });

    app.post('/updateSection', (req, res) => {
        if (req.body.sectionName !== '') {
            if (req.body.newImg) {
                postData(queries.updatePhotoSectionWithImg, req, res, [
                    req.body.sectionName,
                    req.body.imgName,
                    req.body.imgData,
                    req.body.sectionId
                ]);
            } else {
                postData(queries.updatePhotoSection, req, res, [
                    req.body.sectionName,
                    req.body.sectionId
                ]);
            }
        } else {
            res.status(400).end("Section Name is not define");
        }
    });

    app.post('/deleteSection', (req, res) => {
        postData(queries.deleteSection, req, res, [req.body.sectionId]);
        // postData(queries.deleteAllPhotosInSection, req, res, {sectionId: req.body.sectionId});
    });

    app.post('/getTopSections', (req, res) => {
        if (req.body.fromNumber === undefined) {
            req.body.fromNumber = 0;
        }
        getData(queries.getTopSections, req, res, [req.body.topNumber, req.body.fromNumber]);
    });



    app.post('/addPhoto', (req, res) => {
        postData(queries.addNewPhoto, req, res, [
            req.body.photoName,
            req.body.imgName,
            req.body.imgData,
            req.body.sectionId
        ]);
    });

    app.post('/getPhotosBySectionId', (req, res) => {
        getData(queries.getPhotosInSection, req, res, [req.body.sectionId]);
    });

    app.post('/deletePhoto', (req, res) => {
        postData(queries.deletePhotoFromSection, req, res, [req.body.photoId]);
    });
};