const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const db = require("./models");

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
// app.use(express.static("public"));

var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

db.sequelize.sync({
  // force: true
}).then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});