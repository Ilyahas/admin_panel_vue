const express = require('express');
const app = express();
const api = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
var session  = require('express-session');
const config = require('./app/config');

const cors = require('cors');
app.use(cors({origin: 'http://localhost:8080'}));

app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({limit: '150mb', extended: true}));
app.use(cookieParser());

app.use(config.apiLink, api);

app.use(express.static(path.join(__dirname, "/../Client/admin/dist")));
app.use(express.static(path.join(__dirname, "/../Client/user/dist")));


app.use(session({
    secret: 'alwaysrunning',
    resave: true,
    saveUninitialized: true
} ));
app.use(passport.initialize());
app.use(passport.session());


require('./app/api') (api, config);
require('./app/routes') (app, path);
require('./app/passport.js')(passport);

app.listen(config.PORT, () => console.log("App listening on port " + config.PORT + "!"));
