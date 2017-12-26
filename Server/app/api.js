module.exports = function(app, config) {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password
    });
    const format = require("string-template");
    const queries = require('./queries');
    const multer = require('multer');
    const path = require('path');

    const storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, '../Client/admin/dist/static/img/photoSectionCover')
        },
        filename: function(req, file, callback) {
            callback(null, file.originalname)
        }
    });

    app.post('/addSection', (req, res) => {
        /*connection.query(format(queries.addPhotoSection, {name: req.body.categoryName}), (err, row, fields) =>{
            if(err){
                console.log(err);
                res.status(400);
            }
            else {

            }
        });*/
        let upload = multer({
            storage: storage,
            fileFilter: function(req, file, callback) {
                let ext = path.extname(file.originalname);
                if (ext !== '.png' && ext !== '.jpg' && ext !== '.svg' && ext !== '.jpeg') {
                    return callback(res.end('Only images are allowed'), null);
                }
                callback(null, true);
            }
        }).single('file');
        upload(req, res, function(err) {
            if(err)
                res.end("File is not uploaded");
            res.end('File is uploaded')
        });
    });

    app.get('/getSections', (req, res) => {
        connection.query(queries.getPhotoSections, (err, row, fields) =>{
            if(err){
                console.log(err);
                res.status(400);
            }
            else {
                console.log(row);
                res.send(row);
            }
        });
    })

};