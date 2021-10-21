// index.js
var express = require("express");
var mongoose = require("mongoose");
// var bodyparser = require("body-parser");
var passport = require("passport");
var db = require("./mysetup/myurl").myurl;
var app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
var User = require("./routes/User");
var path = require('path');
var dir = __dirname;

var port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect(db)
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log("Error is ", err.message);
  });

app.use(cookieParser('NotSoSecret'));
app.use(session({
  secret : 'something',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

app.use(express.static(path.join(__dirname, '/views')));
const profile = require("./routes/User");
app.use("/api", profile);

app.use(function(req, res, next){
  // if there's a flash message in the session request, make it available in the response, then delete it
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});


app.get("/", (req, res) => {
  
  // res.status(200).send(`Hi Welcome to the Login and Signup API`);
  const userParam = req.flash("user");
  const rParam = req.flash("sign");
  // console.log(name);
  res.render("login", {rParam, userParam});
  
});

app.get("/signup", (req, res) => {

  // const userParam = req.flash("user");
  const rParam = req.flash("sign");
  // console.log(name);
  res.render("signup", {rParam});
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
