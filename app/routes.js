module.exports = function(app, path, express, passport) {

    const bcrypt = require('bcryptjs');

    const newdir_ = path.resolve(__dirname, '..');

    const isAuthorized = (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/admin');
    };

    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    };

    app.use('/admin', isLoggedIn, express.static(path.join(newdir_ + '/Client/admin/dist')));
    app.use('/login', isAuthorized, express.static(path.join(newdir_ + '/Client/login/dist')));
    app.use('/img', express.static(path.join(newdir_ + '/img')));
    app.use('/', express.static(path.join(newdir_ + '/Client/user/dist')));

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/login');
    });

    app.post('/login', (req, res, next) => {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                res.status(500).send({ error: 'Something failed!' });
                return;
            }
            req.login(user.idusers, (error) => {
                if (error) return next(error);
                return res.redirect('/admin');
            });

        })(req, res, next);
    });

    app.get('/hash', (req, res) => {
        console.log(bcrypt.hashSync('admin', 8));
        res.end();
    })

};