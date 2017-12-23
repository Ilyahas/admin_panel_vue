module.exports = function(app) {

    app.get('/admin', (req, res) => {
        res.sendFile(path.join(__dirname + '/../Client/admin/dist/index.html'));
    });

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/../Client/user/dist/index.html'));
    });

};