module.exports = function(app, path) {

    const newdir_ = path.resolve(__dirname, '..', '..');

    const isAuthorized = (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };

    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    };

    app.get('/admin', isLoggedIn, (req, res) => {
        res.sendFile(path.join(newdir_ + '/Client/admin/dist/index.html'));
    });

    app.get('/', (req, res) => {
        res.sendFile(path.join(newdir_ + '/Client/user/dist/index.html'));
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.get('/login', isAuthorized, function (req, res) {
        res.sendFile(path.join(newdir_ + '/Client/user/dist/index.html'));
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                res.status(401);
                res.redirect('/admin');
                return;
            }
            req.login(user.login, function(error) {
                if (error) return next(error);
                return res.redirect('/');
            });

        })(req, res, next);
    });

};