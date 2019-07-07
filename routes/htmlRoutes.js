var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {
      msg: "Welcome!"
      // movies: dbMovies
    });
    // db.Moive_db.findAll({}).then(function(dbMovies) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     movies: dbMovies
    //   });
    // });
  });

  // Load movies page and pass in an movies by id
  app.get("/movies/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbMovies
    ) {
      res.render("index", {
        movies: dbMovies
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
