const db = require("../models");

module.exports = app => {
  //Testing my playlists
  app.get("/", (req, res) => {
    db.Playlist.findAll({
      include: [db.Movie]
    }).then(playlists => {
      res.render("index", { playlists: playlists });
    });
  });

  app.post("/playlists", (req, res) => {
    Playlist.create(req.body).then(() => res.redirect("/"));
  });

  app.get("/api/playlists", (req, res) => {
    db.Playlist.findAll({ include: [db.Movie] }).then(dbPlaylist => {
      res.json(dbPlaylist);
    });
  });

  app.get("/api/playlists/:id", (req, res) => {
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
