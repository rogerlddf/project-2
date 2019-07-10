require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const db = require("./models");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
// const cookieParser = require("cookieParser")
const app = express();
const PORT = process.env.PORT || 3000;

//For BodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './views')
app.engine('handlebars', exphbs({
    extname: '.handlebars'
}));
app.set('view engine', '.handlebars');
app.get('/', (_req, res) => {
  res.render('./signin');
});

//Models
// var models = require("./models");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("/public"));
app.use(express.static(path.join(__dirname, "/public/styles")));
// console.log('1');
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
// console.log('2');
// Routes
require("./routes/api-routes-movies")(app);
// console.log('3');
require("./routes/api-routes-playlists")(app);
// console.log('4');
// require("./routes/htmlRoutes")(app);
// console.log('5');
require("./routes/auth.js")(app, passport);
// console.log('6');
//Routes

    //Routes
    var authRoute = require('./routes/auth.js')(app, passport);

    //load passport strategies
    require('./config/passport/passport.js')(passport,db.user);


//Sync Database
// console.log('7');
// sequelize.sync({force: true}).then(() => {
//     console.log('Nice! Database looks fine')
//     console.log('8');
// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }}).catch(function(err) {
 
//   console.log(err, "Something went wrong with the Database Update!")

// });

  db.Playlist.findAll({
    include: [db.Movie]
  }).then(playlists => {
    console.log(playlists[0].Movies);
  });

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;