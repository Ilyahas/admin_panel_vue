module.exports = function(app, path) {

    const newdir_ = path.resolve(__dirname, '..', '..');

    app.get('/admin', (req, res) => {
        res.sendFile(path.join(newdir_ + '/Client/admin/dist/index.html'));
    });

    app.get('/', (req, res) => {
        res.sendFile(path.join(newdir_ + '/Client/user/dist/index.html'));
    });

};