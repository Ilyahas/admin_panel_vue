module.exports = function (app, config) {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password
    });

    connection.config.queryFormat = function (query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function (txt, key) {
            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
            }
            return txt;
        }.bind(this));
    };

    const getData = (stringQuery, req, res, params) => {
        params = params || {};
        connection.query(stringQuery, params, (err, row, fields) => {
            if (err) {
                console.log(err);
                res.status(400);
            }
            else {
                res.send(row);
            }
        });
    };

    const postData = (stringQuery, req, res, params) => {
        params = params || {};
        connection.query(stringQuery, params, (err, row, fields) => {
            if (err) {
                console.log(err);
                res.status(400).end("Successful POST");
            }
            else {
                res.status(200).end("Fail POST");
            }
        });
    };

    require('./api/mainpageAPI') (app, getData, postData);
    require('./api/photosAPI') (app, getData, postData);
    require('./api/newsAPI') (app, getData, postData);
    require('./api/articlesAPI') (app, getData, postData);
};