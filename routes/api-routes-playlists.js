const db = require("../models");

module.exports = app => {

  //Testing
  app.get("/", (req, res) => {
    db.Playlist.findAll({
      include: [db.Movie]
    }).then(playlists => {
      res.render("index", { playlists: playlists });
      // console.log(playlists[0].Movies);
    });
  });

  app.post("/playlists", (req, res) => {
    Playlist.create(req.body).then(() => res.redirect("/"));
  });

  app.get("/api/playlists", (req, res) => {
    // 1. Add a join to include all of each Author's Posts
    db.Playlist.findAll({ include: [db.Movie] }).then(dbPlaylist => {
      res.json(dbPlaylist);
    });
  });

  app.get("/api/playlists/:id", (req, res) => {
    // 2; Add a join to include all of the Author's Posts here
    db.Playlist.findOne({
      include: [db.Movie],
      where: {
        id: req.params.id
      }
    }).then(dbPlaylist => {
      res.json(dbPlaylist);
    });
  });

  app.post("/api/playlists", function(req, res) {
    db.Playlist.create(req.body).then(function(dbPlaylist) {
      res.json(dbPlaylist);
    });
  });

  app.delete("/api/playlists/:id", function(req, res) {
    db.Playlist.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbPlaylist => {
      res.json(dbPlaylist);
    });
  });
};
