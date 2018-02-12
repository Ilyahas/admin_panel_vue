const express = require('express');
const app = express();
const api = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session  = require('express-session');
const mysql = require('mysql');
const config = require('./app/config');
const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password
});

const cors = require('cors');
app.use(cors({origin: 'http://localhost:8080'}));

app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({limit: '150mb', extended: true}));
app.use(cookieParser());

app.use(config.apiLink, api);

app.use(session({
    secret: 'alwaysrunning',
    resave: true,
    saveUninitialized: true
} ));
app.use(passport.initialize());
app.use(passport.session());


require('./app/api') (api, connection, path);
require('./app/passport.js')(connection, passport);
require('./app/routes') (app, path, express, passport);

app.listen(config.PORT, '0.0.0.0', () => console.log("App listening on port " + config.PORT + "!"));
