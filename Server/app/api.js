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

    app.post('/uploadSectionCover', upload.uploadSectionCover);

    app.post('/addSectionData', (req, res) => {
        connection.query(format(queries.addPhotoSection, {sectionName: req.body.sectionName, imgName: req.body.imgName}), (err, row, fields) =>{
            if(err){
                console.log(err);
                res.status(400).end("Section is not add");
            }
            else {
                res.status(200).end("Section is add");
            }
        });
    });

    app.get('/getSections', (req, res) => {
        connection.query(queries.getPhotoSections, (err, row, fields) =>{
            if(err){
                console.log(err);
                res.status(400);
            }
            else {
                res.send(row);
            }
        });
    });

    app.post('/deleteSection', (req, res) => {
        connection.query(format(queries.deleteSection, {sectionId: req.body.sectionId}),(err, row, fields) => {
            if(err){
                console.log(err);
                res.status(400).end("Section is not deleted");
            }
            else {
                res.status(200).end("Section is deleted");
            }
        });
    });

};