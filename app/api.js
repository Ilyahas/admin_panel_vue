module.exports = function (app, connection, path) {

    const getData = (stringQuery, req, res, params) => {
        params = params || [];
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
        params = params || [];
        connection.query(stringQuery, params, (err, row, fields) => {
            if (err) {
                console.log(err);
                res.status(400).end("Fail POST");
            }
            else {
                res.status(200).end("Successful POST");
            }
        });
    };

    require('./api/mainpageAPI') (app, getData, postData);
    require('./api/photosAPI') (app, getData, postData, path);
    require('./api/newsAPI') (app, getData, postData, path);
    require('./api/articlesAPI') (app, getData, postData);
};