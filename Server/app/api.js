module.exports = function (app, config) {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password
    });

    const newsQueries = require('./api/photoQueries');

    const getData = (stringQuery, req, res) => {
        connection.query(stringQuery, (err, row, fields) => {
            if (err) {
                console.log(err);
                res.status(400);
            }
            else {
                res.send(row);
            }
        });
    };
    const postData = (stringQuery, req, res) => {
        connection.query(stringQuery, (err, row, fields) => {
            if (err) {
                console.log(err);
                res.status(400).end("Section is not deleted");
            }
            else {
                res.status(200).end("Section is deleted");
            }
        });
    };

    require('./api/photosAPI') (app, getData, postData);
    require('./api/newsAPI') (app, getData, postData);
};