var express = require('express');
var app = express();// create our app w/ express
var mongoose = require('mongoose');// mongoose for mongodb
var morgan = require('morgan');// log requests to the console (express4)
var bodyParser = require('body-parser');// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://localhost/timetables', function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("connection successful");
    }
});

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// listen (start app with node server.js) ======================================
app.listen(8081);
console.log("App listening on port 8081");