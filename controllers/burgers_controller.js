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
  });
});

router.put("/api/burgers/:id", function(req, res) {
  
    model.burger.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
        res.json(dbPost);
      });
  });
  
  var condition = "id = " + req.params.id;

  // model.burger.update({
  //   devoured: req.body.devoured
  // }, condition, function(result) {
  //   if (result.changedRows == 0) {
  //     // If no rows were changed, then the ID must not exist, so 404
  //     return res.status(404).end();
  //   } else {
  //     res.status(200).end();
  //   }
  // });
});


// Export routes for server.js to use.
module.exports = router;
