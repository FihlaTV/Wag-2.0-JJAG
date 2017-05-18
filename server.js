var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    db = require('./models');

// Sets up express Server
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// serve static content from public dir
app.use(express.static(process.cwd() + "/public"));
// enable method override
app.use(methodOverride("_method"));




// sync sequelize models and start express server
db.sequelize.sync({ }).then(function() {
    // starting server w/ listener
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});