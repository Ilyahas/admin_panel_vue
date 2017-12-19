module.exports = function(app, config) {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password
    });
    const format = require("string-template");
    const queries = require('./queries');

    app.post('/addCategory', (req, res) => {
        connection.query(format(queries.addPhotoCategory, {name: req.body.categoryName}), (err, row, fields) =>{
            if(err){
                console.log(err);
                res.status(400);
            }
            else {
                res.status(200);
            }
        });
    });

    app.get('/getCategories', (req, res) => {
        connection.query(queries.getPhotoCategory, (err, row, fields) =>{
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