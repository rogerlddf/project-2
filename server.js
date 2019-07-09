require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
var mysql = require("mysql2");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3060;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rtamames1458",
    database: "Moive_db"
  });
};

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("/public"));
app.use(express.static(path.join(__dirname, "/public/styles")));


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/api-routes-movies")(app);
require("./routes/api-routes-playlists")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}


  db.Playlist.findAll({
    include: [db.Movie]
  }).then(playlists => {
    console.log(playlists[0].Movies);
  });

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
