const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = function(connection, passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE idusers = " + id, (err, res) => {
            done(null, res.rows);
        });
    });

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'login',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        (req, login, password, done) => {
            connection.query("SELECT * FROM users WHERE login= '" + login + "'", (err, res) => {
                if (err)
                    return done(null);
                if (!res.rows.length) {
                    return done(null, null);
                }

                bcrypt.compare(password, res.rows[0].password, (err, res1) => {
                    if(res1)
                        return done(null, res.rows[0]);
                    else
                        return done(null, null);
                });

            });
        })
    );

};