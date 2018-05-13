// // *****************************************************************************
// // Server.js - This file is the initial starting point for the Node/Express server.
// //
// // ******************************************************************************
// // *** Dependencies
// // =============================================================
var express = require("express");
var bodyparser = require("body-parser");

// // Sets up the Express App
// // =============================================================
var app = express();
var passport = require("passport");

var PORT = process.env.PORT || 8080;

// // Requiring our models for syncing
var db = require("./models");
var cookieparser = require("cookie-parser");
var session = require('express-session');

// // Sets up the Express app to handle data parsing
//app.use(cookieparser);

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyparser.json());

// // Static directory
app.use(express.static("public"));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

require("./routes/htmlroutes")(app); // pass app to ./routes/htmlroutes
require("./routes/apiroutes")(app, passport); // pass app and passport to ./routes/apiroutes

//load passport strategies
require('./config/passport')(passport); // pass passport to the .config/passport.js

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});