module.exports = function (app, getData, postData, path) {

    const queries = require('./photoQueries');
    const upload = require('../upload');

    const newdir_ = path.resolve(__dirname, '..', '..');

    app.post('/addSection', (req, res) => {
        if (req.body.sectionName !== '') {
            postData(queries.addPhotoSection, req, res, {
                sectionName: req.body.sectionName,
                imgName: req.body.imgName,
                imgData: req.body.imgData
            });
        } else {
            res.status(400).end("Section Name is not define");
        }
    });

    app.post('/addPhotoFile', (req, res) => {
        upload.uploadImgs(req, res, newdir_ + "/img/photos");
    });

    app.get('/getSections', (req, res) => {
        getData(queries.getPhotoSections, req, res);
    });

    app.post('/getSectionById', (req, res) => {
        getData(queries.getPhotoSectionById, req, res, {sectionId: req.body.sectionId});
    });

    app.post('/updateSection', (req, res) => {
        if (req.body.sectionName !== '') {
            if (req.body.newImg) {
                postData(queries.updatePhotoSectionWithImg, req, res, {
                    sectionName: req.body.sectionName,
                    imgName: req.body.imgName,
                    imgData: req.body.imgData,
                    sectionId: req.body.sectionId
                });
            } else {
                postData(queries.updatePhotoSection, req, res, {
                    sectionName: req.body.sectionName,
                    sectionId: req.body.sectionId
                });
            }
        } else {
            res.status(400).end("Section Name is not define");
        }
    });

    app.post('/deleteSection', (req, res) => {
        postData(queries.deleteSection, req, res, {sectionId: req.body.sectionId});
        // postData(queries.deleteAllPhotosInSection, req, res, {sectionId: req.body.sectionId});
    });

    app.post('/getTopSections', (req, res) => {
        if (req.body.fromNumber === undefined) {
            req.body.fromNumber = 0;
        }
        getData(queries.getTopSections, req, res, {topNumber: req.body.topNumber, fromNumber: req.body.fromNumber});
    });



    app.post('/addPhoto', (req, res) => {
        postData(queries.addNewPhoto, req, res, {
            photoName: req.body.photoName,
            imgName: req.body.imgName,
            sectionId: req.body.sectionId
        });
    });

    app.post('/getPhotosBySectionId', (req, res) => {
        getData(queries.getPhotosInSection, req, res, {sectionId: req.body.sectionId});
    });

    app.post('/deletePhoto', (req, res) => {
        postData(queries.deletePhotoFromSection, req, res, {photoId: req.body.photoId});
    });
};