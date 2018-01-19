var express = require("express");

var router = express.Router();

var model = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  model.burger.findAll({}).then(function(data) {

    burgersData = [];

    for (let i of Object.values(data)){
      burgersData.push(i.dataValues);
      console.log(i.dataValues);
    }
    var hbsObject = {
      burgers: burgersData
    };

    res.render("index", hbsObject);
  });

});


router.post("/api/burgers", function(req, res) {
  model.burger.create({'burger_name' : req.body.name}).then(function(result) {
    res.json({ id: result.insertId });
    console.log('posted some shit son')
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log(req.params)
  console.log(req.body)

  model.burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// Export routes for server.js to use.
module.exports = router;
