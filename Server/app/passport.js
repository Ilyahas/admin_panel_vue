const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = function(connection, passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("select * from admin_panel.users where `idusers` = " + id, (err,rows) => {
            done(null, rows);
        });
    });

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'login',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        (req, login, password, done) => {
            connection.query("SELECT * FROM admin_panel.users WHERE `login` = '" + login + "'", (err, rows) => {
                if (err)
                    return done(null);
                if (!rows.length) {
                    return done(null, null);
                }

                bcrypt.compare(password, rows[0].password, (err, res) => {
                    if(res)
                        return done(null, rows[0]);
                    else
                        return done(null, null);
                });

            });
        })
    );

};