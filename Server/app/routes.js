module.exports = function() {

    app.get('/admin', (req, res) => {
        res.sendFile(path.join(__dirname + '/../Client/admin/dist/index.html'));
    });

};