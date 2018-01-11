module.exports = function (app, getData, postData) {

    const format = require("string-template");
    const queries = require('./photoQueries');
    const upload = require('./upload');


    app.post('/uploadSectionCover', (req, res) => {
        upload.uploadImgs(req, res, "photoSectionCovers");
    });

    app.post('/addSectionData', (req, res) => {
        if (req.body.sectionName !== '') {
            postData(format(queries.addPhotoSection, {
                sectionName: req.body.sectionName,
                imgName: req.body.imgName
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

    app.post('/updateSectionData', (req, res) => {
        postData(format(queries.updatePhotoSection, {
            sectionName: req.body.sectionName,
            imgName: req.body.imgName,
            sectionId: req.body.sectionId
        }), req, res);
    });

    app.post('/deleteSection', (req, res) => {
        postData(format(queries.deleteSection, {sectionId: req.body.sectionId}), req, res);
    });


    app.post('/uploadPhoto', (req, res) => {
        upload.uploadImgs(req, res, "photos");
    });

    app.post('/addPhotoData', (req, res) => {
        postData(format(queries.addNewPhoto, {
            photoName: req.body.photoName,
            imgName: req.body.imgName,
            sectionId: req.body.sectionId
        }), req, res);
    });

    app.post('/getPhotosBySectionId', (req, res) => {
        getData(format(queries.getPhotosInSection, {sectionId: req.body.sectionId}), req, res);
    });

    app.post('/deletePhoto', (req, res) => {
        postData(format(queries.deletePhotoFromSection, {photoId: req.body.photoId}), req, res);
    });
};