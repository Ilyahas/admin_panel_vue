const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const config = require('./app/config');
require('./app/api') ();
require('./app/routes') (app);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/../Client/admin/dist')));

app.listen(config.PORT, () => console.log('App listening on port ' + config.PORT + '!'));
