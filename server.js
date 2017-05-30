var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    exphbs = require('express-handlebars'),
    db = require('./app/models');

// Sets up express Server
var app = express();
var PORT = process.env.PORT || 5001;

// Configure morgan
app.use(logger("dev"));

// Sets up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// serve static content from public dir
app.use(express.static("app/public"));




app.set('views', 'app/views');
app.engine("hbs", exphbs({
    defaultLayout: "main",
    extname: '.hbs',
    layoutsDir:'app/views/layouts',
    partialsDir:'app/views/partials'}));
app.set("view engine", "hbs");

// app.use("/", routes);
require("./app/controllers/controller.js")(app);

// set up foreign keys
db["user"].hasMany(db["owner"], { foreignKey: 'users_id'});
db["owner"].belongsTo(db["user"], {foreignKey: 'users_id'});
db["owner"].hasMany(db["pet"], { foreignKey: 'owners_id'});
db["pet"].belongsTo(db["owner"], {foreignKey: 'owners_id'});
db["pet"].hasMany(db["event"], { foreignKey: 'pets_id'});
db["event"].belongsTo(db["pet"], {foreignKey: 'pets_id'});

// sync sequelize models and start express server
db.sequelize.sync({}).then(function() {
    // starting server w/ listener
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});