const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/../Client/admin/dist')));

const PORT = 3000;

app.listen(PORT, () => console.log('App listening on port ' + PORT + '!'));


app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname + '/../Client/admin/dist/index.html'));
});