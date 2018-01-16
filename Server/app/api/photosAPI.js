module.exports = function (app, getData, postData) {

    const format = require("string-template");
    const queries = require('./photoQueries');

    app.post('/addSection', (req, res) => {
        if (req.body.sectionName !== '') {
            postData(format(queries.addPhotoSection, {
                sectionName: req.body.sectionName,
                imgName: req.body.imgName,
                imgData: req.body.imgData
            }), req, res);
        } else {
            res.status(400).end("Section Name is not define");
        }
    });

    app.get('/getSections', (req, res) => {
        getData(queries.getPhotoSections, req, res);
    });

    app.post('/getSectionById', (req, res) => {
        getData(format(queries.getPhotoSectionById, {sectionId: req.body.sectionId}), req, res);
    });

    app.post('/updateSection', (req, res) => {
        if (req.body.sectionName !== '') {
            if (req.body.newImg) {
                postData(format(queries.updatePhotoSectionWithImg, {
                    sectionName: req.body.sectionName,
                    imgName: req.body.imgName,
                    imgData: req.body.imgData,
                    sectionId: req.body.sectionId
                }), req, res);
            } else {
                postData(format(queries.updatePhotoSection, {
                    sectionName: req.body.sectionName,
                    sectionId: req.body.sectionId
                }), req, res);
            }
        } else {
            res.status(400).end("Section Name is not define");
        }
    });

    app.post('/deleteSection', (req, res) => {
        postData(format(queries.deleteSection, {sectionId: req.body.sectionId}), req, res);
    });



    app.post('/addPhoto', (req, res) => {
        if (req.body.imgData) {
            postData(format(queries.addNewPhoto, {
                photoName: req.body.photoName,
                imgName: req.body.imgName,
                imgData: req.body.imgData,
                sectionId: req.body.sectionId
            }), req, res);
        } else {
            res.status(400).end("Photo is not define");
        }
    });

    app.post('/getPhotosBySectionId', (req, res) => {
        getData(format(queries.getPhotosInSection, {sectionId: req.body.sectionId}), req, res);
    });

    app.post('/deletePhoto', (req, res) => {
        postData(format(queries.deletePhotoFromSection, {photoId: req.body.photoId}), req, res);
    });
};