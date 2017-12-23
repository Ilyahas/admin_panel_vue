const express = require('express');
const app = express();
const api = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./app/config');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

app.use(config.apiLink, api);

app.use(express.static(path.join(__dirname, '/../Client/admin/dist')));


require('./app/api') (api, config);
require('./app/routes') (app);

app.listen(config.PORT, () => console.log('App listening on port ' + config.PORT + '!'));
