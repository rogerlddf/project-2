const db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/movies", function(req, res) {
    let query = {};
    if (req.query.playlist_id) {
      query.PlaylistId = req.query.playlist_id;
    }
    // 1. Add a join here to include all of the Playlists to these posts
    db.Movie.findAll({
      where: query
    }).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  // Get route for retrieving a single movie
  app.get("/api/movies/:id", function(req, res) {
    db.Movie.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbMovie) {
      console.log(dbMovie);
      res.json(dbMovie);
    });
  });

  // POST route for saving a new movie
  app.post("/api/movies", function(req, res) {
    db.Movie.create({...req.body, playlistID:req.params.playlist_id}).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/movies/:id", function(req, res) {
    db.Movie.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  // PUT route for updating posts
  app.put("/api/movies", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });



    // POST route for saving a new post
    app.post("/api/reviews", function(req, res) {
      console.log(req.body);
      db.Review.create({
        title: req.body.title,
        body: req.body.body,
        category: req.body.category
      })
        .then(function(dbReview) {
          res.json(dbReview);
        });
    });


    app.get("/api/allreviews", (req, res) => {
      // 1. Add a join to include all of each Author's Posts
      db.Review.findAll({ include: [db.Movie] }).then(dbReview => {
        res.json(dbReview);
      });
    });
  
    app.get("/api/reviews/:id", (req, res) => {
      // 2; Add a join to include all of the Author's Posts here
      db.Review.findOne({
        include: [db.Movie],
        where: {
          id: req.params.id
        }
      }).then(dbReview => {
        res.json(dbReview);
      });
    });


};
