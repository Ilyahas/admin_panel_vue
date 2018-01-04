module.exports = function(app, config) {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password
    });
    const format = require("string-template");
    const queries = require('./queries');
    const upload = require('./upload');

    const getData = (stringQuery, req, res) => {
        connection.query(stringQuery, (err, row, fields) =>{
            if(err){
                console.log(err);
                res.status(400);
            }
            else {
                res.send(row);
            }
        });
    };
    const postData = (stringQuery, req, res) => {
        connection.query(stringQuery,(err, row, fields) => {
            if(err){
                console.log(err);
                res.status(400).end("Section is not deleted");
            }
            else {
                res.status(200).end("Section is deleted");
            }
        });
    };

    app.post('/uploadSectionCover', upload.uploadSectionCover);

    app.post('/addSectionData', (req, res) => {
        postData(format(queries.addPhotoSection, {sectionName: req.body.sectionName, imgName: req.body.imgName}), req, res);
    });

    app.get('/getSections', (req, res) => {
        getData(queries.getPhotoSections, req, res);
    });

    app.post('/getSectionById', (req, res) => {
        getData(format(queries.getPhotoSectionById, {sectionId: req.body.sectionId}), req, res);
    });

    app.post('/updateSectionData', (req, res) => {
        postData(format(queries.updatePhotoSection, {sectionName: req.body.sectionName, imgName: req.body.imgName, sectionId: req.body.sectionId}), req, res);
    });

    app.post('/deleteSection', (req, res) => {
        postData(format(queries.deleteSection, {sectionId: req.body.sectionId}), req, res);
    });


    app.post('/uploadPhoto', upload.uploadPhoto);

    app.post('/addPhotoData', (req, res) => {
        postData(format(queries.addNewPhoto, {photoName: req.body.photoName, imgName: req.body.imgName, sectionId: req.body.sectionId}), req, res);
    });

    app.post('/getPhotosBySectionId', (req, res) => {
        getData(format(queries.getPhotosInSection, {sectionId: req.body.sectionId}), req, res);
    });

    app.post('/deletePhoto', (req, res) => {
        postData(format(queries.deletePhotoFromSection, {photoId: req.body.photoId}), req, res);
    });

};