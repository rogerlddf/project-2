const db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/movies", function (req, res) {
    let query = {};
    if (req.query.playlist_id) {
      query.PlaylistId = req.query.playlist_id;
    }
    // 1. Add a join here to include all of the Playlists to these posts
    db.Post.findAll({
      where: query
    }).then(function (dbMovie) {
      res.json(dbMovie);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/movies/:id", function (req, res) {
    // 2. Add a join here to include the Playlist who wrote the Post
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbMovie) {
      console.log(dbMovie);
      res.json(dbMovie);
    });
  });

  // POST route for saving a new movie
  app.post("/api/movies", function (req, res) {
    db.Movie.create(req.body).then(function (dbMovie) {
      res.json(dbMovie);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/movies/:id", function (req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbMovie) {
      res.json(dbMovie);
    });
  });

  // PUT route for updating posts
  app.put("/api/movies", function (req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbMovie) {
        res.json(dbMovie);
      });
  });



  // Get all examples
  // app.get("/api/movies", function(req, res) {
  //   db.Movie_db.findAll({}).then(function(dbMovie) {
  //     res.json(dbMovie);
  //   });
  // });

  // Create a new example
  // app.post("/api/movies", function(req, res) {
  //   db.Movie_db.create(req.body).then(function(dbMovie) {
  //     res.json(dbMovie);
  //   });
  // });

  // Delete an example by id
  // app.delete("/api/movies/:id", function(req, res) {
  //   db.Movie_db.destroy({ where: { id: req.params.id } }).then(function(
  //     dbMovie
  //   ) {
  //     res.json(dbMovie);
  //   });
  // });
};
